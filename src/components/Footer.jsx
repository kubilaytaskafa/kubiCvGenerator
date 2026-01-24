import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-2 mt-auto fixed-bottom">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} cvGeneratorExpert. Tüm hakları
            saklıdır.
          </p>

          <p className="mb-0">
            <a
              href="https://linkedin.com/in/kubilayTaskafa"
              className="text-primary text-decoration-none fw-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kubilay Taşkafa
            </a>{" "}
            tarafından geliştirilmiştir.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
