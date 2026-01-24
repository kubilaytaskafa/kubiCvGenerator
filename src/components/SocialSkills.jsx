import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addSocialSkill,
  editSocialSkill,
  deleteSocialSkill,
} from "../redux/slices/socialSkills"; // Dosya yolunun doğruluğundan emin olun

const SocialSkills = () => {
  const dispatch = useDispatch();

  // Store'dan veriyi çekiyoruz (state ismi store.js'deki isimlendirmene bağlı)
  const { socialSkills } = useSelector((state) => state.socialSkills);

  const formRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "", // Yetenek Adı (Örn: Liderlik)
  });

  const [isEditing, setIsEditing] = useState(false);

  // Input Değişikliği
  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  // Kayıt İşlemi
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Lütfen bir yetenek adı giriniz.");
      return;
    }

    if (isEditing) {
      dispatch(editSocialSkill(formData));
    } else {
      const newSkill = {
        id: Date.now().toString(),
        name: formData.name,
      };
      dispatch(addSocialSkill(newSkill));
    }
    resetForm();
  };

  // Düzenleme
  const handleEditClick = (skill) => {
    setFormData(skill);
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // Silme
  const handleDeleteClick = (id) => {
    if (
      window.confirm("Bu sosyal yeteneği silmek istediğinize emin misiniz?")
    ) {
      dispatch(deleteSocialSkill(id));
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
          <i className="bi bi-people-fill text-primary me-2"></i>
          Sosyal Yetenekler
        </h5>
        <p className="text-muted small mb-0" style={{ fontSize: "0.85rem" }}>
          Kişisel özelliklerini ve sosyal becerilerini ekle.
        </p>
      </div>

      {/* --- LİSTELEME ALANI --- */}
      <div className="d-flex flex-column gap-2" role="list">
        {socialSkills.length === 0 ? (
          <div className="alert alert-light border border-dashed text-center p-3 mb-0">
            <small className="text-muted">
              Henüz sosyal yetenek eklenmedi.
            </small>
          </div>
        ) : (
          socialSkills.map((skill) => (
            <div
              key={skill.id}
              // Sol kenar Mavi (Primary) şerit
              className="card shadow-sm border-0 border-start border-4 border-primary bg-white"
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
            {isEditing ? "Yeteneği Düzenle" : "Yeni Sosyal Yetenek"}
          </h6>
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
                placeholder="Örn: İletişim, Liderlik, Empati..."
                required
              />
            </div>

            {/* Butonlar */}
            <div className="d-flex gap-2 mt-2">
              <button
                type="submit"
                className={`btn btn-sm flex-grow-1 fw-semibold ${
                  isEditing ? "btn-primary text-white" : "btn-dark"
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

export default SocialSkills;
