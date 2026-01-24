import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cv_social_skills";

// 1. BAŞLANGIÇ STATE'İ (LocalStorage'dan Oku)
const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Sosyal yetenek verileri okunurken hata oluştu:", error);
  }
  // Veri yoksa boş array ile başla
  return { socialSkills: [] };
};

export const socialSkillsSlice = createSlice({
  name: "socialSkills",
  initialState: getInitialState(),
  reducers: {
    // 1. EKLEME (CREATE)
    // Payload Örneği: { id: "123", name: "Takım Çalışması" }
    addSocialSkill: (state, action) => {
      state.socialSkills.push(action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // 2. DÜZENLEME (UPDATE)
    editSocialSkill: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingSkill = state.socialSkills.find((skill) => skill.id === id);

      if (existingSkill) {
        Object.assign(existingSkill, changes);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },

    // 3. SİLME (DELETE)
    deleteSocialSkill: (state, action) => {
      const idToDelete = action.payload;
      state.socialSkills = state.socialSkills.filter(
        (skill) => skill.id !== idToDelete,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // Toplu güncelleme (Opsiyonel)
    setSocialSkills: (state, action) => {
      state.socialSkills = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const {
  addSocialSkill,
  editSocialSkill,
  deleteSocialSkill,
  setSocialSkills,
} = socialSkillsSlice.actions;

export default socialSkillsSlice.reducer;
