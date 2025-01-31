<?php
header('Content-Type: application/json');

$secretKey = "0x4AAAAAAA5vzyee7LsZ2vbqAEc8p1kpCl8";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Mengambil data dari form
    $nama = $_POST['firstName'] ?? '';
    $email = $_POST['email'] ?? '';
    $nomorHp = $_POST['nomorHp'] ?? '';
    $pesan = $_POST['pesan'] ?? '';
    $dropdown = $_POST['dropdown'] ?? '';

    $token = $_POST['cf-turnstile-response'] ??''; // Mengambil token dari Turnstile

    // Validasi sederhana
    if (empty($nama) || empty($email) || empty($pesan)) {
        http_response_code(400);
        echo json_encode(['message' => 'Semua field wajib diisi!']);
        exit;
    }

     // Verifikasi token dengan Cloudflare
     $verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
        $data = [
            'secret' => $secretKey,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'], // Opsional: Tambahkan IP pengguna
        ];
    
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ],
        ];
    
        $context = stream_context_create($options);
        $response = file_get_contents($verifyUrl, false, $context);
    
        if ($response === FALSE) {
            http_response_code(500);
            echo json_encode(['message' => 'Kesalahan saat memverifikasi token Turnstile.']);
            exit;
        }
    
        // Parse respons dari Cloudflare
        $result = json_decode($response, true);
    
        if (!$result['success']) {
            // Token tidak valid
            http_response_code(400);
            echo json_encode(['message' => 'Verifikasi Turnstile gagal.']);
            exit;
        }

    // Proses data, misalnya simpan ke database
    echo json_encode(['message' => 'Pesan Anda berhasil dikirim!']);
    exit;
    } else {
    http_response_code(405); // Method not allowed
    echo json_encode(['message' => 'Metode tidak diizinkan']);
    exit;
}
?>
