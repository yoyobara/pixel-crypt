const ITERATIONS = 10000;

/*
file data structure:
	<4 byte filename length><filename><file data>

cipher data structure:
	<16 bytes IV><16 bytes salt><encrypted file data length><encrypted file data>

image pixels:
    <cipher data><padded pixels>
*/

export async function deriveKey(password: string, salt: Uint8Array) {
    const encoder = new TextEncoder();

    const importedPassword = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        {name: "PBKDF2"},
        false,
        ["deriveKey"]
    );

    const key = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations: ITERATIONS,
            hash: "SHA-256"
        },
        importedPassword,
        {name: "AES-GCM", length: 256},
        false,
        ["encrypt", "decrypt"]
    );

    return key;
}
