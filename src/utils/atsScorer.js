// utils/atsScorer.js

export const calculateAtsScore = (state) => {
  let score = 0;
  let feedback = [];

  const { userInfo, experiences, educations, skills, projects } = state;

  // 1. İLETİŞİM BİLGİLERİ (20 Puan)
  // ATS için en kritik verilerdir.
  if (userInfo.name && userInfo.lastName) score += 5;
  else feedback.push("İsim ve Soyisim girilmedi.");

  if (userInfo.title) score += 5;
  else feedback.push("Hedeflenen Ünvan (Job Title) eksik.");

  if (userInfo.email && userInfo.phoneNumber) score += 5;
  else feedback.push("E-posta veya Telefon numarası eksik.");

  if (userInfo.linkedin || userInfo.github) score += 5;
  else feedback.push("LinkedIn veya GitHub profili eklenmedi.");

  // 2. İŞ DENEYİMİ (35 Puan)
  // En yüksek ağırlık buradadır.
  if (experiences && experiences.length > 0) {
    score += 15; // En az 1 deneyim var

    // Açıklamaların uzunluğu kontrolü
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

  // 3. EĞİTİM (15 Puan)
  if (educations && educations.length > 0) {
    score += 15;
  } else {
    feedback.push("Eğitim bilgisi girilmedi.");
  }

  // 4. YETENEKLER (20 Puan)
  // Keyword matching için kritiktir.
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

  // 5. PROJELER (10 Puan)
  if (projects && projects.length > 0) {
    score += 10;
  } else {
    feedback.push("Proje eklemek ATS skorunu artırır.");
  }

  return { score, feedback };
};
