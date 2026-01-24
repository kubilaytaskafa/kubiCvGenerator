import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCertificate,
  editCertificate,
  deleteCertificate,
} from "../redux/slices/certificates";

const CertificatePart = () => {
  const dispatch = useDispatch();
  const { certificates } = useSelector((state) => state.certificates);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    issuer: "",
    date: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.issuer.trim()) {
      alert("Başlık ve Kurum alanları zorunludur.");
      return;
    }

    if (isEditing) {
      dispatch(editCertificate(formData));
    } else {
      const newCert = {
        ...formData,
        id: new Date().getTime().toString(),
      };
      dispatch(addCertificate(newCert));
    }
    resetForm();
  };

  const handleEditClick = (cert) => {
    setFormData(cert);
    setIsEditing(true);
    // Panel küçük olduğu için hafif bir kaydırma yeterli
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      dispatch(deleteCertificate(id));
      if (isEditing && formData.id === id) resetForm();
    }
  };

  const resetForm = () => {
    setFormData({ id: "", title: "", issuer: "", date: "" });
    setIsEditing(false);
  };

  return (
    <div className="d-flex flex-column gap-4 w-100">
      {/* --- PANEL BAŞLIĞI --- */}
      <div className="border-bottom pb-2">
        <h5 className="fw-bold text-dark mb-1 d-flex align-items-center">
          <i className="bi bi-patch-check-fill text-primary me-2"></i>
          Sertifikalar
        </h5>
        <p className="text-muted small mb-0" style={{ fontSize: "0.85rem" }}>
          Kazanımları ekle, düzenle veya sil.
        </p>
      </div>

      {/* --- LİSTELEME ALANI (KOMPAKT) --- */}
      <div className="d-flex flex-column gap-2" role="list">
        {certificates.length === 0 ? (
          <div className="alert alert-light border border-dashed text-center p-3 mb-0">
            <small className="text-muted">Henüz sertifika eklenmedi.</small>
          </div>
        ) : (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="card shadow-sm border-0 border-start border-4 border-primary bg-white"
              role="listitem"
            >
              <div className="card-body p-2 d-flex justify-content-between align-items-center">
                <div className="overflow-hidden me-2">
                  <h6
                    className="fw-bold text-dark mb-0 text-truncate"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {cert.title}
                  </h6>
                  <div
                    className="text-muted small text-truncate"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {cert.issuer}
                  </div>
                </div>

                <div className="d-flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(cert)}
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
                    onClick={() => handleDeleteClick(cert.id)}
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

      {/* --- FORM ALANI (EDİTÖR TARZI) --- */}
      <div ref={formRef} className="card bg-light border-0 shadow-sm">
        <div className="card-header bg-transparent border-0 pt-3 pb-0">
          <h6
            className="fw-bold text-secondary mb-0"
            style={{ fontSize: "0.9rem" }}
          >
            {isEditing ? "Kaydı Düzenle" : "Yeni Ekle"}
          </h6>
        </div>
        <div className="card-body p-3">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Sertifika Adı (Örn: React)"
                required
              />
            </div>

            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="Kurum (Örn: Udemy)"
                required
              />
            </div>

            <div>
              <input
                type="date"
                className="form-control form-control-sm text-muted"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

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

export default CertificatePart;
