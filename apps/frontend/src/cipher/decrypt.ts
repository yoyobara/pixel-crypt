import { Jimp } from "jimp";
import { deriveKey } from "./common";

// return with the padding, since the encryption data itself knows length
async function toPaddedCipherData(pngCipher: Blob): Promise<Uint8Array> {
    const img = await Jimp.read(await pngCipher.arrayBuffer());
    const cipherData = img.bitmap.data;

    return cipherData;
}

async function toFileData(paddedCipherData: Uint8Array, password: string) {
    const iv = paddedCipherData.slice(0, 16);
    const salt = paddedCipherData.slice(16, 32);
    const encryptedFileDataLength = new DataView(paddedCipherData.buffer).getUint32(32, true);
    const encryptedFileData = paddedCipherData.slice(36, 36 + encryptedFileDataLength);

    const key = await deriveKey(password, salt);

    const fileData = new Uint8Array(await window.crypto.subtle.decrypt(
        {name: "AES-GCM", iv},
        key,
        encryptedFileData
    ));

    return fileData;
}

async function toFile(fileData: Uint8Array): Promise<File> {
    const fileNameLength = new DataView(fileData.buffer).getUint32(0, true);
    const fileNameBuffer = fileData.slice(4, 4 + fileNameLength);
    const filename = new TextDecoder().decode(fileNameBuffer);

    const fileContent = fileData.slice(4 + fileNameLength, undefined);

    return new File([fileContent], filename);
}

export async function decrypt(pngCipher: Blob, password: string): Promise<File> {
    const paddedCipherData = await toPaddedCipherData(pngCipher);
    const fileData = await toFileData(paddedCipherData, password);
    const originalFile = await toFile(fileData);

    return originalFile;
}