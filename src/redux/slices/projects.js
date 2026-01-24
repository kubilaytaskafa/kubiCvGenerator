import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cv_projects";

// 1. BAŞLANGIÇ STATE'İ (LocalStorage'dan Oku)
const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Proje verileri okunurken hata oluştu:", error);
  }
  // Veri yoksa boş array ile başla
  return { projects: [] };
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState: getInitialState(),
  reducers: {
    // 1. EKLEME (CREATE)
    addProject: (state, action) => {
      state.projects.push(action.payload);
      // Güncel state'i kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // 2. DÜZENLEME (UPDATE)
    editProject: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingProject = state.projects.find((p) => p.id === id);

      if (existingProject) {
        Object.assign(existingProject, changes);
        // Değişikliği kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },

    // 3. SİLME (DELETE)
    deleteProject: (state, action) => {
      const idToDelete = action.payload;
      state.projects = state.projects.filter((p) => p.id !== idToDelete);
      // Silme işlemini kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    // İsteğe Bağlı: Tüm listeyi set etme
    setProjects: (state, action) => {
      state.projects = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const { addProject, editProject, deleteProject, setProjects } =
  projectsSlice.actions;

export default projectsSlice.reducer;
