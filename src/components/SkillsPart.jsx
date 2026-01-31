import React, { useState, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSkill, editSkill, deleteSkill } from "../redux/slices/skills";
import "bootstrap-icons/font/bootstrap-icons.css";

// 1. ADIM: Constants dosyasından verileri içe aktar
// Not: constants.js dosyasının doğru yolda olduğundan emin olun
import {
  PROGRAMMING_LANGUAGES,
  DEVELOPMENT_AREAS,
  LANGUAGES,
  LANGUAGE_LEVELS, // Bunu constants dosyanıza eklediğinizi varsayıyorum
  VERSION_CONTROL,
  PROJECT_MANAGEMENT,
} from "../redux/constants";

const SkillsPart = () => {
  const dispatch = useDispatch();
  const skillsState = useSelector((state) => state.skills);
  const formRef = useRef(null);

  // 2. ADIM: Kategorileri ve ilişkili Constant listelerini eşleştiriyoruz
  const categoryConfig = useMemo(
    () => ({
      programmingLanguages: {
        label: "Yazılım Dilleri",
        description: "Kodlama yaparken kullandığınız ana diller.",
        options: PROGRAMMING_LANGUAGES,
      },
      developmentAreas: {
        label: "Geliştirme Alanları",
        description: "Uzmanlaştığınız genel teknoloji alanları.",
        options: DEVELOPMENT_AREAS,
      },
      languages: {
        label: "Yabancı Diller",
        description: "Konuşabildiğiniz diller ve seviyeleri.",
        options: LANGUAGES,
        isLanguage: true, // Bu kategoriye özel mantık için flag
      },
      versionControl: {
        label: "Versiyon Kontrol",
        description: "Kod takibi ve yönetimi için kullandığınız araçlar.",
        options: VERSION_CONTROL,
      },
      projectManagement: {
        label: "Proje Yönetimi",
        description: "İş takibi araçları ve yönetim metodolojileri.",
        options: PROJECT_MANAGEMENT,
      },
    }),
    [],
  );

  const [activeCategory, setActiveCategory] = useState("programmingLanguages");
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "", // Standart yetenekler için veya Dil Adı için
    level: "", // Sadece 'languages' kategorisi için seviye
  });

  const currentList = skillsState[activeCategory] || [];
  const currentConfig = categoryConfig[activeCategory];

  // Kategori değişince formu sıfırla
  const handleCategoryChange = (e) => {
    setActiveCategory(e.target.value);
    resetForm();
  };

  // Input değişimi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kayıt İşlemi
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasyon
    if (!formData.name.trim()) {
      alert("Lütfen bir seçim yapınız veya değer giriniz.");
      return;
    }

    // Eğer dil kategorisiyse ve seviye seçilmemişse uyar (Opsiyonel)
    if (currentConfig.isLanguage && !formData.level) {
      alert("Lütfen bir dil seviyesi seçiniz.");
      return;
    }

    // Kaydedilecek nihai string'i oluştur
    // Diller için: "İngilizce (C1)" formatında, diğerleri için direkt "JavaScript"
    let finalSkillName = formData.name;
    if (currentConfig.isLanguage) {
      // Dil adını label'dan bulmaya çalışalım (kullanıcı value seçtiyse)
      const langLabel =
        currentConfig.options.find(
          (o) => o.value === formData.name || o.label === formData.name,
        )?.label || formData.name;
      const levelLabel =
        LANGUAGE_LEVELS.find((l) => l.value === formData.level)?.label ||
        formData.level;
      // Seviye label'ını kısaltmak isteyebilirsiniz (Örn: "C1 - İleri" yerine sadece "C1")
      const shortLevel = levelLabel.split(" - ")[0];

      finalSkillName = `${langLabel} (${shortLevel})`;
    }

    const skillPayload = {
      id: isEditing ? formData.id : Date.now().toString(),
      name: finalSkillName,
    };

    if (isEditing) {
      dispatch(editSkill({ category: activeCategory, skill: skillPayload }));
    } else {
      dispatch(addSkill({ category: activeCategory, skill: skillPayload }));
    }

    resetForm();
  };

  const handleEditClick = (skill) => {
    // Düzenleme modunda veriyi geri parse etmek zor olabilir (string birleştirildiği için).
    // Basitlik adına, düzenleme modunda ismi direkt inputa koyuyoruz.
    // Gelişmiş versiyonda regex ile stringi ayırıp name ve level state'lerine atayabilirsiniz.
    setFormData({ id: skill.id, name: skill.name, level: "" });
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      dispatch(deleteSkill({ category: activeCategory, id }));
      if (isEditing && formData.id === id) resetForm();
    }
  };

  const resetForm = () => {
    setFormData({ id: "", name: "", level: "" });
    setIsEditing(false);
  };

  return (
    <div className="d-flex flex-column gap-4 w-100">
      {/* --- HEADER --- */}
      <div className="border-bottom pb-2">
        <h5 className="fw-bold text-dark mb-1 d-flex align-items-center">
          <i className="bi bi-tools text-warning me-2"></i>
          Yetenekler & Bilgi
        </h5>
        <p className="text-muted small mb-0">
          Teknik yetkinliklerinizi ve dillerinizi seçin.
        </p>
      </div>

      {/* --- KATEGORİ SEÇİMİ --- */}
      <div className="d-flex flex-column gap-2">
        <label className="form-label small fw-bold text-secondary mb-0">
          Kategori:
        </label>
        <select
          className="form-select form-select-sm fw-semibold shadow-sm"
          value={activeCategory}
          onChange={handleCategoryChange}
        >
          {Object.entries(categoryConfig).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>

        {/* Bilgi Kutusu */}
        <div className="alert alert-light border border-info text-info d-flex align-items-start p-2 mb-0 rounded-1">
          <i className="bi bi-info-circle-fill me-2 mt-1"></i>
          <small>{currentConfig.description}</small>
        </div>
      </div>

      {/* --- LİSTELEME --- */}
      <div className="d-flex flex-column gap-2">
        {currentList.length === 0 ? (
          <div className="text-center p-3 border border-dashed rounded bg-light">
            <small className="text-muted">
              Bu kategoride henüz ekleme yapılmadı.
            </small>
          </div>
        ) : (
          currentList.map((skill) => (
            <div
              key={skill.id}
              className="card shadow-sm border-0 border-start border-4 border-warning"
            >
              <div className="card-body p-2 d-flex justify-content-between align-items-center">
                <span className="fw-bold text-dark small">{skill.name}</span>
                <div className="btn-group">
                  <button
                    onClick={() => handleEditClick(skill)}
                    className="btn btn-sm btn-light text-primary"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(skill.id)}
                    className="btn btn-sm btn-light text-danger"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- EKLEME / DÜZENLEME FORMU --- */}
      <div ref={formRef} className="card bg-light border-0 shadow-sm">
        <div className="card-header bg-transparent border-0 pt-3 pb-0">
          <h6 className="fw-bold text-secondary mb-0 small">
            {isEditing ? "Seçimi Düzenle" : `Yeni ${currentConfig.label} Ekle`}
          </h6>
        </div>
        <div className="card-body p-3">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            {/* ÖZEL DURUM: YABANCI DİLLER */}
            {currentConfig.isLanguage ? (
              <div className="row g-2">
                <div className="col-8">
                  <select
                    className="form-select form-select-sm"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Dil Seçiniz...</option>
                    {currentConfig.options?.map((opt) => (
                      <option key={opt.value} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-4">
                  <select
                    className="form-select form-select-sm"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seviye</option>
                    {LANGUAGE_LEVELS?.map((lvl) => (
                      <option key={lvl.value} value={lvl.value}>
                        {lvl.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              /* STANDART DURUM: SEARCHABLE INPUT (DATALIST) */
              <div>
                <input
                  className="form-control form-control-sm"
                  list="datalistOptions"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Listeden seçin veya yazın..."
                  autoComplete="off"
                />
                <datalist id="datalistOptions">
                  {currentConfig.options?.map((opt) => (
                    <option key={opt.value} value={opt.label} />
                  ))}
                </datalist>
              </div>
            )}

            <div className="d-flex gap-2 mt-2">
              <button
                type="submit"
                className={`btn btn-sm flex-grow-1 fw-semibold ${isEditing ? "btn-warning" : "btn-dark"}`}
              >
                {isEditing ? "Güncelle" : "Ekle"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-sm btn-outline-secondary"
                >
                  İptal
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsPart;
