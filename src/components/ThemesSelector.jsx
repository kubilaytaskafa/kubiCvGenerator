import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const ThemeSelector = () => {
  // Mevcut URL'deki query parametresini okuyoruz
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentStyle = searchParams.get("style") || "modern"; // Varsayılan: modern

  const themes = [
    {
      id: "modern",
      label: "Modern",
      icon: "bi-laptop",
      color: "btn-outline-primary",
    },
    {
      id: "elegant",
      label: "Zarif",
      icon: "bi-gem",
      color: "btn-outline-secondary",
    },
    {
      id: "natural",
      label: "Doğal",
      icon: "bi-tree-fill",
      color: "btn-outline-success",
    },
    {
      id: "professional",
      label: "Profesyonel",
      icon: "bi-briefcase-fill",
      color: "btn-outline-dark",
    },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 mb-4 p-3 bg-light rounded shadow-sm">
      <span className="fw-bold text-secondary me-2 small text-uppercase">
        <i className="bi bi-magic me-1"></i> Tasarım:
      </span>

      {themes.map((theme) => {
        const isActive = currentStyle === theme.id;

        return (
          <Link
            key={theme.id}
            to={`?style=${theme.id}`}
            className={`btn btn-sm d-flex align-items-center gap-2 fw-semibold transition-all text-decoration-none ${
              isActive
                ? `${theme.color.replace("outline-", "")} shadow text-white`
                : `${theme.color} border-0` // BURADAKİ 'bg-white' SİLİNDİ
            }`}
            style={{ minWidth: "110px", justifyContent: "center" }}
            replace={true}
          >
            <i className={`bi ${theme.icon}`}></i>
            {theme.label}
          </Link>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
