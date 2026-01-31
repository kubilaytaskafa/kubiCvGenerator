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
    return <p className="description-text mb-2 mt-1">{text}</p>;
  };

  return (
    <div className="cv-container bg-white">
      {/* --- SOL SÜTUN (Koyu/Doğal Arka Plan) --- */}
      <div className="left-column">
        {/* Profil Resmi & İsim */}
        <div className="text-center p-4 pb-0">
          {userInfo.image && (
            <div className="image-wrapper mx-auto mb-3">
              <img
                src={userInfo.image}
                alt="Profile"
                className="profile-image"
              />
            </div>
          )}
          <h1 className="name-title text-white mb-1">
            {userInfo.name}
            <br />
            {userInfo.lastName}
          </h1>
          <p className="job-title text-light opacity-75 mb-0">
            {userInfo.title}
          </p>
        </div>

        {/* İletişim */}
        <div className="p-4">
          <div className="divider-light mb-3"></div>
          <h5 className="sidebar-header">İletişim</h5>
          <ul className="list-unstyled text-light small opacity-90 contact-list">
            {userInfo.email && (
              <li>
                <i className="bi bi-envelope-fill me-2"></i>
                {userInfo.email}
              </li>
            )}
            {userInfo.phoneNumber && (
              <li>
                <i className="bi bi-telephone-fill me-2"></i>
                {userInfo.phoneNumber}
              </li>
            )}
            {userInfo.address && (
              <li>
                <i className="bi bi-geo-alt-fill me-2"></i>
                {userInfo.address}
              </li>
            )}
            {userInfo.linkedin && (
              <li>
                <i className="bi bi-linkedin me-2"></i>
                {userInfo.linkedin}
              </li>
            )}
            {userInfo.github && (
              <li>
                <i className="bi bi-github me-2"></i>
                {userInfo.github}
              </li>
            )}
          </ul>
        </div>

        {/* Eğitim (Sol Sütunda) */}
        {educations.length > 0 && (
          <div className="p-4 pt-0">
            <h5 className="sidebar-header">Eğitim</h5>
            {educations.map((edu) => (
              <div key={edu.id} className="mb-3 text-light">
                <div className="fw-bold">{edu.school}</div>
                <div className="small opacity-75">{edu.degree}</div>
                <div className="small opacity-50 fst-italic">
                  {formatDate(edu.startDate)} -{" "}
                  {edu.endDate ? formatDate(edu.endDate) : "Devam"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Teknik Yetenekler */}
        {(skillsState.programmingLanguages?.length > 0 ||
          skillsState.developmentAreas?.length > 0) && (
          <div className="p-4 pt-0">
            <h5 className="sidebar-header">Uzmanlıklar</h5>
            <div className="d-flex flex-wrap gap-2">
              {skillsState.programmingLanguages?.map((s) => (
                <span key={s.id} className="tag-natural">
                  {s.name}
                </span>
              ))}
              {skillsState.developmentAreas?.map((s) => (
                <span key={s.id} className="tag-natural">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Yabancı Diller */}
        {skillsState.languages?.length > 0 && (
          <div className="p-4 pt-0">
            <h5 className="sidebar-header">Diller</h5>
            <ul className="list-unstyled text-light small opacity-90">
              {skillsState.languages.map((l) => (
                <li key={l.id} className="mb-1 d-flex justify-content-between">
                  <span>{l.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sosyal Beceriler */}
        {socialSkills.length > 0 && (
          <div className="p-4 pt-0">
            <h5 className="sidebar-header">Kişisel Beceriler</h5>
            <ul className="list-unstyled text-light small opacity-90">
              {socialSkills.map((s) => (
                <li key={s.id} className="mb-1">
                  <i className="bi bi-check2 me-1"></i> {s.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* --- SAĞ SÜTUN (Ana İçerik - Açık Renk) --- */}
      <div className="right-column p-5">
        {/* Hakkımda */}
        {userInfo.about && (
          <section className="mb-5">
            <h3 className="section-title">
              <span className="icon-box">
                <i className="bi bi-person"></i>
              </span>{" "}
              Hakkımda
            </h3>
            <p className="text-secondary description-text fst-italic bg-light p-3 rounded-3 border-start border-4 border-success-soft">
              {userInfo.about}
            </p>
          </section>
        )}

        {/* İş Deneyimi */}
        {experiences.length > 0 && (
          <section className="mb-5">
            <h3 className="section-title">
              <span className="icon-box">
                <i className="bi bi-briefcase"></i>
              </span>{" "}
              Deneyim
            </h3>
            <div className="experience-timeline">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="mb-4 position-relative break-avoid ps-3 border-start border-2 border-natural-light"
                >
                  <div className="timeline-leaf"></div>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h4 className="item-title mb-0">{exp.position}</h4>
                    <span className="date-badge">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Halen"}
                    </span>
                  </div>
                  <div className="company-name mb-2">{exp.company}</div>
                  {renderDescription(exp.description)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projeler */}
        {projects.length > 0 && (
          <section className="mb-5">
            <h3 className="section-title">
              <span className="icon-box">
                <i className="bi bi-code-square"></i>
              </span>{" "}
              Projeler
            </h3>
            <div className="d-flex flex-column gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="project-card break-avoid">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h5 className="fw-bold mb-0 text-dark">{proj.name}</h5>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="small text-success-muted mb-2 font-monospace">
                      {`{ ${proj.technologies} }`}
                    </div>
                  )}
                  {renderDescription(proj.description)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sertifikalar */}
        {certificates.length > 0 && (
          <section className="break-avoid">
            <h3 className="section-title">
              <span className="icon-box">
                <i className="bi bi-award"></i>
              </span>{" "}
              Sertifikalar
            </h3>
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="col">
                  <div className="cert-box">
                    <div className="fw-bold text-dark">{cert.title}</div>
                    <div className="small text-muted">{cert.issuer}</div>
                    {cert.date && (
                      <div className="small text-success-muted">
                        {new Date(cert.date).getFullYear()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        /* --- NATURAL THEME STYLES --- */
        .cv-container { 
          width: 210mm; 
          min-height: 297mm; 
          margin: 0 auto; 
          display: flex;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #4a4a4a;
          overflow: hidden; /* Taşmaları engelle */
        }

        /* COLORS */
        :root {
          --natural-dark: #4e5d4e; /* Koyu Yaprak Yeşili */
          --natural-medium: #6b8c6b; /* Adaçayı Yeşili */
          --natural-light: #dcedc8; /* Açık Filiz Yeşili */
          --natural-bg: #f9fbf7; /* Kırık Beyaz / Krem */
          --sand: #fdfcf0;
        }

        /* LEFT COLUMN */
        .left-column {
          width: 32%;
          background-color: var(--natural-dark, #4e5d4e);
          color: white;
          flex-shrink: 0;
        }

        .image-wrapper {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          border: 4px solid rgba(255,255,255,0.2);
          padding: 3px;
          overflow: hidden;
        }
        .profile-image { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        
        .name-title { font-family: 'Georgia', serif; font-size: 1.8rem; line-height: 1.1; letter-spacing: 0.5px; }
        .divider-light { height: 1px; background: rgba(255,255,255,0.2); margin: 0 auto; width: 80%; }
        
        .sidebar-header {
          color: var(--natural-light, #dcedc8);
          font-family: 'Georgia', serif;
          font-size: 1.1rem;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        
        .contact-list li { margin-bottom: 8px; display: flex; align-items: center; word-break: break-all; }
        .tag-natural {
          background: rgba(255,255,255,0.15);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          color: #fff;
          display: inline-block;
        }

        /* RIGHT COLUMN */
        .right-column {
          width: 68%;
          background-color: var(--natural-bg, #f9fbf7);
        }

        .section-title {
          font-family: 'Georgia', serif;
          color: var(--natural-dark, #4e5d4e);
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .icon-box {
          background-color: var(--natural-light, #dcedc8);
          color: var(--natural-dark, #4e5d4e);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1rem;
        }

        .description-text { font-size: 0.9rem; line-height: 1.6; color: #555; }
        .border-success-soft { border-color: var(--natural-medium, #6b8c6b) !important; }

        /* Timeline Items */
        .item-title { font-size: 1.1rem; font-weight: 700; color: #333; }
        .company-name { font-size: 0.95rem; font-weight: 600; color: var(--natural-medium, #6b8c6b); }
        .date-badge { font-size: 0.8rem; font-weight: bold; color: #777; background: #fff; padding: 2px 8px; border-radius: 4px; border: 1px solid #eee; }
        .timeline-leaf {
          position: absolute;
          left: -9px;
          top: 5px;
          width: 16px;
          height: 16px;
          background-color: var(--natural-bg, #f9fbf7);
          border: 3px solid var(--natural-medium, #6b8c6b);
          border-radius: 50% 0 50% 50%; /* Yaprak formu */
          transform: rotate(45deg);
        }
        .border-natural-light { border-color: #e0e0e0 !important; }

        /* Project & Cert Cards */
        .project-card {
          background: #fff;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid var(--natural-medium, #6b8c6b);
          box-shadow: 0 2px 5px rgba(0,0,0,0.03);
        }
        .project-link { color: var(--natural-medium, #6b8c6b); text-decoration: none; }
        .text-success-muted { color: #88a888; }
        
        .cert-box {
           background: #fff;
           padding: 12px;
           border-radius: 8px;
           border: 1px solid #eee;
        }

        .break-avoid { page-break-inside: avoid; }
        @media print {
            .cv-container { width: 100%; margin: 0; display: flex !important; }
            .left-column { background-color: #4e5d4e !important; -webkit-print-color-adjust: exact; }
            .right-column { background-color: #f9fbf7 !important; -webkit-print-color-adjust: exact; }
            .tag-natural { background: #6b8c6b !important; color: white !important; -webkit-print-color-adjust: exact; border: 1px solid #fff; }
            .timeline-leaf { border-color: #4e5d4e !important; -webkit-print-color-adjust: exact; }
            .icon-box { background-color: #dcedc8 !important; -webkit-print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
};

export default CvNatural;
