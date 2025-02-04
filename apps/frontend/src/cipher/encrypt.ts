import { Jimp } from "jimp";
import { deriveKey } from "./common";

export function findClosestFactors(x: number): { m: number, n: number } {
    let m = Math.floor(Math.sqrt(x));
    
    let n = Math.ceil(x / m);
    
    if (m * n < x) {
        m++;
        n = Math.ceil(x / m);
    }
    
    return { m, n };
}

async function toFileData(file: File): Promise<Uint8Array> {
    const fileData = new Uint8Array(await file.arrayBuffer());
    const filename = new TextEncoder().encode(file.name);

    const fileNameLengthBufer = new Uint8Array(4);
    new DataView(fileNameLengthBufer.buffer).setUint32(0, filename.length, true);

    const data = new Uint8Array(fileNameLengthBufer.length + filename.length + fileData.length);
    data.set(fileNameLengthBufer, 0);
    data.set(filename, fileNameLengthBufer.length);
    data.set(fileData, fileNameLengthBufer.length + filename.length)

    return data;
}

async function toCipherData(data: Uint8Array, password: string): Promise<Uint8Array> {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(password, salt);

    console.log(key);

    const encrypted = new Uint8Array(await window.crypto.subtle.encrypt(
        {name: "AES-GCM", iv},
        key,
        data
    ));

    const encryptedLengthBuffer = new Uint8Array(4);
    new DataView(encryptedLengthBuffer.buffer).setUint32(0, encrypted.length, true);

    const cipherData = new Uint8Array(salt.length + iv.length + 4 + encrypted.byteLength);
    cipherData.set(iv, 0);
    cipherData.set(salt, iv.length);
    cipherData.set(encryptedLengthBuffer, iv.length + salt.length)
    cipherData.set(encrypted, encryptedLengthBuffer.length + salt.length + iv.length);

    return cipherData;
}

async function toPngCipher(cipherData: Uint8Array): Promise<Blob> {
    const pixelsCount = Math.ceil(cipherData.length / 4);
    const {n: width, m: height} = findClosestFactors(pixelsCount)
    const paddedPixelsData = crypto.getRandomValues(new Uint8Array((width * height - pixelsCount) * 4));

    const fullPixelsData = new Uint8Array(cipherData.length + paddedPixelsData.length);
    fullPixelsData.set(cipherData, 0);
    fullPixelsData.set(paddedPixelsData, cipherData.length);

    const img = new Jimp({width, height});
    img.bitmap.data.set(fullPixelsData);

    return new Blob([await img.getBuffer("image/png")], {type: "image/png"});
}

export async function encrypt(file: File, password: string): Promise<Blob> {
    const filedata = await toFileData(file);
    const cipherData = await toCipherData(filedata, password);
    const pngCipher = await toPngCipher(cipherData);

    return pngCipher;
}