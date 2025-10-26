
# Asisten Modul Ajar (AMA)

![Asisten Modul Ajar (AMA)](https://img.shields.io/badge/Asisten%20Modul%20Ajar-AMA-blue?style=for-the-badge&logo=react)

**Asisten Modul Ajar (AMA)** adalah aplikasi web canggih yang dirancang untuk memberdayakan guru dan tenaga pendidik di Indonesia. Dengan memanfaatkan kekuatan AI dari **Google Gemini**, aplikasi ini mengotomatiskan proses pembuatan Modul Ajar (rencana pembelajaran) yang komprehensif, terstruktur, dan siap pakai, membebaskan waktu guru agar lebih fokus pada interaksi dengan siswa.

---

## ✨ Fitur Utama

-   **🤖 Generasi Modul Ajar Otomatis:** Membuat konten modul ajar yang relevan dan mendalam berdasarkan input detail dari pengguna.
-   **📝 Formulir Kustomisasi:** Antarmuka formulir yang lengkap memungkinkan guru menyesuaikan setiap aspek modul, mulai dari jenjang, mata pelajaran, hingga model pembelajaran.
-   **📄 Output Profesional:** Menghasilkan dokumen dalam format Markdown yang rapi, terstruktur secara pedagogis, dan mudah dibaca.
-   **👤 Manajemen Pengguna:** Sistem registrasi dan login untuk menyediakan ruang kerja personal bagi setiap guru.
-   **📚 Riwayat Modul:** Simpan modul ajar yang telah dibuat dan akses kembali kapan saja melalui panel riwayat.
-   **📥 Ekspor ke DOC:** Unduh modul ajar sebagai file Microsoft Word (.doc) dengan satu kali klik untuk diedit, dicetak, atau dibagikan secara offline.
-   **🚀 Template Siap Pakai:** Mulai dengan cepat menggunakan template yang sudah ada untuk mengisi formulir secara otomatis.

## 🛠️ Tumpukan Teknologi (Tech Stack)

Arsitektur proyek ini memisahkan antarmuka pengguna (Frontend) dengan logika server (Backend) secara cerdas dan efisien.

#### Frontend
-   **Framework:** [React.js](https://reactjs.org/) (via CDN, tanpa build step)
-   **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Integrasi AI:** Library resmi [`@google/genai`](https://www.npmjs.com/package/@google/genai)
-   **Markdown Rendering:** [`react-markdown`](https://github.com/remarkjs/react-markdown)

#### Backend (Serverless)
-   **Platform:** [Google Apps Script](https://developers.google.com/apps-script)
-   **Database:** [Google Sheets](https://www.google.com/sheets/about/) (sebagai database NoSQL sederhana)
-   **API:** Diterbitkan sebagai Web App dari Google Apps Script.

## ⚙️ Cara Kerja

1.  **Input Pengguna:** Pengguna mengisi formulir detail pembelajaran di antarmuka.
2.  **Prompt Engineering:** `services/geminiService.ts` membangun sebuah *prompt* (perintah) yang sangat terstruktur dan detail berdasarkan data dari formulir.
3.  **Permintaan ke AI:** Prompt tersebut dikirim ke model AI **Google Gemini (`gemini-2.5-flash`)**.
4.  **Respons AI:** Gemini memproses permintaan dan mengembalikan konten modul ajar dalam format Markdown.
5.  **Tampilan Hasil:** Aplikasi menampilkan hasil di `ModuleDisplay` menggunakan `react-markdown`.
6.  **Interaksi Backend:**
    -   **Autentikasi & Penyimpanan:** Saat pengguna mendaftar, login, atau menyimpan modul, frontend akan memanggil API endpoint (Google Apps Script Web App).
    -   **Logika Server:** Google Apps Script menerima permintaan, melakukan operasi yang sesuai (misalnya, menulis baris baru di Google Sheets untuk pengguna baru atau modul baru), dan mengembalikan respons JSON.

## 🚀 Getting Started

Untuk menjalankan proyek ini di lingkungan pengembangan Anda, ikuti langkah-langkah berikut:

#### 1. Frontend

Aplikasi ini dirancang untuk berjalan langsung di browser tanpa perlu proses *build*.

-   Clone repositori ini.
-   Sajikan file-file statis (HTML, TSX) menggunakan server lokal sederhana. Anda bisa menggunakan ekstensi seperti "Live Server" di Visual Studio Code.
-   Pastikan Anda telah mengatur **API Key** untuk Google Gemini di lingkungan tempat Anda menghosting aplikasi.

#### 2. Backend (Google Apps Script)

Backend ini gratis dan tidak memerlukan server.

1.  **Buat Google Sheet Baru:**
    -   Buka [sheets.google.com](https://sheets.google.com) dan buat spreadsheet baru.
    -   Buat dua *sheet* (tab) di dalamnya dengan nama persis: `users` dan `modules`.
    -   Di sheet `users`, buat header kolom: `username`, `password`, `createdAt`.
    -   Di sheet `modules`, buat header kolom: `id`, `username`, `title`, `content`, `createdAt`.

2.  **Buka Editor Apps Script:**
    -   Dari Google Sheet Anda, klik `Extensions` > `Apps Script`.

3.  **Tambahkan Kode Backend:**
    -   Hapus semua kode default di file `Code.gs`.
    -   Salin dan tempel kode Google Apps Script yang menangani logika API. Kode ini harus berisi fungsi utama `doPost(e)` yang memproses permintaan `fetch` dari frontend. Fungsi ini akan memanggil fungsi lain seperti `registerUser`, `loginUser`, `saveModule`, dll.

4.  **Deploy sebagai Web App:**
    -   Klik tombol **Deploy** > **New deployment**.
    -   Pilih tipe "Web app".
    -   Pada bagian "Who has access", pilih **Anyone**.
    -   Klik **Deploy**.
    -   **PENTING:** Salin **Web app URL** yang diberikan setelah deployment berhasil.

5.  **Hubungkan Frontend ke Backend:**
    -   Buka file `services/apiService.ts`.
    -   Tempel URL Web App yang sudah Anda salin ke dalam konstanta `API_URL`.

```typescript
// services/apiService.ts
const API_URL = 'URL_WEB_APP_ANDA_DARI_LANGKAH_4';
```

Sekarang, aplikasi frontend Anda dapat berkomunikasi dengan backend Google Apps Script.

---

Dibuat dengan ❤️ oleh **@imamkmng**.
