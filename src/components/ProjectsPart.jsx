import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProject,
  editProject,
  deleteProject,
} from "../redux/slices/projects"; // Dosya yolunun doğruluğundan emin olun

const ProjectsPart = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  const formRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "", // Proje Adı
    technologies: "", // Kullanılan Teknolojiler (Örn: React, Node.js)
    link: "", // Proje Linki (GitHub veya Canlı)
    description: "", // Proje Detayı
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Proje adı zorunludur.");
      return;
    }

    if (isEditing) {
      dispatch(editProject(formData));
    } else {
      const newProject = {
        ...formData,
        id: Date.now().toString(),
      };
      dispatch(addProject(newProject));
    }
    resetForm();
  };

  const handleEditClick = (project) => {
    setFormData(project);
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
      dispatch(deleteProject(id));
      if (isEditing && formData.id === id) resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      technologies: "",
      link: "",
      description: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="d-flex flex-column gap-4 w-100">
      {/* --- PANEL BAŞLIĞI --- */}
      <div className="border-bottom pb-2">
        <h5 className="fw-bold text-dark mb-1 d-flex align-items-center">
          <i className="bi bi-code-slash text-info me-2"></i>
          Projeler
        </h5>
        <p className="text-muted small mb-0" style={{ fontSize: "0.85rem" }}>
          Geliştirdiğin projeleri ve portföyünü ekle.
        </p>
      </div>

      {/* --- LİSTELEME ALANI --- */}
      <div className="d-flex flex-column gap-2" role="list">
        {projects.length === 0 ? (
          <div className="alert alert-light border border-dashed text-center p-3 mb-0">
            <small className="text-muted">Henüz proje eklenmedi.</small>
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj.id}
              // Sol kenar Info (Mavi) şerit
              className="card shadow-sm border-0 border-start border-4 border-info bg-white"
              role="listitem"
            >
              <div className="card-body p-2 d-flex justify-content-between align-items-center">
                <div className="overflow-hidden me-2">
                  <h6
                    className="fw-bold text-dark mb-0 text-truncate"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {proj.name}
                  </h6>
                  <div
                    className="text-muted small text-truncate"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {proj.technologies}
                  </div>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info small text-decoration-none"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <i className="bi bi-link-45deg"></i> Linke Git
                    </a>
                  )}
                </div>

                <div className="d-flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(proj)}
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
                    onClick={() => handleDeleteClick(proj.id)}
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
            {isEditing ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
          </h6>
        </div>
        <div className="card-body p-3">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            {/* 1. Proje Adı */}
            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Proje Adı (Örn: E-Ticaret Sitesi)"
                required
              />
            </div>

            {/* 2. Teknolojiler */}
            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="Teknolojiler (Örn: React, Node.js)"
              />
            </div>

            {/* 3. Proje Linki */}
            <div>
              <input
                type="url"
                className="form-control form-control-sm text-muted"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Proje Linki / GitHub URL"
              />
            </div>

            {/* 4. Açıklama */}
            <div>
              <textarea
                className="form-control form-control-sm"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Proje hakkında kısa bilgi..."
                style={{ resize: "none" }}
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

export default ProjectsPart;
