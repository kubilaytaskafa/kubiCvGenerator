import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cv_certificates";

// 1. BAŞLANGIÇ STATE'İ (LocalStorage'dan Oku)
// Uygulama açıldığında varsa eski veriyi getir, yoksa boş başlat.
const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Veri okunurken hata oluştu:", error);
  }
  return { certificates: [] };
};

export const certificatesSlice = createSlice({
  name: "certificates",
  initialState: getInitialState(),
  reducers: {
    // 1. EKLEME (CREATE)
    addCertificate: (state, action) => {
      state.certificates.push(action.payload);
      // Güncel state'i string'e çevirip kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // 2. DÜZENLEME (UPDATE)
    editCertificate: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingCertificate = state.certificates.find(
        (cert) => cert.id === id,
      );

      if (existingCertificate) {
        Object.assign(existingCertificate, changes);
        // Güncellemeden sonra kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },

    // 3. SİLME (DELETE)
    deleteCertificate: (state, action) => {
      const idToDelete = action.payload;
      state.certificates = state.certificates.filter(
        (cert) => cert.id !== idToDelete,
      );
      // Sildikten sonra güncel halini kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // İsteğe Bağlı: Tüm listeyi set etme
    setCertificates: (state, action) => {
      state.certificates = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const {
  addCertificate,
  editCertificate,
  deleteCertificate,
  setCertificates,
} = certificatesSlice.actions;

export default certificatesSlice.reducer;
