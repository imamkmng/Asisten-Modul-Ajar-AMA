// This service requires the Google GenAI library.
// Please install it using: npm install @google/genai
import { GoogleGenAI } from "@google/genai";
import { type FormState } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const buildPrompt = (formData: FormState): string => {
  const customCapaian = formData.capaianPembelajaran.trim();
  const customTujuan = formData.tujuanPembelajaran.trim();

  // The info block is now formatted as a Markdown blockquote for better visual separation.
  const infoBlock = `> **INFORMASI UMUM MODUL AJAR**
> ---
> - **Satuan Pendidikan:** ${formData.educationalUnit}
> - **Jenjang:** ${formData.level}
> - **Kelas / Fase:** ${formData.gradePhase}
> - **Mata Pelajaran:** ${formData.subject}
> - **Guru:** ${formData.subjectTeacher}
> - **Materi Pokok:** ${formData.material}
> - **Alokasi Waktu:** ${formData.timeAllocation}
> - **Model Pembelajaran:** ${formData.learningModel}
> - **Moda Pembelajaran:** ${formData.learningMode}
> ---`;

  return `
Anda adalah seorang ahli perancang kurikulum dan instruksional yang sangat teliti dan berpengalaman. Tugas Anda adalah membuat modul ajar yang profesional, komprehensif, dan siap pakai dalam format Markdown. Pastikan hasil akhir adalah dokumen yang siap cetak dan mudah dipahami oleh guru lain.

**PERINTAH UTAMA:**
1.  **BUAT JUDUL UTAMA** di baris paling pertama dengan format: \`# MODUL AJAR ${formData.subject.toUpperCase()}: ${formData.material}\`.
2.  Setelah judul, **WAJIB LANJUTKAN** dengan menyalin blok "INFORMASI UMUM MODUL AJAR" di bawah ini secara persis. Blok ini harus diformat sebagai *blockquote*.
3.  Setelah blok informasi umum, **LANJUTKAN** dengan membuat sisa modul ajar menggunakan struktur yang telah ditentukan di bawah.
4.  Gunakan bahasa yang jelas, profesional, dan lugas. Berikan detail yang konkret dan relevan di setiap bagian.

Inilah blok informasi yang harus Anda sertakan setelah judul:
${infoBlock}

Setelah itu, lanjutkan dengan struktur berikut:

## I. Identifikasi
### a. Kesiapan Peserta Didik
(Berikan deskripsi yang jelas dan terperinci mengenai kesiapan belajar siswa, termasuk pengetahuan awal atau keterampilan prasyarat yang mungkin dimiliki atau belum dimiliki.)
### b. Karakteristik Materi Pelajar
(Deskripsikan karakteristik, tingkat kesulitan, dan konsep kunci dari materi yang akan diajarkan.)
### c. 8 Dimensi Profil Lulusan
(Jelaskan secara konkret bagaimana materi dan kegiatan pembelajaran ini akan mengembangkan setiap dimensi: keimanan dan ketakwaan, kewargaan, penalaran kritis, kreativitas, kolaborasi, kemandirian, kesehatan, dan komunikasi.)

## II. Desain Pembelajaran
### a. Capaian Pembelajaran
${customCapaian ? `Gunakan capaian pembelajaran berikut: \n${customCapaian}` : '(Rumuskan capaian pembelajaran yang relevan dengan materi dan fase perkembangan siswa.)'}
### b. Topik Pembelajaran
(Sebutkan topik-topik spesifik yang kontekstual dan relevan dengan pengalaman siswa untuk meningkatkan keterlibatan.)
### c. Integrasi Lintas Disiplin Ilmu
(Jelaskan secara praktis bagaimana materi ini dapat dihubungkan dengan mata pelajaran lain untuk memberikan pemahaman holistik.)
### d. Tujuan Pembelajaran
${customTujuan ? `Gunakan tujuan pembelajaran berikut: \n${customTujuan}` : '(Rumuskan tujuan pembelajaran yang spesifik, terukur, dapat dicapai, relevan, dan berbatas waktu (SMART). Gunakan kata kerja operasional yang jelas.)'}
### e. Kerangka Pembelajaran
(Detailkan secara sistematis: 1. **Praktek Pedagogis:** (Metode yang digunakan), 2. **Kemitraan Pembelajaran:** (Peran guru dan siswa), 3. **Lingkungan Pembelajaran:** (Kondisi kelas yang mendukung), 4. **Pemanfaatan Digital:** (Alat/teknologi yang digunakan). )

## III. Pengalaman Belajar
### a. Prinsip Pembelajaran
(Jelaskan bagaimana prinsip pembelajaran yang berkesadaran penuh (mindful), bermakna, dan menggembirakan diterapkan dalam kegiatan.)
### b. Tahapan Pembelajaran
(Buatkan alur kegiatan yang sangat rinci dan logis dalam format daftar bernomor. Bagi menjadi tiga tahap utama: **1. Kegiatan Pendahuluan** (apersepsi, motivasi), **2. Kegiatan Inti** (eksplorasi, elaborasi, konfirmasi), dan **3. Kegiatan Penutup** (refleksi, kesimpulan, tindak lanjut). Berikan estimasi waktu untuk setiap langkahnya.)
### c. Pengalaman Belajar
(Jelaskan aktivitas konkret yang akan dilakukan siswa untuk memahami konsep, mengaplikasikan pengetahuan, dan merefleksikan proses belajar mereka.)

## IV. Asesmen
### a. Asesmen Awal Pembelajaran (Diagnostik)
(Deskripsikan alat atau kegiatan asesmen diagnostik yang spesifik (misal: pre-test, kuis singkat, pertanyaan pemantik) dan bagaimana hasilnya akan digunakan.)
### b. Asesmen Proses Pembelajaran (Formatif)
(Sediakan contoh-contoh teknik asesmen formatif (misal: observasi, rubrik diskusi, lembar kerja) yang akan digunakan selama pembelajaran untuk memantau kemajuan siswa.)
### c. Asesmen Akhir Pembelajaran (Sumatif)
(Deskripsikan bentuk asesmen sumatif (misal: proyek akhir, tes tulis, presentasi) yang mengukur pencapaian tujuan pembelajaran secara komprehensif.)

**REVIEW AKHIR:** Sebelum menyelesaikan, tinjau kembali keseluruhan dokumen untuk memastikan konsistensi, kejelasan bahasa, dan kesesuaian format. Hasilnya harus sempurna, rapi, dan siap pakai.
  `;
};

// FIX: Refactor response handling to align with Gemini API best practices.
// The function now directly uses `response.text` and has a simplified, more robust error-checking flow.
export const generateModuleContent = async (formData: FormState): Promise<string> => {
  try {
    const prompt = buildPrompt(formData);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    
    // If text is empty, it might be due to a safety block or other reasons.
    if (!text || text.trim() === '') {
      const candidate = response.candidates?.[0];
      if (candidate?.finishReason === 'SAFETY') {
        console.error("Response blocked for safety reasons:", response);
        throw new Error("Respons diblokir karena alasan keamanan. Coba ubah input Anda atau sederhanakan permintaan Anda.");
      }
      console.error("Empty text content from Gemini API. Full response:", response);
      throw new Error("Generator memberikan respons kosong. Coba sesuaikan input Anda dan coba lagi.");
    }

    return text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("Gagal menghasilkan konten. Silakan coba lagi.");
  }
};