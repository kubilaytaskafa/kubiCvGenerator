import React from "react";
import { useSelector } from "react-redux";

const CvNatural = () => {
  // --- STORE VERİLERİ ---
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
    return <p className="cv-natural-description-text mb-2 mt-1">{text}</p>;
  };

  return (
    <article className="cv-natural-wrapper">
      <div className="cv-natural-container bg-white position-relative">
        {/* --- SOL SÜTUN (Sidebar) --- */}
        <aside
          className="cv-natural-sidebar"
          aria-label="Kişisel Bilgiler ve Beceriler"
        >
          {/* Profil Resmi & İsim */}
          <header className="text-center p-4 pb-3">
            {userInfo.image && (
              <figure className="cv-natural-image-wrapper mx-auto mb-3">
                <img
                  src={userInfo.image}
                  alt={`${userInfo.name} ${userInfo.lastName} profil fotoğrafı`}
                  className="cv-natural-profile-image"
                />
              </figure>
            )}
            <h1 className="cv-natural-name-title text-white mb-1">
              {userInfo.name}
              <br />
              {userInfo.lastName}
            </h1>
            <p className="cv-natural-job-title text-light opacity-75 mb-0">
              {userInfo.title}
            </p>
          </header>

          {/* İletişim */}
          <section className="px-4 pb-3">
            <div className="cv-natural-divider mb-3"></div>
            <h2 className="cv-natural-sidebar-header">İletişim</h2>
            <address
              className="cv-natural-contact-list"
              style={{ fontStyle: "normal" }}
            >
              {userInfo.email && (
                <div>
                  <i
                    className="bi bi-envelope-fill me-2"
                    aria-hidden="true"
                  ></i>
                  <a
                    href={`mailto:${userInfo.email}`}
                    className="text-light text-decoration-none"
                  >
                    {userInfo.email}
                  </a>
                </div>
              )}
              {userInfo.phoneNumber && (
                <div>
                  <i
                    className="bi bi-telephone-fill me-2"
                    aria-hidden="true"
                  ></i>
                  <a
                    href={`tel:${userInfo.phoneNumber}`}
                    className="text-light text-decoration-none"
                  >
                    {userInfo.phoneNumber}
                  </a>
                </div>
              )}
              {userInfo.address && (
                <div>
                  <i className="bi bi-geo-alt-fill me-2" aria-hidden="true"></i>
                  <span>{userInfo.address}</span>
                </div>
              )}
              {userInfo.linkedin && (
                <div>
                  <i className="bi bi-linkedin me-2" aria-hidden="true"></i>
                  <a
                    href={`https://linkedin.com/in/${userInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light text-decoration-none"
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
                    className="text-light text-decoration-none"
                  >
                    {userInfo.github}
                  </a>
                </div>
              )}
            </address>
          </section>

          {/* Eğitim (Sol Sütunda) */}
          {educations.length > 0 && (
            <section className="px-4 pb-3">
              <h2 className="cv-natural-sidebar-header">Eğitim</h2>
              <ul className="list-unstyled">
                {educations.map((edu) => (
                  <li key={edu.id} className="mb-3 text-light">
                    <strong className="d-block">{edu.school}</strong>
                    <span className="d-block small opacity-75">
                      {edu.degree}
                    </span>
                    <time className="d-block small opacity-50 fst-italic">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Devam"}
                    </time>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Teknik Yetenekler - Detaylı Kategoriler */}
          <section className="px-4 pb-3">
            <h2 className="cv-natural-sidebar-header">Teknik Yetkinlikler</h2>

            {/* Programlama Dilleri */}
            {skillsState.programmingLanguages?.length > 0 && (
              <div className="mb-3">
                <h3 className="cv-natural-skill-category">Programlama</h3>
                <div className="d-flex flex-wrap gap-2" role="list">
                  {skillsState.programmingLanguages.map((s) => (
                    <span
                      key={s.id}
                      className="cv-natural-tag cv-natural-tag-programming"
                      role="listitem"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Geliştirme Alanları */}
            {skillsState.developmentAreas?.length > 0 && (
              <div className="mb-3">
                <h3 className="cv-natural-skill-category">
                  Geliştirme Alanları
                </h3>
                <div className="d-flex flex-wrap gap-2" role="list">
                  {skillsState.developmentAreas.map((s) => (
                    <span
                      key={s.id}
                      className="cv-natural-tag cv-natural-tag-development"
                      role="listitem"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Versiyon Kontrol */}
            {skillsState.versionControl?.length > 0 && (
              <div className="mb-3">
                <h3 className="cv-natural-skill-category">Versiyon Kontrol</h3>
                <div className="d-flex flex-wrap gap-2" role="list">
                  {skillsState.versionControl.map((s) => (
                    <span
                      key={s.id}
                      className="cv-natural-tag cv-natural-tag-version"
                      role="listitem"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Yabancı Diller */}
          {skillsState.languages?.length > 0 && (
            <section className="px-4 pb-3">
              <h2 className="cv-natural-sidebar-header">Diller</h2>
              <ul className="list-unstyled text-light small opacity-90">
                {skillsState.languages.map((l) => (
                  <li
                    key={l.id}
                    className="mb-2 d-flex justify-content-between align-items-center"
                  >
                    <span>{l.name}</span>
                    <span className="badge bg-light bg-opacity-25 text-white fw-normal">
                      Yetkin
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Sosyal Beceriler */}
          {socialSkills.length > 0 && (
            <section className="px-4 pb-3">
              <h2 className="cv-natural-sidebar-header">Kişisel Beceriler</h2>
              <ul className="list-unstyled text-light small opacity-90">
                {socialSkills.map((s) => (
                  <li key={s.id} className="mb-2">
                    <i
                      className="bi bi-check-circle-fill me-2 cv-natural-success-light"
                      aria-hidden="true"
                    ></i>
                    {s.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* --- SAĞ SÜTUN (Ana İçerik) --- */}
        <main className="cv-natural-content">
          {/* Hakkımda */}
          {userInfo.about && (
            <section
              className="mb-5 cv-natural-break-avoid"
              aria-labelledby="about-heading"
            >
              <h2 id="about-heading" className="cv-natural-section-title">
                <span className="cv-natural-icon-box">
                  <i className="bi bi-person" aria-hidden="true"></i>
                </span>
                Hakkımda
              </h2>
              <blockquote className="cv-natural-about-quote">
                <p className="mb-0">{userInfo.about}</p>
              </blockquote>
            </section>
          )}

          {/* İş Deneyimi */}
          {experiences.length > 0 && (
            <section className="mb-5" aria-labelledby="experience-heading">
              <h2 id="experience-heading" className="cv-natural-section-title">
                <span className="cv-natural-icon-box">
                  <i className="bi bi-briefcase" aria-hidden="true"></i>
                </span>
                Deneyim
              </h2>
              <div className="cv-natural-timeline">
                {experiences.map((exp) => (
                  <article
                    key={exp.id}
                    className="cv-natural-timeline-item cv-natural-break-avoid"
                  >
                    <div className="cv-natural-timeline-marker"></div>
                    <header className="d-flex justify-content-between align-items-baseline flex-wrap gap-2 mb-1">
                      <h3 className="cv-natural-item-title mb-0">
                        {exp.position}
                      </h3>
                      <time className="cv-natural-date-badge">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Halen"}
                      </time>
                    </header>
                    <p className="cv-natural-company-name mb-2">
                      {exp.company}
                    </p>
                    {renderDescription(exp.description)}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Projeler */}
          {projects.length > 0 && (
            <section className="mb-5" aria-labelledby="projects-heading">
              <h2 id="projects-heading" className="cv-natural-section-title">
                <span className="cv-natural-icon-box">
                  <i className="bi bi-code-square" aria-hidden="true"></i>
                </span>
                Projeler
              </h2>
              <div className="row row-cols-1 g-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="col">
                    <article className="cv-natural-project-card cv-natural-break-avoid">
                      <header className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="h6 fw-bold mb-0 text-dark">
                          {proj.name}
                        </h3>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cv-natural-project-link"
                            aria-label={`${proj.name} projesini görüntüle`}
                          >
                            <i className="bi bi-box-arrow-up-right"></i>
                          </a>
                        )}
                      </header>
                      {proj.technologies && (
                        <div className="cv-natural-tech-stack mb-2">
                          <i
                            className="bi bi-stack me-1"
                            aria-hidden="true"
                          ></i>
                          <code className="small">{proj.technologies}</code>
                        </div>
                      )}
                      {renderDescription(proj.description)}
                    </article>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sertifikalar */}
          {certificates.length > 0 && (
            <section
              className="cv-natural-break-avoid"
              aria-labelledby="certificates-heading"
            >
              <h2
                id="certificates-heading"
                className="cv-natural-section-title"
              >
                <span className="cv-natural-icon-box">
                  <i className="bi bi-award" aria-hidden="true"></i>
                </span>
                Sertifikalar
              </h2>
              <ul className="row row-cols-1 row-cols-md-2 g-3 list-unstyled">
                {certificates.map((cert) => (
                  <li key={cert.id} className="col">
                    <div className="cv-natural-cert-box">
                      <strong className="d-block text-dark">
                        {cert.title}
                      </strong>
                      <span className="d-block small text-muted">
                        {cert.issuer}
                      </span>
                      {cert.date && (
                        <time className="d-block small cv-natural-text-muted mt-1">
                          {new Date(cert.date).getFullYear()}
                        </time>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </article>
  );
};

export default CvNatural;
