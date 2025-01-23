document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Ambil data dari form
  const formData = new FormData(this);
  const turnstileToken = formData.get("cf-turnstile-response");

  // Verifikasi Turnstile
  const secretKey = "0x4AAAAAAA51ibMx3DpVadUsMibqBaJBqsc"; 
  let turnstileResult;

  try {
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: secretKey,
          response: turnstileToken,
        }),
      }
    );
    turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      console.error("Verification failed:", turnstileResult["error-codes"]);
      alert("Verifikasi gagal. Silahkan coba lagi.");
      return;
    }
  } catch (error) {
    console.error("Error during verification:", error);
    alert("Terjadi kesalahan dalam proses verifikasi.");
    return;
    }

  // Jika Turnstile berhasil, kirim data ke Directus
  try {
    const directusResponse = await fetch(
      "https://backenddirectus.madebybagus.xyz/items/contact_us",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5YTFiYmQ2LWUwMGQtNGFlNy1hNjM4LTkxMzI3Y2NiMTY1MCIsInJvbGUiOiIxN2VkN2U3Mi0zMmI1LTRlNzQtOThiNS04YTcyNGUwN2Q2ZTgiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTczNzQyNTU4NiwiZXhwIjoxNzM3NDI2NDg2LCJpc3MiOiJkaXJlY3R1cyJ9.bC1WTIqVpXkz5Djwg6V1wlIXYf16yAcLoYzxvFqD3OI",
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
  } catch (error) {
    console.error("Error during Directus API request:", error);
    alert("Terjadi kesalahan saat mengirim data ke Directus.");
    }
});
