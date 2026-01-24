import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cv_educations";

// 1. BAŞLANGIÇ STATE'İ (LocalStorage'dan Oku)
const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Eğitim verileri okunurken hata oluştu:", error);
  }
  // Eğer veri yoksa boş bir array ile başlat
  return { educations: [] };
};

export const educationsSlice = createSlice({
  name: "educations",
  initialState: getInitialState(),
  reducers: {
    // 1. EKLEME (CREATE)
    addEducation: (state, action) => {
      state.educations.push(action.payload);
      // Güncel state'i kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // 2. DÜZENLEME (UPDATE)
    editEducation: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingEducation = state.educations.find((edu) => edu.id === id);

      if (existingEducation) {
        Object.assign(existingEducation, changes);
        // Değişikliği kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },

    // 3. SİLME (DELETE)
    deleteEducation: (state, action) => {
      const idToDelete = action.payload;
      state.educations = state.educations.filter(
        (edu) => edu.id !== idToDelete,
      );
      // Silme işlemini kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // İsteğe Bağlı: Tüm listeyi set etme (Örn: JSON import için)
    setEducations: (state, action) => {
      state.educations = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const { addEducation, editEducation, deleteEducation, setEducations } =
  educationsSlice.actions;

export default educationsSlice.reducer;
