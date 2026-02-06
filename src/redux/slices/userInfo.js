import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cv_userInfo";

// Varsayılan boş yapı
const defaultState = {
  name: "",
  lastName: "",
  title: "", // Ünvan (Örn: Frontend Developer)
  image: "", // Base64 formatında resim string'i
  phoneNumber: "",
  email: "",
  city: "", // Şehir - ATS için önemli
  country: "", // Ülke - ATS için önemli
  linkedin: "",
  github: "",
  website: "", // Kişisel website
  summary: "", // Profesyonel Özet - ATS skorunu artırır
};

// 1. BAŞLANGIÇ STATE'İ (LocalStorage'dan Oku)
const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      // LocalStorage'dan gelen veriyle varsayılan yapıyı birleştir (Merge).
      // Bu, gelecekte yeni bir alan eklersen (örn: website) eski verinin bunu bozmasını engeller.
      return { ...defaultState, ...JSON.parse(savedData) };
    }
  } catch (error) {
    console.error("Kullanıcı bilgileri okunurken hata oluştu:", error);
  }
  return defaultState;
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: getInitialState(),
  reducers: {
    // Tek bir reducer ile tüm alanları güncelleyebilirsin.
    // Örn: dispatch(updateUserInfo({ name: "Ahmet" }))
    updateUserInfo: (state, action) => {
      // 1. Mevcut state ile gelen veriyi birleştir
      const newState = { ...state, ...action.payload };

      // 2. LocalStorage'a kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

      // 3. Redux state'ini güncelle
      return newState;
    },

    // İsteğe bağlı: Tüm bilgileri sıfırla
    resetUserInfo: () => {
      localStorage.removeItem(STORAGE_KEY);
      return defaultState;
    },
  },
});

export const { updateUserInfo, resetUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
