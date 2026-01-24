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
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  const renderList = (text) => {
    if (!text) return null;
    return (
      <ul style={{ margin: "2px 0 5px 0", paddingLeft: "20px" }}>
        {text.split("\n").map((line, index) => (
          <li
            key={index}
            style={{
              marginBottom: "2px",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            {line}
          </li>
        ))}
      </ul>
    );
  };

  const joinSkills = (list) => list?.map((i) => i.name).join(", ");

  // --- STİLLER ---
  const styles = {
    page: {
      width: "100%",
      maxWidth: "210mm",
      minHeight: "297mm",
      padding: "15mm 20mm",
      fontFamily: "'Times New Roman', serif",
      color: "#000000",
      backgroundColor: "#ffffff",
      lineHeight: "1.3",
      fontSize: "11pt",
      boxSizing: "border-box",
    },
    headerName: {
      fontSize: "20pt",
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
      marginBottom: "2px",
      marginTop: "0",
    },
    headerTitle: {
      fontSize: "12pt",
      textAlign: "center",
      marginBottom: "8px",
    },
    contactInfo: {
      textAlign: "center",
      fontSize: "10pt",
      marginBottom: "15px",
    },
    sectionTitle: {
      fontSize: "11pt",
      fontWeight: "bold",
      textTransform: "uppercase",
      borderBottom: "1px solid #000",
      paddingBottom: "2px",
      marginTop: "12px",
      marginBottom: "8px",
    },
    // Word uyumluluğu için Tablo Stili
    tableLayout: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "2px",
      border: "none",
    },
    tdLeft: {
      textAlign: "left",
      fontWeight: "bold",
      fontSize: "11pt",
      padding: 0,
      verticalAlign: "bottom",
    },
    tdRight: {
      textAlign: "right",
      fontSize: "10pt",
      padding: 0,
      verticalAlign: "bottom",
      whiteSpace: "nowrap", // Tarihin alt satıra kaymasını engeller
    },
    companyName: {
      fontStyle: "italic",
      marginBottom: "2px",
      fontSize: "11pt",
    },
  };

  return (
    <div
      id="cv-ats-print-area"
      className="mx-auto shadow-sm"
      style={styles.page}
    >
      {/* HEADER */}
      <header>
        <h1 style={styles.headerName}>
          {userInfo.name} {userInfo.lastName}
        </h1>
        <div style={styles.headerTitle}>{userInfo.title}</div>

        <div style={styles.contactInfo}>
          <div>
            {userInfo.email}{" "}
            {userInfo.phoneNumber && `| ${userInfo.phoneNumber}`}
          </div>
          <div style={{ marginTop: "2px" }}>
            {userInfo.linkedin && (
              <a
                href={`https://linkedin.com/in/${userInfo.linkedin}`}
                style={{ color: "#000", textDecoration: "none" }}
              >
                linkedin.com/in/{userInfo.linkedin}
              </a>
            )}
            {userInfo.github && userInfo.linkedin && " | "}
            {userInfo.github && (
              <a
                href={`https://github.com/${userInfo.github}`}
                style={{ color: "#000", textDecoration: "none" }}
              >
                github.com/{userInfo.github}
              </a>
            )}
          </div>
          {userInfo.address && <div>{userInfo.address}</div>}
        </div>
      </header>

      {/* DENEYİM */}
      {experiences.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>DENEYİM</h2>
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="ats-item"
              style={{ marginBottom: "10px" }}
            >
              {/* Flexbox yerine Tablo: Word'de %100 çalışır */}
              <table style={styles.tableLayout}>
                <tbody>
                  <tr>
                    <td style={styles.tdLeft}>{exp.position}</td>
                    <td style={styles.tdRight}>
                      {formatDate(exp.startDate)} –{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Devam"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={styles.companyName}>{exp.company}</div>
              {renderList(exp.description)}
            </div>
          ))}
        </section>
      )}

      {/* EĞİTİM */}
      {educations.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>EĞİTİM</h2>
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="ats-item"
              style={{ marginBottom: "8px" }}
            >
              <table style={styles.tableLayout}>
                <tbody>
                  <tr>
                    <td style={styles.tdLeft}>{edu.school}</td>
                    <td style={styles.tdRight}>
                      {formatDate(edu.startDate)} –{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Devam"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={styles.companyName}>{edu.degree}</div>
            </div>
          ))}
        </section>
      )}

      {/* TEKNİK BECERİLER */}
      {(skillsState.languages?.length > 0 ||
        skillsState.programmingLanguages?.length > 0 ||
        skillsState.developmentAreas?.length > 0 ||
        skillsState.versionControl?.length > 0) && (
        <section>
          <h2 style={styles.sectionTitle}>TEKNİK BECERİLER</h2>
          <div style={{ marginTop: "5px" }}>
            {skillsState.languages?.length > 0 && (
              <div style={{ marginBottom: "2px" }}>
                <span style={{ fontWeight: "bold" }}>Languages: </span>
                <span>{joinSkills(skillsState.languages)}</span>
              </div>
            )}
            {skillsState.programmingLanguages?.length > 0 && (
              <div style={{ marginBottom: "2px" }}>
                <span style={{ fontWeight: "bold" }}>
                  Programlama Dilleri:{" "}
                </span>
                <span>{joinSkills(skillsState.programmingLanguages)}</span>
              </div>
            )}
            {skillsState.developmentAreas?.length > 0 && (
              <div style={{ marginBottom: "2px" }}>
                <span style={{ fontWeight: "bold" }}>
                  Geliştirme Alanları:{" "}
                </span>
                <span>{joinSkills(skillsState.developmentAreas)}</span>
              </div>
            )}
            {skillsState.versionControl?.length > 0 && (
              <div style={{ marginBottom: "2px" }}>
                <span style={{ fontWeight: "bold" }}>Versiyon Kontrol: </span>
                <span>{joinSkills(skillsState.versionControl)}</span>
              </div>
            )}
            {skillsState.projectManagement?.length > 0 && (
              <div style={{ marginBottom: "2px" }}>
                <span style={{ fontWeight: "bold" }}>Proje Yönetimi: </span>
                <span>{joinSkills(skillsState.projectManagement)}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SOSYAL BECERİLER */}
      {socialSkills.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>SOSYAL BECERİLER</h2>
          <ul style={{ margin: "2px 0", paddingLeft: "20px" }}>
            {socialSkills.map((skill) => (
              <li key={skill.id} style={{ marginBottom: "2px" }}>
                {skill.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* PROJELER */}
      {projects.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>PROJELERİNİZ</h2>
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="ats-item"
              style={{ marginTop: "10px" }}
            >
              {/* Proje Başlığı ve Link Tablosu */}
              <table style={styles.tableLayout}>
                <tbody>
                  <tr>
                    <td style={styles.tdLeft}>
                      {proj.name}
                      {proj.link && (
                        <a
                          href={proj.link}
                          style={{
                            fontWeight: "normal",
                            fontSize: "10pt",
                            marginLeft: "8px",
                            color: "black",
                            textDecoration: "none",
                          }}
                        >
                          - {proj.link}
                        </a>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              {proj.technologies && (
                <div
                  style={{
                    fontSize: "10pt",
                    fontStyle: "italic",
                    marginBottom: "2px",
                  }}
                >
                  Teknolojiler: {proj.technologies}
                </div>
              )}
              {renderList(proj.description)}
            </div>
          ))}
        </section>
      )}

      {/* SERTİFİKALAR */}
      {certificates.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>SERTİFİKALAR</h2>
          <ul style={{ margin: "2px 0", paddingLeft: "20px" }}>
            {certificates.map((cert) => (
              <li key={cert.id} style={{ marginBottom: "2px" }}>
                <strong>{cert.title}</strong>
                <span> | {cert.issuer}</span>
                {cert.date && (
                  <span> | {new Date(cert.date).getFullYear()}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { background-color: white; }
          #cv-ats-print-area {
            width: 210mm !important;
            margin: 0 !important;
            padding: 15mm 20mm !important;
            box-shadow: none !important;
            border: none !important;
          }
          a { text-decoration: none !important; color: #000 !important; }
          .ats-item { page-break-inside: avoid; }
          h2 { page-break-after: avoid; }
        }
      `}</style>
    </div>
  );
};

export default CvAtsScreen;
