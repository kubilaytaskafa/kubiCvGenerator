import React from "react";
import { useSelector } from "react-redux";

const CvProfessional = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const { experiences } = useSelector((state) => state.experiences);
  const { educations } = useSelector((state) => state.educations);
  const skillsState = useSelector((state) => state.skills);
  const { socialSkills } = useSelector((state) => state.socialSkills);
  const { projects } = useSelector((state) => state.projects);
  const { certificates } = useSelector((state) => state.certificates);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  const renderDescription = (text) => {
    if (!text) return null;
    return (
      <ul className="mb-0 ps-3 mt-1 description-text">
        {text.split("\n").map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    );
  };

  return (
    <article className="cv-container bg-white position-relative">
      {/* Sidebar Background - Separate Layer */}
      <div className="sidebar-bg-layer" aria-hidden="true"></div>

      <div className="row g-0 position-relative">
        {/* --- SOL SÜTUN (SIDEBAR) --- */}
        <aside
          className="col-4 text-white p-4"
          style={{ zIndex: 2 }}
          aria-label="İletişim ve Yan Bilgiler"
        >
          {/* Fotoğraf */}
          {userInfo.image && (
            <figure className="mb-4 text-center">
              <img
                src={userInfo.image}
                alt={`${userInfo.name} ${userInfo.lastName} profil fotoğrafı`}
                className="profile-image rounded-circle"
              />
            </figure>
          )}

          {/* İletişim */}
          <section className="mb-4">
            <h2 className="sidebar-title">İLETİŞİM</h2>
            <address
              className="d-flex flex-column gap-2 small"
              style={{ fontStyle: "normal" }}
            >
              {userInfo.email && (
                <div>
                  <i className="bi bi-envelope me-2" aria-hidden="true"></i>
                  <a
                    href={`mailto:${userInfo.email}`}
                    className="text-white text-decoration-none"
                  >
                    {userInfo.email}
                  </a>
                </div>
              )}
              {userInfo.phoneNumber && (
                <div>
                  <i className="bi bi-phone me-2" aria-hidden="true"></i>
                  <a
                    href={`tel:${userInfo.phoneNumber}`}
                    className="text-white text-decoration-none"
                  >
                    {userInfo.phoneNumber}
                  </a>
                </div>
              )}
              {userInfo.address && (
                <div>
                  <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
                  {userInfo.address}
                </div>
              )}
              {userInfo.linkedin && (
                <div>
                  <i className="bi bi-linkedin me-2" aria-hidden="true"></i>
                  <a
                    href={`https://linkedin.com/in/${userInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    {userInfo.linkedin}
                  </a>
                </div>
              )}
              {userInfo.github && (
                <div>
                  <i className="bi bi-github me-2" aria-hidden="true"></i>
                  <a
                    href={`https://github.com/${userInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    {userInfo.github}
                  </a>
                </div>
              )}
            </address>
          </section>

          {/* Eğitim (Sidebar'da) */}
          {educations.length > 0 && (
            <section className="mb-4">
              <h2 className="sidebar-title">EĞİTİM</h2>
              <ul className="list-unstyled">
                {educations.map((edu) => (
                  <li key={edu.id} className="mb-3">
                    <strong className="fw-bold small d-block">
                      {edu.school}
                    </strong>
                    <span className="small fst-italic text-white-50 d-block">
                      {edu.degree}
                    </span>
                    <time className="tiny-date d-block">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Devam"}
                    </time>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Teknik Yetenekler */}
          {(skillsState.programmingLanguages?.length > 0 ||
            skillsState.languages?.length > 0) && (
            <section className="mb-4">
              <h2 className="sidebar-title">TEKNİK YETKİNLİKLER</h2>
              <div className="d-flex flex-wrap gap-2" role="list">
                {skillsState.programmingLanguages?.map((s) => (
                  <span
                    key={s.id}
                    className="badge bg-light text-dark fw-normal"
                    role="listitem"
                  >
                    {s.name}
                  </span>
                ))}
                {skillsState.languages?.map((s) => (
                  <span
                    key={s.id}
                    className="badge bg-secondary fw-normal"
                    role="listitem"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Sosyal Beceriler */}
          {socialSkills.length > 0 && (
            <section className="mb-4">
              <h2 className="sidebar-title">SOSYAL BECERİLER</h2>
              <ul className="list-unstyled small mb-0 ps-1">
                {socialSkills.map((skill) => (
                  <li key={skill.id} className="mb-1 text-white-50">
                    <i
                      className="bi bi-check2-circle me-2 text-white"
                      aria-hidden="true"
                    ></i>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* --- SAĞ SÜTUN (ANA İÇERİK) --- */}
        <main className="col-8 p-4">
          {/* Header */}
          <header className="border-bottom border-2 border-dark pb-3 mb-4">
            <h1 className="fw-bold text-uppercase display-6 mb-0 text-dark">
              {userInfo.name} {userInfo.lastName}
            </h1>
            <p className="lead text-secondary mb-0 fw-normal">
              {userInfo.title}
            </p>
          </header>

          {/* Hakkımda */}
          {userInfo.about && (
            <section className="mb-4" aria-labelledby="about-heading">
              <h2 id="about-heading" className="section-title">
                HAKKIMDA
              </h2>
              <p className="text-dark small">{userInfo.about}</p>
            </section>
          )}

          {/* Deneyim */}
          {experiences.length > 0 && (
            <section className="mb-4" aria-labelledby="experience-heading">
              <h2 id="experience-heading" className="section-title">
                İŞ DENEYİMİ
              </h2>
              {experiences.map((exp) => (
                <article key={exp.id} className="mb-3 break-avoid">
                  <header className="d-flex justify-content-between">
                    <h3 className="h5 fw-bold mb-0 text-dark">
                      {exp.position}
                    </h3>
                    <time className="small fw-bold text-secondary">
                      {formatDate(exp.startDate)} –{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Halen"}
                    </time>
                  </header>
                  <p className="fst-italic text-secondary mb-1">
                    {exp.company}
                  </p>
                  {renderDescription(exp.description)}
                </article>
              ))}
            </section>
          )}

          {/* Projeler */}
          {projects.length > 0 && (
            <section className="mb-4" aria-labelledby="projects-heading">
              <h2 id="projects-heading" className="section-title">
                PROJELER
              </h2>
              {projects.map((proj) => (
                <article key={proj.id} className="mb-2 break-avoid">
                  <header className="d-flex justify-content-between align-items-baseline">
                    <h3 className="h6 fw-bold text-dark mb-0">{proj.name}</h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        className="small text-secondary text-decoration-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-link" aria-hidden="true"></i> Link
                      </a>
                    )}
                  </header>

                  {proj.technologies && (
                    <p className="small text-secondary mb-1">
                      <strong>Stack:</strong> {proj.technologies}
                    </p>
                  )}
                  {renderDescription(proj.description)}
                </article>
              ))}
            </section>
          )}

          {/* Sertifikalar */}
          {certificates.length > 0 && (
            <section
              className="mb-4 break-avoid"
              aria-labelledby="certificates-heading"
            >
              <h2 id="certificates-heading" className="section-title">
                SERTİFİKALAR
              </h2>
              <ul className="row row-cols-1 row-cols-md-2 g-2 list-unstyled">
                {certificates.map((cert) => (
                  <li key={cert.id} className="col">
                    <div className="border-start border-3 border-dark ps-2">
                      <strong className="fw-bold text-dark small d-block">
                        {cert.title}
                      </strong>
                      <span className="small text-secondary">
                        {cert.issuer}
                        {cert.date && (
                          <time className="fst-italic ms-1">
                            ({new Date(cert.date).getFullYear()})
                          </time>
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>

      <style>{`
        .cv-container { 
          width: 210mm; 
          min-height: 297mm; 
          margin: 0 auto; 
          box-shadow: 0 0 10px rgba(0,0,0,0.1); 
          overflow: hidden; 
          position: relative; 
        }
        .sidebar-bg-layer { 
          background-color: #2c3e50; 
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 33.333333%;
          z-index: 1;
        }
        .col-4 { position: relative; z-index: 1; }
        .profile-image { width: 150px; height: 150px; object-fit: cover; border: 4px solid #fff; }
        .sidebar-title { font-size: 1.1rem; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px; margin-bottom: 15px; letter-spacing: 1px; color: #ecf0f1; }
        .section-title { font-size: 1.2rem; font-weight: 700; color: #2c3e50; border-bottom: 2px solid #2c3e50; padding-bottom: 5px; margin-bottom: 15px; letter-spacing: 0.5px; }
        .tiny-date { font-size: 0.75rem; opacity: 0.7; }
        .description-text { font-size: 0.9rem; line-height: 1.5; color: #333; }
        .break-avoid { page-break-inside: avoid; }
        
        /* Link styling for sidebar */
        aside a { color: inherit; }
        aside a:hover { text-decoration: underline !important; }
        
        @media print {
          .cv-container { width: 100%; height: auto; box-shadow: none; margin: 0; }
          .sidebar-bg-layer { background-color: #2c3e50 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .badge { border: 1px solid #000; color: #000 !important; }
          aside a { text-decoration: none !important; }
        }
      `}</style>
    </article>
  );
};

export default CvProfessional;
