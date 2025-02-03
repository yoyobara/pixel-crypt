const ITERATIONS = 10000;

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
