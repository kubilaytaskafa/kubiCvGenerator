import React from "react";
import { useSelector } from "react-redux";

const CvScreen = () => {
  // --- VERİLERİ ÇEKME ---
  const userInfo = useSelector((state) => state.userInfo);
  const { experiences } = useSelector((state) => state.experiences);
  const { educations } = useSelector((state) => state.educations);
  const skillsState = useSelector((state) => state.skills);
  const { socialSkills } = useSelector((state) => state.socialSkills);
  const { projects } = useSelector((state) => state.projects);
  const { certificates } = useSelector((state) => state.certificates);

  // --- YARDIMCI FONKSİYONLAR ---
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Liste maddesi (bullet point) render etme
  const renderDescription = (text) => {
    if (!text) return null;
    return (
      <ul className="mb-0 ps-3 mt-1 text-dark description-text">
        {text.split("\n").map((line, index) => (
          <li key={index} className="mb-0">
            {line}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div id="cv-print-area" className="cv-container bg-white">
      {/* ================= HEADER ================= */}
      <header className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3 header-section">
        {/* Sol Taraf: İsim ve Ünvan */}
        <div className="flex-grow-1 pe-3">
          <h1 className="fw-bold text-uppercase mb-0 text-primary-dark name-title">
            {userInfo.name}{" "}
            <span className="text-dark">{userInfo.lastName}</span>
          </h1>
          <div className="job-title mb-2 text-secondary fw-bold text-uppercase letter-spacing-1">
            {userInfo.title}
          </div>

          {/* İletişim Bilgileri - Grid Yapısı */}
          <div className="contact-grid">
            {userInfo.email && (
              <div className="contact-item">
                <i className="bi bi-envelope-fill me-2 text-primary-dark"></i>
                {userInfo.email}
              </div>
            )}
            {userInfo.phoneNumber && (
              <div className="contact-item">
                <i className="bi bi-telephone-fill me-2 text-primary-dark"></i>
                {userInfo.phoneNumber}
              </div>
            )}
            {userInfo.address && (
              <div className="contact-item">
                <i className="bi bi-geo-alt-fill me-2 text-primary-dark"></i>
                {userInfo.address}
              </div>
            )}
            {userInfo.linkedin && (
              <div className="contact-item">
                <i className="bi bi-linkedin me-2 text-primary-dark"></i>
                <a
                  href={`https://linkedin.com/in/${userInfo.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  in/{userInfo.linkedin}
                </a>
              </div>
            )}
            {userInfo.github && (
              <div className="contact-item">
                <i className="bi bi-github me-2 text-primary-dark"></i>
                <a
                  href={`https://github.com/${userInfo.github}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/{userInfo.github}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Sağ Taraf: Resim */}
        {userInfo.image && (
          <div className="flex-shrink-0 profile-image-container">
            <img src={userInfo.image} alt="Profile" className="profile-image" />
          </div>
        )}
      </header>

      {/* ================= HAKKIMDA ================= */}
      {userInfo.about && (
        <section className="mb-3 break-avoid">
          <p className="text-dark small mb-0 fst-italic lh-sm border-start border-4 border-light ps-2">
            {userInfo.about}
          </p>
        </section>
      )}

      {/* ================= DENEYİM ================= */}
      {experiences.length > 0 && (
        <section className="section-block">
          <h2 className="section-title">DENEYİM</h2>
          <div className="d-flex flex-column gap-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="break-avoid">
                <div className="d-flex justify-content-between align-items-baseline">
                  <h3 className="item-title">{exp.position}</h3>
                  <span className="item-date">
                    {formatDate(exp.startDate)} –{" "}
                    {exp.endDate ? formatDate(exp.endDate) : "Halen"}
                  </span>
                </div>
                <div className="item-subtitle">{exp.company}</div>
                {renderDescription(exp.description)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= EĞİTİM ================= */}
      {educations.length > 0 && (
        <section className="section-block">
          <h2 className="section-title">EĞİTİM</h2>
          <div className="d-flex flex-column gap-2">
            {educations.map((edu) => (
              <div key={edu.id} className="break-avoid">
                <div className="d-flex justify-content-between align-items-baseline">
                  <h3 className="item-title">{edu.school}</h3>
                  <span className="item-date">
                    {formatDate(edu.startDate)} –{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Devam"}
                  </span>
                </div>
                <div className="text-secondary small fst-italic">
                  {edu.degree}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= TEKNİK BECERİLER ================= */}
      {(skillsState.languages?.length > 0 ||
        skillsState.programmingLanguages?.length > 0 ||
        skillsState.developmentAreas?.length > 0) && (
        <section className="section-block break-avoid">
          <h2 className="section-title">YETKİNLİKLER</h2>
          <table className="w-100 skills-table">
            <tbody>
              {skillsState.programmingLanguages?.length > 0 && (
                <tr>
                  <td className="skill-label">Programlama:</td>
                  <td>
                    {skillsState.programmingLanguages.map((s) => (
                      <span key={s.id} className="skill-badge">
                        {s.name}
                      </span>
                    ))}
                  </td>
                </tr>
              )}
              {skillsState.developmentAreas?.length > 0 && (
                <tr>
                  <td className="skill-label">Geliştirme:</td>
                  <td>
                    {skillsState.developmentAreas.map((s) => (
                      <span key={s.id} className="skill-badge">
                        {s.name}
                      </span>
                    ))}
                  </td>
                </tr>
              )}
              {skillsState.versionControl?.length > 0 && (
                <tr>
                  <td className="skill-label">Araçlar:</td>
                  <td>
                    {skillsState.versionControl.map((s) => (
                      <span key={s.id} className="skill-badge">
                        {s.name}
                      </span>
                    ))}
                  </td>
                </tr>
              )}
              {skillsState.languages?.length > 0 && (
                <tr>
                  <td className="skill-label">Diller:</td>
                  <td>
                    {skillsState.languages.map((s) => (
                      <span
                        key={s.id}
                        className="skill-badge bg-light text-dark border-0 fw-bold"
                      >
                        {s.name}
                      </span>
                    ))}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}

      {/* ================= PROJELER ================= */}
      {projects.length > 0 && (
        <section className="section-block">
          <h2 className="section-title">PROJELER</h2>
          <div className="d-flex flex-column gap-2">
            {projects.map((proj) => (
              <div key={proj.id} className="break-avoid mb-1">
                <div className="d-flex align-items-center mb-1">
                  <span className="fw-bold small text-dark me-2">
                    {proj.name}
                  </span>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="small text-primary text-decoration-none"
                    >
                      <i className="bi bi-link-45deg"></i> Link
                    </a>
                  )}
                  {proj.technologies && (
                    <span
                      className="ms-auto text-muted small"
                      style={{ fontSize: "0.75rem" }}
                    >
                      [{proj.technologies}]
                    </span>
                  )}
                </div>
                {renderDescription(proj.description)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= SOSYAL BECERİLER & SERTİFİKALAR (YAN YANA) ================= */}
      <div className="row g-3 break-avoid">
        {socialSkills.length > 0 && (
          <div className={certificates.length > 0 ? "col-6" : "col-12"}>
            <section className="section-block mb-0">
              <h2 className="section-title">SOSYAL BECERİLER</h2>
              <div className="d-flex flex-wrap gap-1">
                {socialSkills.map((skill) => (
                  <span key={skill.id} className="small text-secondary px-1">
                    • {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </div>
        )}

        {certificates.length > 0 && (
          <div className={socialSkills.length > 0 ? "col-6" : "col-12"}>
            <section className="section-block mb-0">
              <h2 className="section-title">SERTİFİKALAR</h2>
              <ul className="list-unstyled mb-0 small text-secondary">
                {certificates.map((cert) => (
                  <li key={cert.id} className="mb-1">
                    <strong className="text-dark">{cert.title}</strong> -{" "}
                    {cert.issuer}
                    {cert.date && (
                      <span className="ms-1 fst-italic">
                        ({new Date(cert.date).getFullYear()})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>

      {/* ================= CSS STYLES ================= */}
      <style>{`
        /* --- GLOBAL & SCREEN STYLES --- */
        .cv-container {
          width: 210mm;
          min-height: 297mm;
          padding: 10mm 12mm; /* Kenar boşlukları optimize edildi */
          margin: 0 auto;
          font-family: 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif;
          color: #212529;
          line-height: 1.4;
        }

        /* Renkler */
        .text-primary-dark { color: #1a3c5e; } 
        
        /* Başlıklar */
        .name-title { font-size: 2rem; letter-spacing: -0.5px; }
        .job-title { font-size: 1rem; color: #555; }
        
        .section-block { margin-bottom: 1rem; }
        .section-title {
          font-size: 1rem;
          font-weight: 800;
          color: #1a3c5e;
          border-bottom: 2px solid #1a3c5e;
          padding-bottom: 3px;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* İçerik Başlıkları */
        .item-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 0; color: #000; }
        .item-subtitle { font-size: 0.9rem; font-weight: 500; font-style: italic; color: #495057; margin-bottom: 2px; }
        .item-date { font-size: 0.8rem; font-weight: 600; color: #6c757d; }
        .description-text { font-size: 0.85rem; color: #333; line-height: 1.35; }

        /* İletişim Grid */
        .contact-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 16px;
          margin-top: 8px;
          font-size: 0.85rem;
          color: #495057;
        }
        .contact-item { display: flex; align-items: center; }
        .contact-item a { color: inherit; text-decoration: none; }

        /* Resim */
        .profile-image-container {
          width: 130px;
          height: 130px;
          border: 3px solid #f8f9fa;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .profile-image { width: 100%; height: 100%; object-fit: cover; }

        /* Yetkinlikler Tablosu */
        .skills-table td { padding-bottom: 4px; vertical-align: top; }
        .skill-label { width: 100px; font-weight: 700; font-size: 0.85rem; color: #495057; }
        .skill-badge {
          display: inline-block;
          font-size: 0.75rem;
          border: 1px solid #dee2e6;
          border-radius: 3px;
          padding: 1px 6px;
          margin: 0 4px 4px 0;
          color: #333;
          background-color: #fff;
        }

        /* --- PRINT SPECIFIC --- */
        @media print {
          @page { margin: 0; size: auto; }
          
          body { 
            background-color: white; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }

          .cv-container {
            width: 100% !important;
            max-width: 210mm !important;
            min-height: auto !important; /* Yükseklik sınırını kaldır */
            height: auto !important;
            margin: 0 !important;
            padding: 10mm 12mm !important; /* Baskıda da kenar boşluğu bırak */
            box-shadow: none !important;
            border: none !important;
          }

          /* Sayfa Bölünmelerini Yönet */
          .break-avoid { page-break-inside: avoid; break-inside: avoid; }
          
          /* Linklerin yanındaki URL'leri gizle */
          a[href]:after { content: none !important; }

          /* Baskıda ikonları biraz küçült */
          .bi { font-size: 0.8em; }
          
          /* Gereksiz scrollbarları gizle */
          * { overflow: visible !important; }
        }
      `}</style>
    </div>
  );
};

export default CvScreen;
