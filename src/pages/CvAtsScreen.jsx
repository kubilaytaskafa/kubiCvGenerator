import React from "react";
import { useSelector } from "react-redux";

const CvAtsScreen = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const { experiences } = useSelector((state) => state.experiences);
  const { educations } = useSelector((state) => state.educations);
  const skillsState = useSelector((state) => state.skills);
  const { socialSkills } = useSelector((state) => state.socialSkills);
  const { projects } = useSelector((state) => state.projects);
  const { certificates } = useSelector((state) => state.certificates);

  // --- YARDIMCI FORMATLAYICILAR ---
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // ATS için en güvenli format: "June 2023" veya "06/2023"
    const month = date.toLocaleString("default", { month: "long" });
    return `${month} ${date.getFullYear()}`;
  };

  // Liste öğelerini temiz render etme
  const renderList = (text) => {
    if (!text) return null;
    return (
      <ul
        style={{ margin: "5px 0", paddingLeft: "18px", listStyleType: "disc" }}
      >
        {text.split("\n").map((line, index) => {
          if (!line.trim()) return null;
          return (
            <li
              key={index}
              style={{
                marginBottom: "3px",
                fontFamily: "'Calibri', 'Times New Roman', serif", // Word uyumluluğu için güvenli fontlar
                fontSize: "11pt",
                lineHeight: "1.4",
              }}
            >
              {line}
            </li>
          );
        })}
      </ul>
    );
  };

  const joinSkills = (list) => list?.map((i) => i.name).join(", ");

  // --- STİLLER (Word ve ATS Optimize) ---
  const styles = {
    page: {
      width: "210mm",
      minHeight: "297mm",
      padding: "20mm", // Standart Word kenar boşluğu
      fontFamily: "'Calibri', 'Arial', sans-serif", // Sans-serif ATS'de daha temiz okunur, ama Times da olur.
      color: "#000000",
      backgroundColor: "#ffffff",
      lineHeight: "1.2",
      fontSize: "11pt",
      boxSizing: "border-box",
    },
    // Word'de "Başlık 1" olarak algılanması için H1
    headerName: {
      fontSize: "24pt",
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
      marginBottom: "5px",
      margin: "0",
      letterSpacing: "1px",
    },
    headerTitle: {
      fontSize: "14pt",
      textAlign: "center",
      marginBottom: "10px",
      fontWeight: "normal",
    },
    contactInfo: {
      textAlign: "center",
      fontSize: "10pt",
      marginBottom: "20px",
      borderBottom: "1px solid #000", // Görsel ayraç
      paddingBottom: "10px",
    },
    // Word'de "Başlık 2" olarak algılanması için H2
    sectionTitle: {
      fontSize: "12pt",
      fontWeight: "bold",
      textTransform: "uppercase",
      borderBottom: "1px solid #000",
      paddingBottom: "3px",
      marginTop: "15px",
      marginBottom: "10px",
      letterSpacing: "0.5px",
    },
    // İş Deneyimi Başlıkları için H3
    jobTitle: {
      fontSize: "11pt",
      fontWeight: "bold",
      margin: 0,
      display: "inline-block", // Yan yana dizilim için
    },
    companyName: {
      fontSize: "11pt",
      fontStyle: "italic",
      margin: 0,
    },
    dateLocation: {
      fontSize: "10pt",
      textAlign: "right",
      float: "right", // Word bunu sağa yaslar
      fontWeight: "normal",
    },
    // Flexbox yerine Block yapısı (ATS parsing sırası için daha güvenli)
    entryContainer: {
      marginBottom: "12px",
      pageBreakInside: "avoid", // Word'de sayfa sonu bölünmesini engeller
    },
  };

  return (
    <div id="cv-ats-print-area" className="mx-auto" style={styles.page}>
      {/* HEADER */}
      <header>
        <h1 style={styles.headerName}>
          {userInfo.name} {userInfo.lastName}
        </h1>
        <div style={styles.headerTitle}>{userInfo.title}</div>

        <div style={styles.contactInfo}>
          <span>{userInfo.email}</span>
          {userInfo.phoneNumber && <span> | {userInfo.phoneNumber}</span>}
          {userInfo.linkedin && (
            <span>
              {" "}
              |{" "}
              <a
                href={`https://linkedin.com/in/${userInfo.linkedin}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                LinkedIn
              </a>
            </span>
          )}
          {userInfo.github && (
            <span>
              {" "}
              |{" "}
              <a
                href={`https://github.com/${userInfo.github}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                GitHub
              </a>
            </span>
          )}
          {userInfo.address && <span> | {userInfo.address}</span>}
        </div>
      </header>

      {/* ATS İPUCU: Bölüm başlıkları standart olmalı (Experience, Education, Skills).
         Word İPUCU: H2 etiketleri Word'de Stil olarak gelir.
      */}

      {/* DENEYİM (PROFESSIONAL EXPERIENCE) */}
      {experiences.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</h2>
          {experiences.map((exp) => (
            <div key={exp.id} style={styles.entryContainer}>
              {/* Layout: Başlık Solda, Tarih Sağda */}
              <div
                style={{
                  borderBottom: "none",
                  paddingBottom: "2px",
                  overflow: "hidden",
                }}
              >
                <h3 style={styles.jobTitle}>{exp.position}</h3>
                <span style={styles.dateLocation}>
                  {formatDate(exp.startDate)} –{" "}
                  {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={styles.companyName}>{exp.company}</div>
                {/* Şehir varsa buraya eklenebilir */}
              </div>

              {renderList(exp.description)}
            </div>
          ))}
        </section>
      )}

      {/* EĞİTİM (EDUCATION) */}
      {educations.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>EDUCATION</h2>
          {educations.map((edu) => (
            <div key={edu.id} style={styles.entryContainer}>
              <div style={{ overflow: "hidden" }}>
                <h3 style={styles.jobTitle}>{edu.school}</h3>
                <span style={styles.dateLocation}>
                  {formatDate(edu.startDate)} –{" "}
                  {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </span>
              </div>
              <div style={styles.companyName}>{edu.degree}</div>
            </div>
          ))}
        </section>
      )}

      {/* TEKNİK BECERİLER (SKILLS) */}
      {/* Tablo yerine düz metin listesi ATS için çok daha iyidir */}
      {(skillsState.languages?.length > 0 ||
        skillsState.programmingLanguages?.length > 0) && (
        <section>
          <h2 style={styles.sectionTitle}>SKILLS</h2>
          <div style={{ fontSize: "11pt", lineHeight: "1.5" }}>
            {skillsState.programmingLanguages?.length > 0 && (
              <div style={{ marginBottom: "4px" }}>
                <strong>Programming Languages: </strong>
                <span>{joinSkills(skillsState.programmingLanguages)}</span>
              </div>
            )}

            {skillsState.developmentAreas?.length > 0 && (
              <div style={{ marginBottom: "4px" }}>
                <strong>Development Areas: </strong>
                <span>{joinSkills(skillsState.developmentAreas)}</span>
              </div>
            )}

            {skillsState.versionControl?.length > 0 && (
              <div style={{ marginBottom: "4px" }}>
                <strong>Tools & Technologies: </strong>
                <span>
                  {joinSkills(skillsState.versionControl)}{" "}
                  {skillsState.projectManagement?.length > 0 &&
                    ", " + joinSkills(skillsState.projectManagement)}
                </span>
              </div>
            )}

            {skillsState.languages?.length > 0 && (
              <div style={{ marginBottom: "4px" }}>
                <strong>Languages: </strong>
                <span>{joinSkills(skillsState.languages)}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* PROJELER (PROJECTS) */}
      {projects.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>PROJECTS</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={styles.entryContainer}>
              <div style={{ overflow: "hidden" }}>
                <h3 style={styles.jobTitle}>{proj.name}</h3>
                {proj.link && (
                  <span style={{ float: "right", fontSize: "10pt" }}>
                    <a
                      href={proj.link}
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      View Project
                    </a>
                  </span>
                )}
              </div>
              {proj.technologies && (
                <div
                  style={{
                    fontStyle: "italic",
                    fontSize: "10pt",
                    marginBottom: "2px",
                  }}
                >
                  Technologies: {proj.technologies}
                </div>
              )}
              {renderList(proj.description)}
            </div>
          ))}
        </section>
      )}

      {/* SERTİFİKALAR (CERTIFICATIONS) */}
      {certificates.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>CERTIFICATIONS</h2>
          <ul style={{ margin: "5px 0", paddingLeft: "18px" }}>
            {certificates.map((cert) => (
              <li key={cert.id} style={{ marginBottom: "3px" }}>
                <strong>{cert.title}</strong> — {cert.issuer}
                {cert.date && ` (${new Date(cert.date).getFullYear()})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* SOSYAL BECERİLER (Opsiyonel - ATS genelde Hard Skill sever ama yer varsa eklenir) */}
      {socialSkills.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>SOFT SKILLS</h2>
          <div style={{ fontSize: "11pt" }}>
            {socialSkills.map((s) => s.name).join(" • ")}
          </div>
        </section>
      )}

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact; }
          #cv-ats-print-area {
            width: 100% !important;
            margin: 0 !important;
            padding: 20mm !important;
            box-shadow: none !important;
          }
          /* Linklerin mavi ve altı çizili çıkmasını engeller */
          a { text-decoration: none !important; color: #000 !important; }
          /* Word'e aktarırken sayfa sonu bölünmelerini yönetir */
          h1, h2, h3 { page-break-after: avoid; }
          section { page-break-inside: auto; }
          div[style*="entryContainer"] { page-break-inside: avoid; }
        }
      `}</style>
    </div>
  );
};

export default CvAtsScreen;
