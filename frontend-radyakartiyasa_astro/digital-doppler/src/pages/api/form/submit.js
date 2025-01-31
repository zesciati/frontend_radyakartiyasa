import { validateForm } from "./middleware.js";
import { config } from "./utilsSecret.js";

export async function POST(request) {
    const formData = await request.formData();

    // Verifikasi turnstile token
    const turnstileToken = formData.get("cf-turnstile-response");
    const turnstileCheck = await verifyTurnstile(request);
    if(!turnstileCheck) {
        return new Response(JSON.stringify({ error: "Verifikasi gagal." }), { status: 400 });
    }

    // Ambil data dari form
    const name = formData.get("name");
    const email = formData.get("email");
    const phone_number = formData.get("phone_number");
    const assistance_type = formData.get("assisstance_type");
    const message = formData.get("message");

    // Form validation
    const validationResponse = validateForm({ firstName: name, email, nomorHp: phone_number, dropdown: assistance_type, pesan: message });
    if (!validationResponse.success) {
        return new Response(JSON.stringify({ error: validationResponse.message }), { status: 400 });
    }

    // Kirim data ke Directus
    try {
        const directusResponse = await fetch ("https://backenddirectus.madebybagus.xyz/items/contact_us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.BEARER_TOKEN}`,
                "CF-Access-Client-Id": config.ACCESS_CLIENT_ID,
                "CF-Access-Client-Secret": config.ACCESS_CLIENT_SECRET,
            },
            body: JSON.stringify({
                name,
                email,
                phone_number,
                assistance_type,
                message,
            }),
        });

        if(directusResponse.ok) {
            return new Response(JSON.stringify({ message: "Data berhasil dikirim." }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: "Data gagal dikirim." }), { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Terjadi kesalahan saat mengirim data." }), { status: 500 });
    }

    // Fungsi verifikasi turnstile
    async function verifyTurnstile(token) {
        if (!token) return false;

        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                secret: config.TURNSTILE_SECRET_KEY,
                response: token,
            }),
        });
    
        const result = await response.json();
        return result.success;
    }
}