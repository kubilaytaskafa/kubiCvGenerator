import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const NotFoundPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light ">
      <SEO
        title="Sayfa Bulunamadı - 404"
        description="Aradığınız sayfa bulunamadı."
        noindex={true}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            {/* Büyük İkon */}
            <div className="mb-4 text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="currentColor"
                className="bi bi-file-earmark-x"
                viewBox="0 0 16 16"
              >
                <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z" />
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
              </svg>
            </div>

            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="mb-3 fw-bold text-dark">
              Bu Sayfa Teknik Mülakatı Geçemedi
            </h2>

            <p className="lead text-secondary mb-4">
              Aradığınız sayfa maalesef ekibimizden ayrıldı. Referansları
              güçlüydü ama beklentilerimizi karşılayamadı.
            </p>

            {/* Espri Kutusu - Kurumsal Şakalar */}
            <div className="card border-0 shadow-sm mb-5 text-start bg-white">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold mb-3 text-dark">
                  Olası Sebepler:
                </h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-transparent border-0 ps-0">
                    <i className="bi bi-check-circle-fill text-danger me-2"></i>
                    Sayfa "Open to Work" modunu kapattı.
                  </li>
                  <li className="list-group-item bg-transparent border-0 ps-0">
                    <i className="bi bi-check-circle-fill text-danger me-2"></i>
                    Bağlantı adresi maaş beklentisinde anlaşamadı.
                  </li>
                  <li className="list-group-item bg-transparent border-0 ps-0">
                    <i className="bi bi-check-circle-fill text-danger me-2"></i>
                    URL'de "Typo" yapmış olabilirsiniz (CV'nizde yapmayın!).
                  </li>
                </ul>
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <Link to="/" className="btn btn-primary btn-lg px-4 fw-bold">
                Ana Sayfaya Dön
              </Link>
              <Link to="/cv" className="btn btn-outline-dark btn-lg px-4">
                Yeni Bir CV Oluştur
              </Link>
            </div>

            <div className="mt-5 text-muted small">
              <p>Hata Kodu: 404 (Not Found) - İnsan Kaynakları Departmanı</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
