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
          <span key={index} className="d-block mb-1">
            {line.trim().startsWith("-") || line.trim().startsWith("*")
              ? line
              : `• ${line}`}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="cv-container bg-white">
      {/* ================= HEADER ================= */}
      <header className="text-center mb-5 pb-4 border-bottom-double">
        {userInfo.image && (
          <div className="mb-3">
            <img
              src={userInfo.image}
              alt="Profile"
              className="profile-image shadow-sm w-200 h-200"
            />
          </div>
        )}

        <h1 className="name-title text-uppercase mb-2">
          {userInfo.name} <span className="fw-normal">{userInfo.lastName}</span>
        </h1>

        <p className="job-title mb-3 text-uppercase">{userInfo.title}</p>

        {/* İletişim Bilgileri - Tek Satırda Zarif Ayrım */}
        <div className="contact-line small">
          {[
            userInfo.email,
            userInfo.phoneNumber,
            userInfo.address,
            userInfo.linkedin ? `linkedin.com/in/${userInfo.linkedin}` : null,
            userInfo.github ? `github.com/${userInfo.github}` : null,
          ]
            .filter(Boolean)
            .map((item, index, arr) => (
              <span key={index}>
                {item}
                {index < arr.length - 1 && <span className="separator">♦</span>}
              </span>
            ))}
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <div className="px-4">
        {/* HAKKIMDA */}
        {userInfo.about && (
          <section className="mb-5 text-center px-5 section-about">
            <p className="fst-italic lead mb-0">"{userInfo.about}"</p>
          </section>
        )}

        {/* DENEYİM */}
        {experiences.length > 0 && (
          <section className="mb-5">
            <h2 className="section-header text-center mb-4">
              PROFESYONEL DENEYİM
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-4 break-avoid position-relative">
                <div className="d-flex justify-content-between align-items-baseline border-bottom border-light pb-1 mb-2">
                  <h3 className="item-title mb-0">{exp.position}</h3>
                  <span className="date-text fst-italic">
                    {formatDate(exp.startDate)} –{" "}
                    {exp.endDate ? formatDate(exp.endDate) : "Halen"}
                  </span>
                </div>
                <div className="company-subtitle mb-2">{exp.company}</div>
                {renderDescription(exp.description)}
              </div>
            ))}
          </section>
        )}

        {/* PROJELER (Yeni Eklendi) */}
        {projects.length > 0 && (
          <section className="mb-5">
            <h2 className="section-header text-center mb-4">ÖNEMLİ PROJELER</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-4 break-avoid">
                <div className="d-flex justify-content-between align-items-baseline mb-1">
                  <h3
                    className="item-title mb-0"
                    style={{ fontSize: "1.05rem" }}
                  >
                    {proj.name}
                  </h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      className="small text-dark text-decoration-none fst-italic border-bottom border-dark pb-0"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Projeyi Görüntüle
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <div className="small text-secondary fst-italic mb-2 font-sans">
                    Kullanılan Teknolojiler: {proj.technologies}
                  </div>
                )}
                {renderDescription(proj.description)}
              </div>
            ))}
          </section>
        )}

        {/* EĞİTİM */}
        {educations.length > 0 && (
          <section className="mb-5">
            <h2 className="section-header text-center mb-4">EĞİTİM GEÇMİŞİ</h2>
            <div className="row">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="col-12 mb-3 text-center break-avoid"
                >
                  <div className="fw-bold fs-5">{edu.school}</div>
                  <div className="fst-italic">{edu.degree}</div>
                  <div className="small text-muted font-sans mt-1">
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Devam"}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ALT BÖLÜM: YETENEKLER, SERTİFİKALAR, DİLLER (3 Sütunlu Grid) */}
        <div className="row mt-5 pt-3 border-top border-dark break-avoid">
          {/* Sütun 1: Teknik Yetkinlikler */}
          <div className="col-4 border-end border-light">
            <h4 className="column-header mb-3">Teknik Yetkinlikler</h4>
            <ul className="list-unstyled text-center small">
              {skillsState.programmingLanguages?.map((s) => (
                <li key={s.id} className="mb-1">
                  {s.name}
                </li>
              ))}
              {skillsState.developmentAreas?.map((s) => (
                <li key={s.id} className="mb-1 text-secondary">
                  {s.name}
                </li>
              ))}
              {skillsState.versionControl?.map((s) => (
                <li key={s.id} className="mb-1 text-muted">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Sütun 2: Sertifikalar & Diller */}
          <div className="col-4 border-end border-light">
            {certificates.length > 0 && (
              <div className="mb-4">
                <h4 className="column-header mb-3">Sertifikalar</h4>
                <ul className="list-unstyled text-center small">
                  {certificates.map((c) => (
                    <li key={c.id} className="mb-2">
                      <strong>{c.title}</strong>
                      <br />
                      <span className="text-muted fst-italic">{c.issuer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {skillsState.languages?.length > 0 && (
              <div>
                <h4 className="column-header mb-3">Yabancı Diller</h4>
                <ul className="list-unstyled text-center small">
                  {skillsState.languages.map((l) => (
                    <li key={l.id} className="mb-1">
                      {l.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sütun 3: Sosyal Beceriler */}
          <div className="col-4">
            {socialSkills.length > 0 && (
              <div>
                <h4 className="column-header mb-3">Sosyal Beceriler</h4>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {socialSkills.map((s) => (
                    <span
                      key={s.id}
                      className="small text-dark pb-1 border-bottom border-secondary"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* --- ELEGANT THEME STYLES --- */
        .cv-container { 
          width: 210mm; 
          min-height: 297mm; 
          margin: 0 auto; 
          font-family: 'Garamond', 'Georgia', 'Times New Roman', serif; 
          color: #1a1a1a; 
          padding: 12mm 15mm;
          line-height: 1.5;
        }

        /* HEADER */
        .profile-image { width: 100px; height: 100px; object-fit: cover; border-radius: 50%; border: 1px solid #ddd; }
        .name-title { font-size: 2.4rem; letter-spacing: 1px; font-weight: 700; color: #000; }
        .job-title { letter-spacing: 3px; font-size: 0.9rem; color: #444; margin-top: -5px; }
        .contact-line { font-family: 'Helvetica Neue', Arial, sans-serif; color: #555; margin-top: 10px; }
        .separator { margin: 0 8px; color: #bbb; font-size: 0.8em; vertical-align: middle; }
        .border-bottom-double { border-bottom: 3px double #000; }

        /* SECTIONS */
        .section-header { 
          font-size: 1.2rem; 
          letter-spacing: 2px; 
          border-bottom: 1px solid #000; 
          display: inline-block; 
          padding-bottom: 5px; 
          margin-bottom: 25px;
          text-transform: uppercase;
        }
        
        .section-about { color: #333; }

        /* CONTENT ITEMS */
        .item-title { font-size: 1.2rem; font-weight: bold; color: #000; font-family: 'Garamond', serif; }
        .company-subtitle { font-size: 1.05rem; font-style: italic; color: #333; font-family: 'Georgia', serif; }
        .date-text { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 0.85rem; color: #666; }
        .description-text { font-family: 'Helvetica', Arial, sans-serif; font-size: 0.9rem; color: #2c2c2c; text-align: justify; }
        .font-sans { font-family: 'Helvetica Neue', Arial, sans-serif; }

        /* FOOTER COLUMNS */
        .column-header { 
          font-size: 1rem; 
          text-align: center; 
          font-weight: bold; 
          text-transform: uppercase; 
          letter-spacing: 1px; 
          color: #444; 
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }

        /* PRINT */
        .break-avoid { page-break-inside: avoid; }
        @media print {
            .cv-container { width: 100%; margin: 0; padding: 10mm 10mm !important; box-shadow: none; border: none; }
            a { text-decoration: none; color: #000; }
        }
      `}</style>
    </div>
  );
};

export default CvElegant;
