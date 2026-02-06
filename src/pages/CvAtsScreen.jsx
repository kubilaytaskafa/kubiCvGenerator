import React, { useRef } from "react";
import { useSelector } from "react-redux";

const CvAtsScreen = () => {
  // Redux State Bağlantıları
  const userInfo = useSelector((state) => state.userInfo);
  const { experiences } = useSelector((state) => state.experiences);
  const { educations } = useSelector((state) => state.educations);
  const skillsState = useSelector((state) => state.skills);
  const { socialSkills } = useSelector((state) => state.socialSkills);
  const { projects } = useSelector((state) => state.projects);
  const { certificates } = useSelector((state) => state.certificates);

  const cvRef = useRef(null);

  // --- YARDIMCI FONKSİYONLAR ---
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // KRİTİK AYAR: Tarayıcı dili ne olursa olsun ayları İngilizce (June, July) yazar.
    const month = date.toLocaleString("en-US", { month: "long" });
    return `${month} ${date.getFullYear()}`;
  };

  const joinSkills = (list) => {
    if (!list || list.length === 0) return null;
    return list.map((i) => i.name).join(", ");
  };

  // Madde İşaretli Liste Render
  const renderBulletList = (text) => {
    if (!text) return null;
    const items = text.split("\n").filter((line) => line.trim() !== "");
    if (items.length === 0) return null;

    return (
      <ul
        style={{
          margin: "4pt 0 8pt 0",
          paddingLeft: "18pt",
          listStyleType: "disc",
        }}
      >
        {items.map((line, index) => (
          <li
            key={index}
            style={{
              marginBottom: "2pt",
              fontFamily: "'Times New Roman', serif",
              fontSize: "11pt",
              lineHeight: "1.4",
              color: "#000000",
            }}
          >
            {line}
          </li>
        ))}
      </ul>
    );
  };

  // --- STİLLER ---
  const styles = {
    page: {
      width: "210mm",
      minHeight: "297mm",
      padding: "20mm",
      backgroundColor: "#ffffff",
      fontFamily: "'Times New Roman', Times, serif",
      color: "#000000",
      boxSizing: "border-box",
      lineHeight: "1.2",
    },
    header: {
      textAlign: "center",
      borderBottom: "2pt solid #000",
      paddingBottom: "10pt",
      marginBottom: "15pt",
    },
    name: {
      fontSize: "22pt",
      fontWeight: "bold",
      textTransform: "uppercase",
      margin: "0 0 5pt 0",
      letterSpacing: "1pt",
    },
    title: {
      fontSize: "14pt",
      fontWeight: "normal",
      margin: "0 0 8pt 0",
      fontStyle: "italic",
    },
    contactContainer: {
      fontSize: "10pt",
      marginTop: "5pt",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "8pt",
    },
    contactItem: {
      whiteSpace: "nowrap",
    },
    link: {
      color: "black",
      textDecoration: "none",
      cursor: "pointer",
    },
    sectionHeader: {
      fontSize: "12pt",
      fontWeight: "bold",
      textTransform: "uppercase",
      borderBottom: "1pt solid #000",
      marginTop: "18pt",
      marginBottom: "8pt",
      paddingBottom: "2pt",
      letterSpacing: "0.5pt",
    },
    rowSplit: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      width: "100%",
    },
    dateText: {
      fontSize: "11pt",
      textAlign: "right",
      whiteSpace: "nowrap",
      fontWeight: "normal",
    },
    skillRow: {
      marginBottom: "4pt",
      fontSize: "11pt",
    },
  };

  return (
    <div id="cv-preview" ref={cvRef} className="mx-auto" style={styles.page}>
      {/* --- HEADER --- */}
      <div style={styles.header}>
        <h1 style={styles.name}>
          {userInfo.name} {userInfo.lastName}
        </h1>
        <div style={styles.title}>{userInfo.title}</div>

        <div style={styles.contactContainer}>
          {userInfo.email && (
            <span style={styles.contactItem}>{userInfo.email}</span>
          )}

          {userInfo.phoneNumber && (
            <span style={styles.contactItem}>• {userInfo.phoneNumber}</span>
          )}

          {userInfo.linkedin && (
            <span style={styles.contactItem}>
              •{" "}
              <a
                href={`https://linkedin.com/in/${userInfo.linkedin}`}
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/{userInfo.linkedin}
              </a>
            </span>
          )}

          {userInfo.github && (
            <span style={styles.contactItem}>
              •{" "}
              <a
                href={`https://github.com/${userInfo.github}`}
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/{userInfo.github}
              </a>
            </span>
          )}

          {userInfo.website && (
            <span style={styles.contactItem}>
              •{" "}
              <a
                href={userInfo.website}
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {userInfo.website.replace(/^https?:\/\//, "")}
              </a>
            </span>
          )}
        </div>
      </div>

      {/* --- EXPERIENCE --- */}
      {experiences.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</div>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "10pt" }}>
              <div style={styles.rowSplit}>
                <span style={{ fontWeight: "bold", fontSize: "12pt" }}>
                  {exp.company}
                </span>
                <span style={styles.dateText}>
                  {formatDate(exp.startDate)} –{" "}
                  {/* "Devam Ediyor" yerine "Present" zorunlu */}
                  {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </span>
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  fontSize: "11pt",
                  marginBottom: "4pt",
                }}
              >
                {exp.position}
              </div>
              {renderBulletList(exp.description)}
            </div>
          ))}
        </section>
      )}

      {/* --- EDUCATION --- */}
      {educations.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>EDUCATION</div>
          {educations.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "8pt" }}>
              <div style={styles.rowSplit}>
                <span style={{ fontWeight: "bold", fontSize: "11pt" }}>
                  {edu.school}
                </span>
                <span style={styles.dateText}>
                  {formatDate(edu.startDate)} –{" "}
                  {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </span>
              </div>
              <div style={{ fontSize: "11pt" }}>
                {edu.degree} {edu.fieldOfStudy ? `– ${edu.fieldOfStudy}` : ""}
              </div>
              {edu.grade && (
                <div style={{ fontSize: "10pt" }}>GPA: {edu.grade}</div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* --- TECHNICAL SKILLS --- */}
      <section>
        <div style={styles.sectionHeader}>TECHNICAL SKILLS</div>
        <div style={{ fontSize: "11pt", lineHeight: "1.5" }}>
          {skillsState.programmingLanguages?.length > 0 && (
            <div style={styles.skillRow}>
              <strong>Programming Languages: </strong>
              <span>{joinSkills(skillsState.programmingLanguages)}</span>
            </div>
          )}
          {skillsState.developmentAreas?.length > 0 && (
            <div style={styles.skillRow}>
              <strong>Development Areas: </strong>
              <span>{joinSkills(skillsState.developmentAreas)}</span>
            </div>
          )}
          {skillsState.versionControl?.length > 0 && (
            <div style={styles.skillRow}>
              <strong>Tools & Technologies: </strong>
              <span>{joinSkills(skillsState.versionControl)}</span>
            </div>
          )}
          {skillsState.languages?.length > 0 && (
            <div style={styles.skillRow}>
              <strong>Languages: </strong>
              <span>{joinSkills(skillsState.languages)}</span>
            </div>
          )}
        </div>
      </section>

      {/* --- PROJECTS --- */}
      {projects.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>PROJECTS</div>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "10pt" }}>
              <div style={styles.rowSplit}>
                <span style={{ fontWeight: "bold", fontSize: "11pt" }}>
                  {proj.name}
                  {proj.link && (
                    <a
                      href={proj.link}
                      style={{
                        fontWeight: "normal",
                        fontSize: "10pt",
                        marginLeft: "5pt",
                        color: "#000",
                        textDecoration: "underline",
                      }}
                    >
                      [Link]
                    </a>
                  )}
                </span>
              </div>
              {proj.technologies && (
                <div
                  style={{
                    fontSize: "10pt",
                    fontStyle: "italic",
                    marginBottom: "2pt",
                  }}
                >
                  {/* "Teknolojiler" yerine "Technologies" */}
                  <strong>Technologies:</strong> {proj.technologies}
                </div>
              )}
              {renderBulletList(proj.description)}
            </div>
          ))}
        </section>
      )}

      {/* --- CERTIFICATES --- */}
      {certificates.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>CERTIFICATIONS</div>
          <ul
            style={{
              margin: "4pt 0",
              paddingLeft: "18pt",
              listStyleType: "square",
            }}
          >
            {certificates.map((cert) => (
              <li
                key={cert.id}
                style={{
                  marginBottom: "3pt",
                  fontSize: "11pt",
                  fontFamily: "'Times New Roman', serif",
                }}
              >
                <strong>{cert.title}</strong>
                {cert.issuer && ` — ${cert.issuer}`}
                {cert.date && ` (${new Date(cert.date).getFullYear()})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* --- SOCIAL SKILLS --- */}
      {socialSkills.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>SOFT SKILLS</div>
          <div style={{ fontSize: "11pt" }}>{joinSkills(socialSkills)}</div>
        </section>
      )}

      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact; }
          #cv-preview {
            width: 100% !important;
            padding: 15mm 20mm !important;
            box-shadow: none !important;
            border: none !important;
          }
          a { text-decoration: none !important; color: #000000 !important; }
        }
      `}</style>
    </div>
  );
};

export default CvAtsScreen;
