import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cv_experiences";

// 1. BAŞLANGIÇ STATE'İ (LocalStorage'dan Oku)
// Uygulama açıldığında veriyi hafızadan çeker.
const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Deneyim verileri okunurken hata oluştu:", error);
  }
  // Veri yoksa boş array ile başla
  return { experiences: [] };
};

export const experiencesSlice = createSlice({
  name: "experiences",
  initialState: getInitialState(),
  reducers: {
    // 1. EKLEME (CREATE)
    addExperience: (state, action) => {
      state.experiences.push(action.payload);
      // Güncel state'i kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // 2. DÜZENLEME (UPDATE)
    editExperience: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingExperience = state.experiences.find((exp) => exp.id === id);

      if (existingExperience) {
        Object.assign(existingExperience, changes);
        // Değişikliği kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },

    // 3. SİLME (DELETE)
    deleteExperience: (state, action) => {
      const idToDelete = action.payload;
      state.experiences = state.experiences.filter(
        (exp) => exp.id !== idToDelete,
      );
      // Silme işlemini kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // İsteğe Bağlı: Tüm listeyi set etme
    setExperiences: (state, action) => {
      state.experiences = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const {
  addExperience,
  editExperience,
  deleteExperience,
  setExperiences,
} = experiencesSlice.actions;

export default experiencesSlice.reducer;
