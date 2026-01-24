import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      {/* 1. CSS STİLİ (COMPONENT İÇİNE GÖMÜLÜ)
         Bu CSS, sadece mobil ekranlarda (991px altı) çalışır.
         Menüye "display:none" yerine "max-height" animasyonu uygular.
      */}
      <style>
        {`
          @media (max-width: 991px) {
            .custom-collapse {
              max-height: 0;
              opacity: 0;
              overflow: hidden;
              transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
            }
            .custom-collapse.show {
              max-height: 300px; /* Menünün sığacağı tahmini bir yükseklik */
              opacity: 1;
            }
          }
        `}
      </style>

      <header className="fixed-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link
              className="navbar-brand d-flex align-items-center gap-2"
              to="/"
            >
              <FaFileAlt />
              cvGeneratorExpert
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              aria-expanded={!isNavCollapsed}
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* 2. KRİTİK DEĞİŞİKLİK
              Bootstrap'in "collapse" sınıfını kaldırdık (çünkü display:none yapıyor).
              Yerine kendi yazdığımız "custom-collapse" sınıfını ekledik.
            */}
            <div
              className={`navbar-collapse custom-collapse ${!isNavCollapsed ? "show" : ""}`}
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto text-center">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/cv"
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    CV Oluştur
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/cv-ats"
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    ATS Modu
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
