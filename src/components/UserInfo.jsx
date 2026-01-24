import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../redux/slices/userInfo"; // Dosya yolunu kontrol et

const UserInfo = () => {
  const dispatch = useDispatch();

  // Redux'tan mevcut bilgileri çek
  const storedUserInfo = useSelector((state) => state.userInfo);

  // Form State'i (Başlangıçta Redux verisiyle dolar)
  const [formData, setFormData] = useState(storedUserInfo);

  // Kaydedildi animasyonu için state
  const [isSaved, setIsSaved] = useState(false);

  // Dosya yükleme referansı
  const fileInputRef = useRef(null);

  // Redux state değişirse (örn: sayfa yenilenince) formu güncelle
  useEffect(() => {
    setFormData(storedUserInfo);
  }, [storedUserInfo]);

  // Input Değişikliği
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Resim Yükleme (Base64 Çevrimi)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Base64 string'i state'e atıyoruz
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Gönderme
  const handleSubmit = (e) => {
    e.preventDefault();

    // Redux'a ve LocalStorage'a kaydet
    dispatch(updateUserInfo(formData));

    // Kullanıcıya geri bildirim ver
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="d-flex flex-column gap-4 w-100">
      {/* --- PANEL BAŞLIĞI --- */}
      <div className="border-bottom pb-2">
        <h5 className="fw-bold text-dark mb-1 d-flex align-items-center">
          <i className="bi bi-person-circle text-primary me-2"></i>
          Kişisel Bilgiler
        </h5>
        <p className="text-muted small mb-0" style={{ fontSize: "0.85rem" }}>
          İletişim ve profil bilgilerini düzenle.
        </p>
      </div>

      {/* --- FORM ALANI --- */}
      <div className="card bg-light border-0 shadow-sm">
        <div className="card-body p-3">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* 1. Profil Resmi Alanı */}
            <div className="d-flex align-items-center gap-3">
              <div
                className="position-relative overflow-hidden rounded-circle border border-2 border-white shadow-sm"
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#e9ecef",
                }}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Profil"
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <div className="w-100 h-100 d-flex align-items-center justifyContent-center text-muted">
                    <i className="bi bi-person-fill fs-2 mx-auto"></i>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary mb-1"
                  onClick={() => fileInputRef.current.click()}
                >
                  <i className="bi bi-upload me-1"></i> Fotoğraf Seç
                </button>
                <div className="text-muted" style={{ fontSize: "0.65rem" }}>
                  Önerilen: Kare boyut (PNG, JPG)
                </div>
                {/* Gizli Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <hr className="my-1 text-muted opacity-25" />

            {/* 2. Ad Soyad (Yan Yana) */}
            <div className="row g-2">
              <div className="col-6">
                <label className="form-label small fw-bold text-secondary mb-1">
                  Ad
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınız"
                />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold text-secondary mb-1">
                  Soyad
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Soyadınız"
                />
              </div>
            </div>

            {/* 3. Ünvan */}
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">
                Ünvan
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Örn: Frontend Developer"
              />
            </div>

            {/* 4. İletişim (Tel & Email) */}
            <div className="row g-2">
              <div className="col-12">
                <label className="form-label small fw-bold text-secondary mb-1">
                  E-Posta
                </label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@ornek.com"
                  />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-secondary mb-1">
                  Telefon
                </label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-telephone"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+90 555 000 0000"
                  />
                </div>
              </div>
            </div>

            {/* 5. Adres */}
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">
                Adres (Şehir/Ülke)
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="İstanbul, Türkiye"
              />
            </div>

            {/* 6. Sosyal Medya */}
            <div className="row g-2">
              <div className="col-6">
                <label className="form-label small fw-bold text-secondary mb-1">
                  LinkedIn
                </label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white text-primary">
                    <i className="bi bi-linkedin"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="Kullanıcı adı"
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold text-secondary mb-1">
                  GitHub
                </label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white text-dark">
                    <i className="bi bi-github"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="Kullanıcı adı"
                  />
                </div>
              </div>
            </div>

            {/* 7. Hakkımda */}
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">
                Hakkımda
              </label>
              <textarea
                className="form-control form-control-sm"
                name="about"
                rows="4"
                value={formData.about}
                onChange={handleChange}
                placeholder="Kendinizden kısaca bahsedin..."
                style={{ resize: "vertical" }}
              ></textarea>
            </div>

            {/* Kaydet Butonu */}
            <button
              type="submit"
              className={`btn btn-sm fw-bold transition-all ${
                isSaved ? "btn-success" : "btn-primary"
              }`}
            >
              {isSaved ? (
                <span>
                  <i className="bi bi-check-circle me-1"></i> Kaydedildi!
                </span>
              ) : (
                "Bilgileri Güncelle"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
