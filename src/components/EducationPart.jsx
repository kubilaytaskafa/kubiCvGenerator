import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addEducation,
  editEducation,
  deleteEducation,
} from "../redux/slices/educations"; // Dosya yolunun doğruluğundan emin olun

const EducationPart = () => {
  const dispatch = useDispatch();
  // Store'dan veriyi çekiyoruz
  const { educations } = useSelector((state) => state.educations);

  const formRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Input Değişikliği
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Kayıt İşlemi
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.school.trim() || !formData.degree.trim()) {
      alert("Okul ve Bölüm bilgileri zorunludur.");
      return;
    }

    if (isEditing) {
      // Güncelleme
      dispatch(editEducation(formData));
    } else {
      // Ekleme
      const newEdu = {
        ...formData,
        id: new Date().getTime().toString(),
      };
      dispatch(addEducation(newEdu));
    }
    resetForm();
  };

  // Düzenleme Modunu Aç
  const handleEditClick = (edu) => {
    setFormData(edu);
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // Silme İşlemi
  const handleDeleteClick = (id) => {
    if (
      window.confirm("Bu eğitim bilgisini silmek istediğinize emin misiniz?")
    ) {
      dispatch(deleteEducation(id));
      if (isEditing && formData.id === id) resetForm();
    }
  };

  // Formu Temizle
  const resetForm = () => {
    setFormData({ id: "", school: "", degree: "", startDate: "", endDate: "" });
    setIsEditing(false);
  };

  return (
    <div className="d-flex flex-column gap-4 w-100 mt-4">
      {/* --- PANEL BAŞLIĞI --- */}
      <div className="border-bottom pb-2">
        <h5 className="fw-bold text-dark mb-1 d-flex align-items-center">
          <i className="bi bi-mortarboard-fill text-danger me-2"></i>
          Eğitim Bilgileri
        </h5>
        <p className="text-muted small mb-0" style={{ fontSize: "0.85rem" }}>
          Okul ve mezuniyet bilgilerini yönet.
        </p>
      </div>

      {/* --- LİSTELEME ALANI (KOMPAKT) --- */}
      <div className="d-flex flex-column gap-2" role="list">
        {educations.length === 0 ? (
          <div className="alert alert-light border border-dashed text-center p-3 mb-0">
            <small className="text-muted">
              Henüz eğitim bilgisi eklenmedi.
            </small>
          </div>
        ) : (
          educations.map((edu) => (
            <div
              key={edu.id}
              // Sol taraftaki border rengini kırmızı (danger) yaptık ki sertifikadan ayrılsın
              className="card shadow-sm border-0 border-start border-4 border-danger bg-white"
              role="listitem"
            >
              <div className="card-body p-2 d-flex justify-content-between align-items-center">
                <div className="overflow-hidden me-2">
                  <h6
                    className="fw-bold text-dark mb-0 text-truncate"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {edu.school}
                  </h6>
                  <div
                    className="text-muted small text-truncate"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {edu.degree}
                  </div>
                  <div
                    className="text-secondary small fst-italic"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {edu.startDate ? edu.startDate.slice(0, 4) : ""} -{" "}
                    {edu.endDate ? edu.endDate.slice(0, 4) : "Devam"}
                  </div>
                </div>

                <div className="d-flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(edu)}
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
                    onClick={() => handleDeleteClick(edu.id)}
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
            {isEditing ? "Eğitimi Düzenle" : "Yeni Eğitim Ekle"}
          </h6>
        </div>
        <div className="card-body p-3">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            {/* Okul Adı */}
            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Okul Adı (Örn: ODTÜ)"
                required
              />
            </div>

            {/* Bölüm / Derece */}
            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="Bölüm (Örn: Bilgisayar Müh.)"
                required
              />
            </div>

            {/* Tarihler (Yan Yana) */}
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

export default EducationPart;
