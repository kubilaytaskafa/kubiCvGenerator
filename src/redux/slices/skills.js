import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cv_skills";

// Varsayılan boş yapı
const defaultState = {
  languages: [], // Yabancı Diller
  programmingLanguages: [], // Programlama Dilleri
  developmentAreas: [], // Geliştirme Alanları (Frontend, Backend vs.)
  versionControl: [], // Versiyon Kontrol (Git, SVN)
  projectManagement: [], // Proje Yönetimi (Jira, Trello)
};

// 1. BAŞLANGIÇ STATE'İ (LocalStorage'dan Oku)
const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      // LocalStorage verisi ile varsayılan yapıyı birleştir (merge)
      // Bu sayede yeni bir kategori eklersen eski veri bozulmaz.
      return { ...defaultState, ...JSON.parse(savedData) };
    }
  } catch (error) {
    console.error("Yetenek verileri okunurken hata oluştu:", error);
  }
  return defaultState;
};

export const skillsSlice = createSlice({
  name: "skills",
  initialState: getInitialState(),
  reducers: {
    // 1. EKLEME (Generic Add)
    // Payload Örneği: { category: "languages", skill: { id: "1", name: "English" } }
    addSkill: (state, action) => {
      const { category, skill } = action.payload;

      // İlgili kategori dizisine ekle
      if (state[category]) {
        state[category].push(skill);
        // Kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },

    // 2. DÜZENLEME (Generic Edit)
    // Payload Örneği: { category: "languages", skill: { id: "1", name: "German" } }
    editSkill: (state, action) => {
      const { category, skill } = action.payload;

      if (state[category]) {
        const existingItem = state[category].find(
          (item) => item.id === skill.id,
        );
        if (existingItem) {
          Object.assign(existingItem, skill);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
      }
    },

    // 3. SİLME (Generic Delete)
    // Payload Örneği: { category: "languages", id: "1" }
    deleteSkill: (state, action) => {
      const { category, id } = action.payload;

      if (state[category]) {
        state[category] = state[category].filter((item) => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },

    // Tüm yetenekleri toplu güncelleme (Gerekirse)
    setSkills: (state, action) => {
      // State'i güncelle ve kaydet
      const newState = { ...state, ...action.payload };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addSkill, editSkill, deleteSkill, setSkills } =
  skillsSlice.actions;

export default skillsSlice.reducer;
