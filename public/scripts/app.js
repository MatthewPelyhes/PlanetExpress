console.log("I am connected :)");

const visit = document.querySelector('#custom-launcher')
const boot = document.querySelector("#boot");
const update = document.querySelector("#update");
const shutdown = document.querySelector("#shutdown");

const email = document.querySelector("#email");
const app_ID = document.querySelector("#app_id");
const user_ID = document.querySelector("#user_id");
const user_name = document.querySelector("#user_name");
const company_name = document.querySelector("#company_name")
const company_id = document.querySelector("#company_id")
const jwt_secret = document.querySelector("#jwt_secret")

function base64url(buffer) {
    const bytes = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateJWT(secret, payload) {
    const header = { alg: "HS256", typ: "JWT" };
    const encoder = new TextEncoder();

    const headerB64 = base64url(encoder.encode(JSON.stringify(header)));
    const payloadB64 = base64url(encoder.encode(JSON.stringify(payload)));
    const signingInput = `${headerB64}.${payloadB64}`;

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(signingInput));
    return `${signingInput}.${base64url(signature)}`;
}

visit.addEventListener("click", () => {
    window.Intercom('boot', {
        "app_id": `${app_ID.value}`
    })
})

boot.addEventListener("click", async () => {
    let bootSettings = {
        "app_id": app_ID.value,
        "email": email.value,
        "user_id": user_ID.value,
        "name": user_name.value,
    };

    if (company_name.value) {
        bootSettings.company = {
            "id": company_id.value,
            "name": company_name.value,
        };
    }

    if (jwt_secret.value) {
        const payload = {
            user_id: user_ID.value,
            exp: Math.floor(Date.now() / 1000) + 3600,
        };
        if (email.value) payload.email = email.value;

        const token = await generateJWT(jwt_secret.value, payload);
        bootSettings.intercom_user_jwt = token;
        console.log("Generated JWT:", token);
    }

    window.Intercom('boot', bootSettings);
    console.log(`${user_name.value}`)
    console.log("clicked boot")
})

update.addEventListener("click", ()=> {
    console.log("You're up to no good!")
    console.log(Date.now());

    window.Intercom('update', {
        "app_id": `${app_ID.value}`,  
        "last_seen_at": `${Date.now()}`
    })
})

shutdown.addEventListener("click", () => {
    Intercom('shutdown')
    setTimeout(() => {
        console.log("Delayed for 1 second.");
        window.location.reload()
      }, "1000");
   
    console.log('shutdown called')
})


console.log("Test in Terminal")

