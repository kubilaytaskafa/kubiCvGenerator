import React from "react";
import { useSelector } from "react-redux";

const CvProfessional = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const { experiences } = useSelector((state) => state.experiences);
  const { educations } = useSelector((state) => state.educations);
  const skillsState = useSelector((state) => state.skills);
  const { socialSkills } = useSelector((state) => state.socialSkills); // Kullanılacak
  const { projects } = useSelector((state) => state.projects);
  const { certificates } = useSelector((state) => state.certificates); // Kullanılacak

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
    <div className="cv-container bg-white">
      <div className="row h-100 g-0">
        {/* --- SOL SÜTUN (SIDEBAR) --- */}
        <div className="col-4 sidebar-bg text-white p-4">
          {/* Fotoğraf */}
          {userInfo.image && (
            <div className="mb-4 text-center">
              <img
                src={userInfo.image}
                alt="Profile"
                className="profile-image rounded-circle"
              />
            </div>
          )}

          {/* İletişim */}
          <div className="mb-4">
            <h5 className="sidebar-title">İLETİŞİM</h5>
            <div className="d-flex flex-column gap-2 small">
              {userInfo.email && (
                <div>
                  <i className="bi bi-envelope me-2"></i>
                  {userInfo.email}
                </div>
              )}
              {userInfo.phoneNumber && (
                <div>
                  <i className="bi bi-phone me-2"></i>
                  {userInfo.phoneNumber}
                </div>
              )}
              {userInfo.address && (
                <div>
                  <i className="bi bi-geo-alt me-2"></i>
                  {userInfo.address}
                </div>
              )}
              {userInfo.linkedin && (
                <div>
                  <i className="bi bi-linkedin me-2"></i>
                  {userInfo.linkedin}
                </div>
              )}
              {userInfo.github && (
                <div>
                  <i className="bi bi-github me-2"></i>
                  {userInfo.github}
                </div>
              )}
            </div>
          </div>

          {/* Eğitim (Sidebar'da) */}
          {educations.length > 0 && (
            <div className="mb-4">
              <h5 className="sidebar-title">EĞİTİM</h5>
              {educations.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="fw-bold small">{edu.school}</div>
                  <div className="small fst-italic text-white-50">
                    {edu.degree}
                  </div>
                  <div className="tiny-date">
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Devam"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Teknik Yetenekler */}
          {(skillsState.programmingLanguages?.length > 0 ||
            skillsState.languages?.length > 0) && (
            <div className="mb-4">
              <h5 className="sidebar-title">TEKNİK YETKİNLİKLER</h5>
              <div className="d-flex flex-wrap gap-2">
                {skillsState.programmingLanguages?.map((s) => (
                  <span
                    key={s.id}
                    className="badge bg-light text-dark fw-normal"
                  >
                    {s.name}
                  </span>
                ))}
                {skillsState.languages?.map((s) => (
                  <span key={s.id} className="badge bg-secondary fw-normal">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* --- EKLENEN KISIM: SOSYAL BECERİLER (SIDEBAR) --- */}
          {socialSkills.length > 0 && (
            <div className="mb-4">
              <h5 className="sidebar-title">SOSYAL BECERİLER</h5>
              <ul className="list-unstyled small mb-0 ps-1">
                {socialSkills.map((skill) => (
                  <li key={skill.id} className="mb-1 text-white-50">
                    <i className="bi bi-check2-circle me-2 text-white"></i>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* --- SAĞ SÜTUN (ANA İÇERİK) --- */}
        <div className="col-8 p-4">
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
            <section className="mb-4">
              <h4 className="section-title">HAKKIMDA</h4>
              <p className="text-dark small">{userInfo.about}</p>
            </section>
          )}

          {/* Deneyim */}
          {experiences.length > 0 && (
            <section className="mb-4">
              <h4 className="section-title">İŞ DENEYİMİ</h4>
              {experiences.map((exp) => (
                <div key={exp.id} className="mb-3 break-avoid">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold mb-0 text-dark">{exp.position}</h5>
                    <span className="small fw-bold text-secondary">
                      {formatDate(exp.startDate)} –{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Halen"}
                    </span>
                  </div>
                  <div className="fst-italic text-secondary mb-1">
                    {exp.company}
                  </div>
                  {renderDescription(exp.description)}
                </div>
              ))}
            </section>
          )}

          {/* Projeler */}
          {projects.length > 0 && (
            <section className="mb-4">
              <h4 className="section-title">PROJELER</h4>
              {projects.map((proj) => (
                <div key={proj.id} className="mb-2 break-avoid">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <div className="fw-bold text-dark">{proj.name}</div>
                    {proj.link && (
                      <a
                        href={proj.link}
                        className="small text-secondary text-decoration-none"
                      >
                        <i className="bi bi-link"></i> Link
                      </a>
                    )}
                  </div>

                  <div className="small text-secondary mb-1">
                    Stack: {proj.technologies}
                  </div>
                  {renderDescription(proj.description)}
                </div>
              ))}
            </section>
          )}

          {/* --- EKLENEN KISIM: SERTİFİKALAR (ANA İÇERİK) --- */}
          {certificates.length > 0 && (
            <section className="mb-4 break-avoid">
              <h4 className="section-title">SERTİFİKALAR</h4>
              <div className="row row-cols-1 row-cols-md-2 g-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="col">
                    <div className="border-start border-3 border-dark ps-2">
                      <div className="fw-bold text-dark small">
                        {cert.title}
                      </div>
                      <div className="small text-secondary">
                        {cert.issuer}
                        {cert.date && (
                          <span className="fst-italic ms-1">
                            ({new Date(cert.date).getFullYear()})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <style>{`
        .cv-container { width: 210mm; min-height: 297mm; margin: 0 auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden; }
        .sidebar-bg { background-color: #2c3e50; min-height: 100%; }
        .profile-image { width: 150px; height: 150px; object-fit: cover; border: 4px solid #fff; }
        .sidebar-title { font-size: 1.1rem; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px; margin-bottom: 15px; letter-spacing: 1px; color: #ecf0f1; }
        .section-title { font-size: 1.2rem; font-weight: 700; color: #2c3e50; border-bottom: 2px solid #2c3e50; padding-bottom: 5px; margin-bottom: 15px; letter-spacing: 0.5px; }
        .tiny-date { font-size: 0.75rem; opacity: 0.7; }
        .description-text { font-size: 0.9rem; line-height: 1.5; color: #333; }
        .break-avoid { page-break-inside: avoid; }
        @media print {
          .cv-container { width: 100%; height: auto; box-shadow: none; margin: 0; }
          .sidebar-bg { background-color: #2c3e50 !important; -webkit-print-color-adjust: exact; }
          .badge { border: 1px solid #000; color: #000 !important; }
        }
      `}</style>
    </div>
  );
};
export default CvProfessional;
