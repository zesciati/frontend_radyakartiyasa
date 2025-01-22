document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Ambil data dari form
  const formData = new FormData(this);
  const turnstileToken = formData.get("cf-turnstile-response");

  // Verifikasi Turnstile
  const secretKey = "0x4AAAAAAA5vzyee7LsZ2vbqAEc8p1kpCl8"; 
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
      console.error("Turnstile verification failed:", turnstileResult["error-codes"]);
      alert("Verifikasi Turnstile gagal. Silakan coba lagi.");
      return;
    }
  } catch (error) {
    console.error("Error during Turnstile verification:", error);
    alert("Terjadi kesalahan dalam proses verifikasi.");
    return;
  }

  // Jika Turnstile berhasil, kirim data ke Directus
  try {
    const directusResponse = await fetch(
      "https://backenddirectus.madebybagus.xyz/", // Masih ada kesalahan di domain nya
      {
        method: "POST",
        headers: {
          Authorization: "Bearer nAHUK3upzr2B-y3VpyGcJIOjNvoUJWgE", 
          "CF-Access-Client-Id": "038142b43104dacb7d96f88171f1bca3.access",
          "CF-Access-Client-Secret":
            "3a79ab041500c7f1019a64502b022d49b833ed6a70c9d767482cb4402097050d",
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
