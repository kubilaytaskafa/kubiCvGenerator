import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addExperience,
  editExperience,
  deleteExperience,
} from "../redux/slices/experiences"; // Slice dosya isminin doğruluğundan emin olun

const ExperiencesPart = () => {
  const dispatch = useDispatch();
  // Store'dan veriyi çekiyoruz
  const { experiences } = useSelector((state) => state.experiences);

  const formRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    position: "", // CV'de olmazsa olmaz (Unvan)
    company: "", // Firma Adı (İstendi)
    startDate: "", // Başlangıç (İstendi)
    endDate: "", // Bitiş (İstendi)
    description: "", // Açıklama (İstendi)
  });

  const [isEditing, setIsEditing] = useState(false);

  // Input Değişikliği
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Gönderme
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.position.trim()) {
      alert("Lütfen Pozisyon ve Firma Adı alanlarını doldurun.");
      return;
    }

    if (isEditing) {
      // Güncelleme
      dispatch(editExperience(formData));
    } else {
      // Ekleme
      const newExp = {
        ...formData,
        id: new Date().getTime().toString(),
      };
      dispatch(addExperience(newExp));
    }
    resetForm();
  };

  // Düzenleme Modu
  const handleEditClick = (exp) => {
    setFormData(exp);
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // Silme İşlemi
  const handleDeleteClick = (id) => {
    if (window.confirm("Bu iş deneyimini silmek istediğinize emin misiniz?")) {
      dispatch(deleteExperience(id));
      if (isEditing && formData.id === id) resetForm();
    }
  };

  // Formu Sıfırla
  const resetForm = () => {
    setFormData({
      id: "",
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="d-flex flex-column gap-4 w-100">
      {/* --- PANEL BAŞLIĞI --- */}
      <div className="border-bottom pb-2">
        <h5 className="fw-bold text-dark mb-1 d-flex align-items-center">
          <i className="bi bi-briefcase-fill text-success me-2"></i>
          İş Deneyimi
        </h5>
        <p className="text-muted small mb-0" style={{ fontSize: "0.85rem" }}>
          Kariyer geçmişini ve sorumluluklarını yönet.
        </p>
      </div>

      {/* --- LİSTELEME ALANI --- */}
      <div className="d-flex flex-column gap-2" role="list">
        {experiences.length === 0 ? (
          <div className="alert alert-light border border-dashed text-center p-3 mb-0">
            <small className="text-muted">Henüz deneyim eklenmedi.</small>
          </div>
        ) : (
          experiences.map((exp) => (
            <div
              key={exp.id}
              // Sol kenar yeşil (Success) şerit
              className="card shadow-sm border-0 border-start border-4 border-success bg-white"
              role="listitem"
            >
              <div className="card-body p-2 d-flex justify-content-between align-items-center">
                <div className="overflow-hidden me-2">
                  <h6
                    className="fw-bold text-dark mb-0 text-truncate"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {exp.position}
                  </h6>
                  <div
                    className="text-muted small text-truncate"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {exp.company}
                  </div>
                  <div
                    className="text-secondary small fst-italic"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {exp.startDate ? exp.startDate.slice(0, 4) : ""} -{" "}
                    {exp.endDate ? exp.endDate.slice(0, 4) : "Devam"}
                  </div>
                </div>

                <div className="d-flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(exp)}
                    className="btn btn-sm btn-light text-primary border"
                    title="Düzenle"
                    style={{ width: "32px", height: "32px", padding: 0 }}
                  >
                    <i
                      className="bi bi-pencil-fill"
                      style={{ fontSize: "0.8rem" }}
                    ></i>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(exp.id)}
                    className="btn btn-sm btn-light text-danger border"
                    title="Sil"
                    style={{ width: "32px", height: "32px", padding: 0 }}
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
            {isEditing ? "Deneyimi Düzenle" : "Yeni Deneyim Ekle"}
          </h6>
        </div>
        <div className="card-body p-3">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            {/* 1. Pozisyon (Unvan) */}
            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Pozisyon (Örn: Senior Developer)"
                required
              />
            </div>

            {/* 2. Firma Adı */}
            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Firma Adı (Örn: Tech Solutions)"
                required
              />
            </div>

            {/* 3. Tarihler (Yan Yana) */}
            <div className="row g-2">
              <div className="col-6">
                <label
                  className="form-label small text-muted mb-0"
                  style={{ fontSize: "0.7rem" }}
                >
                  Başlangıç
                </label>
                <input
                  type="date"
                  className="form-control form-control-sm text-muted"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label
                  className="form-label small text-muted mb-0"
                  style={{ fontSize: "0.7rem" }}
                >
                  Bitiş (Opsiyonel)
                </label>
                <input
                  type="date"
                  className="form-control form-control-sm text-muted"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 4. Açıklama (Textarea) */}
            <div>
              <textarea
                className="form-control form-control-sm"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Görev tanımları, kullanılan teknolojiler ve başarılar..."
                style={{ resize: "vertical", minHeight: "80px" }}
              ></textarea>
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

export default ExperiencesPart;
