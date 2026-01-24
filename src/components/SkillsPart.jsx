import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSkill, editSkill, deleteSkill } from "../redux/slices/skills"; // Dosya yolunu kontrol et

const SkillsPart = () => {
  const dispatch = useDispatch();

  // Tüm yetenek state'ini çekiyoruz
  const skillsState = useSelector((state) => state.skills);

  const formRef = useRef(null);

  // Kategori Listesi (Selectbox için)
  const categories = [
    { key: "programmingLanguages", label: "Yazılım Dilleri" },
    { key: "developmentAreas", label: "Geliştirme Alanları" },
    { key: "languages", label: "Yabancı Diller" },
    { key: "versionControl", label: "Versiyon Kontrol" },
    { key: "projectManagement", label: "Proje Yönetimi" },
  ];

  // Aktif Kategori State'i (Varsayılan: Yazılım Dilleri)
  const [activeCategory, setActiveCategory] = useState("programmingLanguages");

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // O anki kategorinin listesini al
  // Eğer state henüz yüklenmediyse boş array dönsün
  const currentList = skillsState[activeCategory] || [];

  // Input Değişikliği
  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  // Kategori Değişimi
  const handleCategoryChange = (e) => {
    setActiveCategory(e.target.value);
    resetForm(); // Kategori değişince formu temizle
  };

  // Kayıt İşlemi
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Yetenek adı boş olamaz.");
      return;
    }

    if (isEditing) {
      // Düzenleme
      dispatch(
        editSkill({
          category: activeCategory,
          skill: formData,
        }),
      );
    } else {
      // Ekleme
      const newSkill = {
        id: Date.now().toString(),
        name: formData.name,
      };
      dispatch(
        addSkill({
          category: activeCategory,
          skill: newSkill,
        }),
      );
    }
    resetForm();
  };

  // Düzenle
  const handleEditClick = (skill) => {
    setFormData(skill);
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // Sil
  const handleDeleteClick = (id) => {
    if (window.confirm("Bu yeteneği silmek istediğinize emin misiniz?")) {
      dispatch(
        deleteSkill({
          category: activeCategory,
          id: id,
        }),
      );
      if (isEditing && formData.id === id) resetForm();
    }
  };

  // Form Sıfırla
  const resetForm = () => {
    setFormData({ id: "", name: "" });
    setIsEditing(false);
  };

  return (
    <div className="d-flex flex-column gap-4 w-100">
      {/* --- PANEL BAŞLIĞI --- */}
      <div className="border-bottom pb-2">
        <h5 className="fw-bold text-dark mb-1 d-flex align-items-center">
          <i className="bi bi-tools text-warning me-2"></i>
          Yetenekler
        </h5>
        <p className="text-muted small mb-0" style={{ fontSize: "0.85rem" }}>
          Teknik ve sosyal becerilerini yönet.
        </p>
      </div>

      {/* --- KATEGORİ SEÇİMİ --- */}
      <div>
        <label className="form-label small fw-bold text-secondary mb-1">
          Kategori Seç:
        </label>
        <select
          className="form-select form-select-sm fw-semibold"
          value={activeCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* --- LİSTELEME ALANI --- */}
      <div className="d-flex flex-column gap-2" role="list">
        {currentList.length === 0 ? (
          <div className="alert alert-light border border-dashed text-center p-3 mb-0">
            <small className="text-muted">Bu kategoride henüz kayıt yok.</small>
          </div>
        ) : (
          currentList.map((skill) => (
            <div
              key={skill.id}
              // Turuncu (Warning) şerit
              className="card shadow-sm border-0 border-start border-4 border-warning bg-white"
              role="listitem"
            >
              <div className="card-body p-2 d-flex justify-content-between align-items-center">
                <div className="overflow-hidden me-2">
                  <h6
                    className="fw-bold text-dark mb-0 text-truncate"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {skill.name}
                  </h6>
                </div>

                {/* Butonlar */}
                <div className="d-flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(skill)}
                    className="btn btn-sm btn-light text-primary border"
                    title="Düzenle"
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-pencil-fill"
                      style={{ fontSize: "0.8rem" }}
                    ></i>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(skill.id)}
                    className="btn btn-sm btn-light text-danger border"
                    title="Sil"
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-trash-fill"
                      style={{ fontSize: "0.8rem" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- FORM ALANI --- */}
      <div ref={formRef} className="card bg-light border-0 shadow-sm">
        <div className="card-header bg-transparent border-0 pt-3 pb-0">
          <h6
            className="fw-bold text-secondary mb-0"
            style={{ fontSize: "0.9rem" }}
          >
            {isEditing ? "Yeteneği Düzenle" : "Yeni Yetenek Ekle"}
          </h6>
          <small className="text-muted" style={{ fontSize: "0.7rem" }}>
            (Seçili Kategori:{" "}
            {categories.find((c) => c.key === activeCategory)?.label})
          </small>
        </div>
        <div className="card-body p-3">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            {/* Yetenek Adı */}
            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Örn: JavaScript, Jira, İngilizce..."
                required
              />
            </div>

            {/* Butonlar */}
            <div className="d-flex gap-2 mt-2">
              <button
                type="submit"
                className={`btn btn-sm flex-grow-1 fw-semibold ${
                  isEditing ? "btn-warning text-dark" : "btn-dark"
                }`}
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
