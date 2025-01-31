document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const turnstileToken = formData.get("cf-turnstile-response");
  
    // Verifikasi Turnstile
    const secretKey = "0x4AAAAAAA5vzyee7LsZ2vbqAEc8p1kpCl8"; // Ganti dengan Secret Key Anda
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  
          secret: secretKey,
          response: turnstileToken,
        }),
      }
    );
  
    const turnstileResult = await turnstileResponse.json();
  
    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult["error-codes"]);
      alert("Verifikasi Turnstile gagal. Silakan coba lagi.");
      return;
    }
  
    // Jika Turnstile berhasil, kirim data ke Directus
    const directusResponse = await fetch(
      "https://backenddirectus.madebybagus.xyz/",
      {
        method: "POST",

        // AUTHORIZATION BELUM DIGANTI KARNA BAGIAN BACKEND BELUM SAMPE MILESTONE TURNSTILE
        headers: {
          Authorization: "Bearer neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5YTFiYmQ2LWUwMGQtNGFlNy1hNjM4LTkxMzI3Y2NiMTY1MCIsInJvbGUiOiIxN2VkN2U3Mi0zMmI1LTRlNzQtOThiNS04YTcyNGUwN2Q2ZTgiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTczNzQyNTU4NiwiZXhwIjoxNzM3NDI2NDg2LCJpc3MiOiJkaXJlY3R1cyJ9.bC1WTIqVpXkz5Djwg6V1wlIXYf16yAcLoYzxvFqD3OI", 
          "CF-Access-Client-Id": "038142b43104dacb7d96f88171f1bca3.access",
          "CF-Access-Client-Secret": "3a79ab041500c7f1019a64502b022d49b833ed6a70c9d767482cb4402097050d",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
        }),
      }
    );
  
    const directusResult = await directusResponse.json();
  
    if (!directusResponse.ok) {
      console.error("Directus API error:", directusResult);
      alert("Gagal menyimpan data ke Directus.");
      return;
    }
  
    // Jika berhasil, tampilkan pesan sukses
    alert("Pesan Anda berhasil dikirim!");
});
  