/**
 * ATS Uyumluluk Skorlama Sistemi
 * %100 ATS uyumlu CV için gerekli kriterleri kontrol eder
 */

export const calculateAtsScore = (state) => {
  const {
    userInfo,
    experiences,
    educations,
    skills,
    socialSkills,
    projects,
    certificates,
  } = state;

  let score = 0;
  const details = {
    critical: [], // Kritik eksiklikler (kırmızı)
    important: [], // Önemli öneriler (turuncu)
    optional: [], // İsteğe bağlı iyileştirmeler (mavi)
  };

  // ============ KRİTİK ALANLAR (Toplam 60 puan) ============

  // 1. İsim ve Soyisim (10 puan)
  if (userInfo.name && userInfo.lastName) {
    score += 10;
  } else {
    details.critical.push({
      title: "İsim ve Soyisim Eksik",
      description: "ATS için zorunlu alan. Tam adınızı ekleyin.",
      icon: "👤",
    });
  }

  // 2. İletişim Bilgileri (15 puan)
  let contactScore = 0;
  if (userInfo.email) contactScore += 5;
  else
    details.critical.push({
      title: "E-posta Adresi Eksik",
      description: "Profesyonel bir e-posta adresi ekleyin.",
      icon: "📧",
    });

  if (userInfo.phoneNumber) contactScore += 5;
  else
    details.critical.push({
      title: "Telefon Numarası Eksik",
      description: "İletişim için telefon numaranızı ekleyin.",
      icon: "📱",
    });

  // Konum - ATS için ÇOK ÖNEMLİ!
  if (userInfo.city || userInfo.country) contactScore += 5;
  else
    details.critical.push({
      title: "Konum Bilgisi Eksik",
      description: "Şehir ve ülke bilgisi ATS skorunu önemli ölçüde artırır!",
      icon: "📍",
    });

  score += contactScore;

  // 3. İş Deneyimi (20 puan)
  if (experiences?.experiences?.length > 0) {
    score += 15;

    // Deneyimlerde konum kontrolü
    const hasLocation = experiences.experiences.some((exp) => exp.location);
    if (hasLocation) {
      score += 5;
    } else {
      details.important.push({
        title: "Deneyimlerde Konum Bilgisi",
        description: "İş deneyimlerinize konum (şehir, ülke) ekleyin.",
        icon: "🏢",
      });
    }
  } else {
    details.critical.push({
      title: "İş Deneyimi Eksik",
      description: "En az bir iş deneyimi ekleyin. ATS için kritik!",
      icon: "💼",
    });
  }

  // 4. Eğitim (15 puan)
  if (educations?.educations?.length > 0) {
    score += 15;
  } else {
    details.critical.push({
      title: "Eğitim Bilgisi Eksik",
      description: "En az bir eğitim bilgisi ekleyin.",
      icon: "🎓",
    });
  }

  // ============ ÖNEMLİ ALANLAR (Toplam 30 puan) ============

  // 5. Professional Summary (10 puan) - ATS skorunu artırır
  if (userInfo.summary && userInfo.summary.length >= 50) {
    score += 10;
  } else if (userInfo.summary) {
    score += 5;
    details.important.push({
      title: "Professional Summary Kısa",
      description:
        "Özgeçmiş özetinizi en az 50 karakter yapın. 3-5 cümle ideal.",
      icon: "📝",
    });
  } else {
    details.important.push({
      title: "Professional Summary Eksik",
      description: "Profesyonel özet ekleyin. ATS skorunuzu %10 artırır!",
      icon: "📝",
    });
  }

  // 6. Beceriler (15 puan)
  let skillsScore = 0;
  const totalSkills =
    (skills?.programmingLanguages?.length || 0) +
    (skills?.developmentAreas?.length || 0) +
    (skills?.versionControl?.length || 0) +
    (skills?.languages?.length || 0);

  if (totalSkills >= 10) skillsScore = 15;
  else if (totalSkills >= 5) skillsScore = 10;
  else if (totalSkills >= 3) skillsScore = 5;
  else {
    details.important.push({
      title: "Yetersiz Beceri",
      description:
        "En az 10 beceri ekleyin. İş ilanındaki anahtar kelimeleri kullanın!",
      icon: "🎯",
    });
  }
  score += skillsScore;

  // 7. Soft Skills (5 puan)
  if (socialSkills?.socialSkills?.length >= 3) {
    score += 5;
  } else {
    details.important.push({
      title: "Soft Skills Eksik",
      description:
        "En az 3 soft skill ekleyin (Communication, Leadership, vb.)",
      icon: "🤝",
    });
  }

  // ============ İSTEĞE BAĞLI ALANLAR (Toplam 10 puan) ============

  // 8. LinkedIn Profili (3 puan)
  if (userInfo.linkedin) {
    score += 3;
  } else {
    details.optional.push({
      title: "LinkedIn Profili",
      description: "LinkedIn profilinizi ekleyin.",
      icon: "💼",
    });
  }

  // 9. Projeler (4 puan)
  if (projects?.projects?.length >= 2) {
    score += 4;
  } else if (projects?.projects?.length === 1) {
    score += 2;
    details.optional.push({
      title: "Daha Fazla Proje",
      description: "En az 2-3 proje ekleyin.",
      icon: "🚀",
    });
  } else {
    details.optional.push({
      title: "Proje Eksik",
      description: "Önemli projelerinizi ekleyin.",
      icon: "🚀",
    });
  }

  // 10. Sertifikalar (3 puan)
  if (certificates?.certificates?.length > 0) {
    score += 3;
  } else {
    details.optional.push({
      title: "Sertifika",
      description: "Varsa sertifikalarınızı ekleyin.",
      icon: "🏆",
    });
  }

  // Eski feedback formatı için (geriye uyumluluk)
  const legacyFeedback = [
    ...details.critical.map((d) => d.description),
    ...details.important.map((d) => d.description),
  ];

  return {
    score: Math.min(100, score),
    feedback: legacyFeedback,
    details,
    summary: getScoreSummary(score),
  };
};

const getScoreSummary = (score) => {
  if (score === 100) {
    return {
      level: "Mükemmel",
      color: "#22c55e",
      message:
        "CV'niz %100 ATS uyumlu! İş başvurularınızda başarılar dileriz! 🎉",
      emoji: "✅",
    };
  } else if (score >= 90) {
    return {
      level: "Çok İyi",
      color: "#22c55e",
      message:
        "CV'niz ATS sistemleri için çok iyi durumda. Birkaç küçük iyileştirme ile mükemmel olacak!",
      emoji: "🌟",
    };
  } else if (score >= 70) {
    return {
      level: "İyi",
      color: "#eab308",
      message:
        "CV'niz iyi durumda ancak bazı önemli alanlar eksik. Önerileri takip edin.",
      emoji: "⚠️",
    };
  } else if (score >= 50) {
    return {
      level: "Orta",
      color: "#f97316",
      message:
        "CV'nizde önemli eksiklikler var. ATS sistemlerinden geçmek için iyileştirmeler gerekli.",
      emoji: "⚠️",
    };
  } else {
    return {
      level: "Zayıf",
      color: "#ef4444",
      message: "CV'niz ATS için hazır değil. Kritik alanları tamamlayın!",
      emoji: "❌",
    };
  }
};
