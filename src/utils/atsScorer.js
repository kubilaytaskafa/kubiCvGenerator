export const calculateAtsScore = (state) => {
  let score = 0;
  let feedback = [];

  // State'i parçala ama içerideki dizilere (array) ulaşmak için doğru yolu izle
  const userInfo = state.userInfo || {};

  // Düzeltme Burada: Slice objesi içindeki asıl diziyi alıyoruz
  // Eğer state.experiences undefined ise boş dizi ata
  const experiences = state.experiences?.experiences || [];
  const educations = state.educations?.educations || [];
  const projects = state.projects?.projects || [];

  // Skills yapısı genelde düz obje olduğu için direkt gelebilir ama yine de kontrol edelim
  const skills = state.skills || {};

  // --- 1. İLETİŞİM BİLGİLERİ (20 Puan) ---
  if (userInfo.name && userInfo.lastName) score += 5;
  else feedback.push("İsim ve Soyisim girilmedi.");

  if (userInfo.title) score += 5;
  else feedback.push("Hedeflenen Ünvan (Job Title) eksik.");

  if (userInfo.email && userInfo.phoneNumber) score += 5;
  else feedback.push("E-posta veya Telefon numarası eksik.");

  if (userInfo.linkedin || userInfo.github) score += 5;
  else feedback.push("LinkedIn veya GitHub profili eklenmedi.");

  // --- 2. İŞ DENEYİMİ (35 Puan) ---
  if (experiences.length > 0) {
    score += 15;

    // Açıklama kontrolü
    const hasDetailedDesc = experiences.every(
      (exp) => exp.description && exp.description.length > 40,
    );

    if (hasDetailedDesc) {
      score += 20;
    } else {
      score += 5;
      feedback.push(
        "İş deneyimi açıklamaları çok kısa. Anahtar kelimeler ekleyin.",
      );
    }
  } else {
    feedback.push("Hiç iş deneyimi eklenmemiş. (Stajlar dahil ekleyiniz)");
  }

  // --- 3. EĞİTİM (15 Puan) ---
  if (educations.length > 0) {
    score += 15;
  } else {
    feedback.push("Eğitim bilgisi girilmedi.");
  }

  // --- 4. YETENEKLER (20 Puan) ---
  const totalSkills =
    (skills.programmingLanguages?.length || 0) +
    (skills.developmentAreas?.length || 0) +
    (skills.versionControl?.length || 0);

  if (totalSkills >= 5) {
    score += 20;
  } else if (totalSkills > 0) {
    score += 10;
    feedback.push("Yeterli teknik yetenek girilmedi (En az 5 adet önerilir).");
  } else {
    feedback.push("Hiç teknik yetenek eklenmemiş.");
  }

  // --- 5. PROJELER (10 Puan) ---
  if (projects.length > 0) {
    score += 10;
  } else {
    feedback.push("Proje eklemek ATS skorunu artırır.");
  }

  return { score, feedback };
};
