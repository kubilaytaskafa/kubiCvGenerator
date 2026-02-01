import React from "react";
import { useSelector } from "react-redux";

const CvElegant = () => {
  // --- VERİ ÇEKME ---
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

  const renderDescription = (text) => {
    if (!text) return null;
    return (
      <div className="description-text mt-2">
        {text.split("\n").map((line, index) => (
          <p key={index} className="mb-1 text-muted small">
            {line.trim().startsWith("-") || line.trim().startsWith("*")
              ? line
              : `• ${line}`}
          </p>
        ))}
      </div>
    );
  };

  return (
    <article className="cv-elegant-wrapper font-serif">
      <div className="container-fluid cv-container bg-white h-100 position-relative">
        {/* ================= HEADER ================= */}
        <header className="text-center mb-5 pb-4 border-bottom  position-relative">
          {/* Dekoratif Çizgiler */}
          <div className="elegant-line-top"></div>

          {userInfo.image && (
            <figure className="mb-4 d-inline-block position-relative">
              <img
                src={userInfo.image}
                alt={`${userInfo.name} ${userInfo.lastName} Profil`}
                className="profile-image shadow-sm border border-3 border-white rounded-circle"
              />
            </figure>
          )}

          <h1 className="display-4 fw-bold text-uppercase mb-2 text-dark tracking-wide font-headings">
            {userInfo.name}{" "}
            <span className="fw-lighter">{userInfo.lastName}</span>
          </h1>

          <p className="h5 text-uppercase text-secondary letter-spacing-4 mb-4 fw-light">
            {userInfo.title}
          </p>

          {/* İletişim Bilgileri */}
          <address className="d-flex justify-content-center flex-wrap gap-4 small text-secondary font-sans border-top border-light pt-3 mt-3 d-print-flex fst-normal">
            {[
              userInfo.email && {
                icon: "bi-envelope",
                val: userInfo.email,
                href: `mailto:${userInfo.email}`,
              },
              userInfo.phoneNumber && {
                icon: "bi-telephone",
                val: userInfo.phoneNumber,
                href: `tel:${userInfo.phoneNumber}`,
              },
              userInfo.address && { icon: "bi-geo-alt", val: userInfo.address },
              userInfo.linkedin && {
                icon: "bi-linkedin",
                val: userInfo.linkedin,
                href: `https://linkedin.com/in/${userInfo.linkedin}`,
              },
              userInfo.github && {
                icon: "bi-github",
                val: userInfo.github,
                href: `https://github.com/${userInfo.github}`,
              },
            ]
              .filter(Boolean)
              .map((item, idx) => (
                <div key={idx} className="d-flex align-items-center gap-1">
                  <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-decoration-none text-secondary custom-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.val}
                    </a>
                  ) : (
                    <span>{item.val}</span>
                  )}
                </div>
              ))}
          </address>
        </header>

        {/* ================= MAIN CONTENT ================= */}
        <main className="row g-5">
          {/* SOL KOLON (Ana İçerik - %65) */}
          <div className="col-12 col-md-8 border-end-md border-light pe-md-4">
            {/* HAKKIMDA */}
            {userInfo.about && (
              <section
                className="mb-5 break-inside-avoid"
                aria-labelledby="about-heading"
              >
                <div className="p-4 bg-light bg-opacity-50 rounded-1 fst-italic text-secondary shadow-sm">
                  <p className="mb-0 text-center lead font-serif">
                    "{userInfo.about}"
                  </p>
                </div>
              </section>
            )}

            {/* DENEYİM */}
            {experiences.length > 0 && (
              <section className="mb-5" aria-labelledby="experience-heading">
                <div className="d-flex align-items-center mb-4">
                  <h2
                    id="experience-heading"
                    className="h5 fw-bold text-uppercase tracking-wider mb-0 border-bottom border-2 border-dark pb-1 pe-3"
                  >
                    Profesyonel Deneyim
                  </h2>
                  <div className="flex-grow-1 border-bottom border-light"></div>
                </div>

                <div className="d-flex flex-column gap-4">
                  {experiences.map((exp) => (
                    <article
                      key={exp.id}
                      className="break-inside-avoid position-relative ps-3 border-start border-3 border-light ms-1"
                    >
                      <div className="d-flex justify-content-between align-items-baseline mb-1">
                        <h3 className="h5 fw-bold mb-0 text-dark font-headings">
                          {exp.position}
                        </h3>
                        <time className="small text-muted fst-italic font-sans text-nowrap">
                          {formatDate(exp.startDate)} –{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "Halen"}
                        </time>
                      </div>
                      <div className="h6 text-secondary mb-2 font-serif fw-semibold">
                        {exp.company}
                      </div>
                      {renderDescription(exp.description)}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* PROJELER */}
            {projects.length > 0 && (
              <section className="mb-5" aria-labelledby="projects-heading">
                <div className="d-flex align-items-center mb-4">
                  <h2
                    id="projects-heading"
                    className="h5 fw-bold text-uppercase tracking-wider mb-0 border-bottom border-2 border-dark pb-1 pe-3"
                  >
                    Önemli Projeler
                  </h2>
                  <div className="flex-grow-1 border-bottom border-light"></div>
                </div>

                {projects.map((proj) => (
                  <article
                    key={proj.id}
                    className="mb-4 break-inside-avoid ps-3 border-start border-3 border-light ms-1"
                  >
                    <div className="d-flex justify-content-between align-items-baseline">
                      <h3 className="h6 fw-bold mb-1 font-headings">
                        {proj.name}
                      </h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="small text-decoration-none text-primary font-sans fst-italic"
                        >
                          Projeyi Gör{" "}
                          <i className="bi bi-box-arrow-up-right ms-1"></i>
                        </a>
                      )}
                    </div>
                    {proj.technologies && (
                      <div className="small text-muted fst-italic mb-2 font-sans">
                        <i className="bi bi-code-slash me-1"></i>{" "}
                        {proj.technologies}
                      </div>
                    )}
                    {renderDescription(proj.description)}
                  </article>
                ))}
              </section>
            )}
          </div>

          {/* SAĞ KOLON (Yan Bilgiler - %35) */}
          <aside className="col-12 col-md-4 ps-md-4">
            {/* EĞİTİM */}
            {educations.length > 0 && (
              <section
                className="mb-5 break-inside-avoid"
                aria-labelledby="education-heading"
              >
                <h2
                  id="education-heading"
                  className="h6 fw-bold text-uppercase border-bottom border-dark pb-2 mb-3 tracking-wide"
                >
                  Eğitim
                </h2>
                <ul className="list-unstyled">
                  {educations.map((edu) => (
                    <li key={edu.id} className="mb-4">
                      <strong className="d-block text-dark font-headings">
                        {edu.school}
                      </strong>
                      <span className="d-block small text-secondary fst-italic">
                        {edu.degree}
                      </span>
                      <time className="d-block small text-muted font-sans mt-1">
                        {formatDate(edu.startDate)} -{" "}
                        {edu.endDate ? formatDate(edu.endDate) : "Devam"}
                      </time>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* TEKNİK YETKİNLİKLER */}
            <section
              className="mb-5 break-inside-avoid"
              aria-labelledby="skills-heading"
            >
              <h2
                id="skills-heading"
                className="h6 fw-bold text-uppercase border-bottom border-dark pb-2 mb-3 tracking-wide"
              >
                Yetenekler
              </h2>

              {skillsState.programmingLanguages?.length > 0 && (
                <div className="mb-3">
                  <strong className="d-block small text-secondary font-sans text-uppercase mb-2 opacity-75">
                    Programlama
                  </strong>
                  <div className="d-flex flex-wrap gap-2">
                    {skillsState.programmingLanguages.map((s) => (
                      <span
                        key={s.id}
                        className="badge bg-white text-dark border border-secondary fw-normal shadow-sm"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skillsState.developmentAreas?.length > 0 && (
                <div className="mb-3">
                  <strong className="d-block small text-secondary font-sans text-uppercase mb-2 opacity-75">
                    Alanlar
                  </strong>
                  <div className="d-flex flex-wrap gap-2">
                    {skillsState.developmentAreas.map((s) => (
                      <span
                        key={s.id}
                        className="badge bg-light text-secondary border fw-normal"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* YABANCI DİLLER */}
            {skillsState.languages?.length > 0 && (
              <section
                className="mb-5 break-inside-avoid"
                aria-labelledby="languages-heading"
              >
                <h2
                  id="languages-heading"
                  className="h6 fw-bold text-uppercase border-bottom border-dark pb-2 mb-3 tracking-wide"
                >
                  Diller
                </h2>
                <ul className="list-group list-group-flush small">
                  {skillsState.languages.map((l) => (
                    <li
                      key={l.id}
                      className="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0 py-2 border-light"
                    >
                      <span className="fw-semibold">{l.name}</span>
                      <span className="text-muted font-sans fst-italic">
                        Yetkin
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* SERTİFİKALAR */}
            {certificates.length > 0 && (
              <section
                className="mb-5 break-inside-avoid"
                aria-labelledby="certificates-heading"
              >
                <h2
                  id="certificates-heading"
                  className="h6 fw-bold text-uppercase border-bottom border-dark pb-2 mb-3 tracking-wide"
                >
                  Sertifikalar
                </h2>
                <ul className="list-unstyled small">
                  {certificates.map((c) => (
                    <li key={c.id} className="mb-3">
                      <strong className="d-block text-dark font-headings">
                        {c.title}
                      </strong>
                      <span className="text-muted fst-italic d-block">
                        {c.issuer}
                      </span>
                      {c.date && (
                        <time className="text-muted small font-sans">
                          ({new Date(c.date).getFullYear()})
                        </time>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* SOSYAL BECERİLER */}
            {socialSkills.length > 0 && (
              <section
                className="mb-5 break-inside-avoid"
                aria-labelledby="social-heading"
              >
                <h2
                  id="social-heading"
                  className="h6 fw-bold text-uppercase border-bottom border-dark pb-2 mb-3 tracking-wide"
                >
                  Sosyal
                </h2>
                <div className="d-flex flex-wrap gap-2">
                  {socialSkills.map((s) => (
                    <span
                      key={s.id}
                      className="small text-secondary bg-light px-2 py-1 rounded-1"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </main>
      </div>

      <style>{`
        /* --- FONTS & TYPOGRAPHY --- */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');

        .cv-elegant-wrapper {
            background-color: white;
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .cv-container {
             color: #2c2c2c;
             font-family: 'Lato', 'Helvetica Neue', Arial, sans-serif;
             padding: 12mm 15mm;
        }

        /* Headings */
        .font-headings, h1, h2, h3, h4, .display-4, .h5, .h6 {
            font-family: 'Playfair Display', 'Georgia', serif;
        }
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        
        /* Text Utilities */
        .tracking-wide { letter-spacing: 0.05em; }
        .tracking-wider { letter-spacing: 0.15em; }
        .letter-spacing-4 { letter-spacing: 4px; }
        
        /* Custom Styling */
        .profile-image {
            width: 130px; 
            height: 130px; 
            object-fit: cover;
        }
        
        .custom-link {
            transition: color 0.2s;
        }
        .custom-link:hover {
            color: #000 !important;
            text-decoration: underline !important;
        }

        /* Responsive Border */
        @media (min-width: 768px) {
            .border-end-md {
                border-right: 1px solid #dee2e6 !important;
            }
        }

        /* PRINT SETTINGS */
        @media print {
            .cv-elegant-wrapper { 
               width: 100%; 
               margin: 0; 
               box-shadow: none; 
               min-height: auto;
            }
            .cv-container {
               padding: 10mm 12mm !important;
            }
            
            body, .cv-container {
                background-color: white !important;
                -webkit-print-color-adjust: exact;
            }

            .break-inside-avoid { 
               page-break-inside: avoid; 
               break-inside: avoid;
            }
            
            /* Remove screen-only styles */
            .shadow-sm { box-shadow: none !important; }
            .bg-light { background-color: #f8f9fa !important; }
            
            /* Typography optimizations for print */
            a { text-decoration: none; color: #000; }
            
            /* Ensure columns print side-by-side */
            .row { display: flex; flex-wrap: nowrap; }
            .col-md-8 { width: 66.666667%; }
            .col-md-4 { width: 33.333333%; }
        }

        /* RESPONSIVE PREVIEW */
        @media (max-width: 991px) {
           .cv-elegant-wrapper { width: 100%; }
        }

      `}</style>
    </article>
  );
};

export default CvElegant;
