// services/apiService.ts
import { type User, type Module } from '../types';

// URL ini harus diganti dengan URL Web App dari Google Apps Script Anda.
const API_URL = 'https://script.google.com/macros/s/AKfycbz89YwXE_Bo_fLKsZGiJpGXEEax7RC-jEJwwbvRXBgdAuYeHYEwPh9rIsErh8skfh8R/exec';

// Fungsi helper untuk memanggil API
// FIX: Mengubah cara payload dikirim. Alih-alih objek bertingkat, kita gunakan spread operator
// untuk membuat struktur data yang lebih datar dan andal.
async function callApi(action: string, data: object) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      // Mengirim struktur datar: { action: '...', ...data }
      body: JSON.stringify({ action, ...data }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return result;

  } catch (error) {
    console.error(`API Call Error (${action}):`, error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('Terjadi kesalahan yang tidak diketahui saat menghubungi server.');
  }
}

// Fungsi untuk registrasi pengguna
export const registerUser = async (username: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> => {
  return callApi('REGISTER', { username, password });
};

// Fungsi untuk login pengguna
export const loginUser = async (username: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> => {
  return callApi('LOGIN', { username, password });
};

// Fungsi untuk menyimpan modul ajar
export const saveModule = async (username: string, title: string, content: string): Promise<{ success: boolean; newModule?: Module; message?: string }> => {
  return callApi('SAVE_MODULE', { username, title, content });
};

// Fungsi untuk mendapatkan riwayat modul ajar
export const getModules = async (username: string): Promise<{ success: boolean; modules?: Module[]; message?: string }> => {
  return callApi('GET_MODULES', { username });
};