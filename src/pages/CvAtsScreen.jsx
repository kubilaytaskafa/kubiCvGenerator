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
  // ATS uyumlu tarih formatı: "Month YYYY" formatı
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  // Beceri listesini virgülle ayırarak birleştir
  const joinSkills = (list) => {
    if (!list || list.length === 0) return null;
    return list.map((i) => i.name).join(", ");
  };

  // Madde işaretli liste render - ATS uyumlu basit format
  const renderBulletList = (text) => {
    if (!text) return null;
    const items = text.split("\n").filter((line) => line.trim() !== "");
    if (items.length === 0) return null;

    return (
      <ul
        style={{
          margin: "6pt 0 8pt 0",
          paddingLeft: "20pt",
          listStyleType: "disc",
        }}
      >
        {items.map((line, index) => (
          <li
            key={index}
            style={{
              marginBottom: "3pt",
              fontSize: "11pt",
              lineHeight: "1.5",
              color: "#000000",
            }}
          >
            {line}
          </li>
        ))}
      </ul>
    );
  };

  // --- ATS UYUMLU STİLLER ---
  // Basit, temiz ve ATS'nin kolayca parse edebileceği formatlar
  const styles = {
    page: {
      width: "210mm",
      minHeight: "297mm",
      padding: "25mm 20mm",
      backgroundColor: "#ffffff",
      fontFamily: "'Calibri', 'Arial', sans-serif", // ATS'nin tercih ettiği fontlar
      color: "#000000",
      boxSizing: "border-box",
      lineHeight: "1.15",
      fontSize: "11pt",
    },
    // HEADER - Basit ve standart format
    header: {
      textAlign: "left", // ATS için sol hizalama daha iyi
      marginBottom: "20pt",
      paddingBottom: "12pt",
      borderBottom: "1.5pt solid #000000",
    },
    name: {
      fontSize: "20pt",
      fontWeight: "bold",
      margin: "0 0 6pt 0",
      letterSpacing: "0.5pt",
      textTransform: "uppercase",
    },
    contactInfo: {
      fontSize: "10pt",
      lineHeight: "1.6",
      marginTop: "8pt",
    },
    contactLine: {
      marginBottom: "2pt",
    },
    // SECTION HEADERS - ATS'nin tanıdığı standart başlıklar
    sectionHeader: {
      fontSize: "13pt",
      fontWeight: "bold",
      textTransform: "uppercase",
      marginTop: "16pt",
      marginBottom: "10pt",
      paddingBottom: "4pt",
      borderBottom: "1pt solid #000000",
      letterSpacing: "0.5pt",
    },
    // İş deneyimi ve eğitim için standart format
    entryHeader: {
      marginBottom: "8pt",
    },
    jobTitle: {
      fontSize: "12pt",
      fontWeight: "bold",
      marginBottom: "2pt",
    },
    company: {
      fontSize: "11pt",
      fontWeight: "normal",
      marginBottom: "2pt",
    },
    dateLocation: {
      fontSize: "10pt",
      fontStyle: "italic",
      color: "#333333",
      marginBottom: "4pt",
    },
    // Beceriler için basit format
    skillCategory: {
      marginBottom: "6pt",
      lineHeight: "1.5",
    },
    // Professional Summary
    summary: {
      fontSize: "11pt",
      lineHeight: "1.6",
      marginBottom: "4pt",
      textAlign: "justify",
    },
  };

  return (
    <div id="cv-preview" ref={cvRef} className="mx-auto" style={styles.page}>
      {/* ============ HEADER ============ */}
      <header style={styles.header}>
        {/* İsim - ATS için en önemli */}
        <h1 style={styles.name}>
          {userInfo.name} {userInfo.lastName}
        </h1>

        {/* İletişim Bilgileri - Standart format */}
        <div style={styles.contactInfo}>
          {userInfo.email && (
            <div style={styles.contactLine}>
              <strong>Email:</strong> {userInfo.email}
            </div>
          )}
          {userInfo.phoneNumber && (
            <div style={styles.contactLine}>
              <strong>Phone:</strong> {userInfo.phoneNumber}
            </div>
          )}
          {/* Konum bilgisi - ATS için çok önemli! */}
          {(userInfo.city || userInfo.country) && (
            <div style={styles.contactLine}>
              <strong>Location:</strong>{" "}
              {[userInfo.city, userInfo.country].filter(Boolean).join(", ")}
            </div>
          )}
          {userInfo.linkedin && (
            <div style={styles.contactLine}>
              <strong>LinkedIn:</strong> linkedin.com/in/{userInfo.linkedin}
            </div>
          )}
          {userInfo.github && (
            <div style={styles.contactLine}>
              <strong>GitHub:</strong> github.com/{userInfo.github}
            </div>
          )}
          {userInfo.website && (
            <div style={styles.contactLine}>
              <strong>Website:</strong>{" "}
              {userInfo.website.replace(/^https?:\/\//, "")}
            </div>
          )}
        </div>
      </header>

      {/* ============ PROFESSIONAL SUMMARY ============ */}
      {/* ATS skorunu artıran önemli bölüm */}
      {userInfo.summary && (
        <section>
          <h2 style={styles.sectionHeader}>PROFESSIONAL SUMMARY</h2>
          <p style={styles.summary}>{userInfo.summary}</p>
        </section>
      )}

      {/* ============ PROFESSIONAL EXPERIENCE ============ */}
      {/* ATS'nin en çok önem verdiği bölüm */}
      {experiences && experiences.length > 0 && (
        <section>
          <h2 style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</h2>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "14pt" }}>
              {/* Pozisyon - En önemli bilgi */}
              <div style={styles.jobTitle}>{exp.position}</div>

              {/* Şirket adı */}
              <div style={styles.company}>{exp.company}</div>

              {/* Tarih ve Konum */}
              <div style={styles.dateLocation}>
                {formatDate(exp.startDate)} –{" "}
                {exp.endDate ? formatDate(exp.endDate) : "Present"}
                {exp.location && ` | ${exp.location}`}
              </div>

              {/* Açıklama - Madde işaretli */}
              {exp.description && renderBulletList(exp.description)}
            </div>
          ))}
        </section>
      )}

      {/* ============ EDUCATION ============ */}
      {educations && educations.length > 0 && (
        <section>
          <h2 style={styles.sectionHeader}>EDUCATION</h2>
          {educations.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "10pt" }}>
              {/* Derece ve Alan */}
              <div style={styles.jobTitle}>
                {edu.degree}
                {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
              </div>

              {/* Okul adı */}
              <div style={styles.company}>{edu.school}</div>

              {/* Tarih ve GPA */}
              <div style={styles.dateLocation}>
                {formatDate(edu.startDate)} –{" "}
                {edu.endDate ? formatDate(edu.endDate) : "Present"}
                {edu.grade && ` | GPA: ${edu.grade}`}
                {edu.location && ` | ${edu.location}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ============ SKILLS ============ */}
      {/* ATS için kritik - Anahtar kelime eşleştirme */}
      <section>
        <h2 style={styles.sectionHeader}>SKILLS</h2>

        {/* Technical Skills */}
        {skillsState.programmingLanguages?.length > 0 && (
          <div style={styles.skillCategory}>
            <strong>Programming Languages:</strong>{" "}
            {joinSkills(skillsState.programmingLanguages)}
          </div>
        )}

        {skillsState.developmentAreas?.length > 0 && (
          <div style={styles.skillCategory}>
            <strong>Technologies & Frameworks:</strong>{" "}
            {joinSkills(skillsState.developmentAreas)}
          </div>
        )}

        {skillsState.versionControl?.length > 0 && (
          <div style={styles.skillCategory}>
            <strong>Tools & Platforms:</strong>{" "}
            {joinSkills(skillsState.versionControl)}
          </div>
        )}

        {/* Soft Skills - ATS için önemli */}
        {socialSkills && socialSkills.length > 0 && (
          <div style={styles.skillCategory}>
            <strong>Soft Skills:</strong> {joinSkills(socialSkills)}
          </div>
        )}

        {/* Diller */}
        {skillsState.languages?.length > 0 && (
          <div style={styles.skillCategory}>
            <strong>Languages:</strong> {joinSkills(skillsState.languages)}
          </div>
        )}
      </section>

      {/* ============ PROJECTS ============ */}
      {projects && projects.length > 0 && (
        <section>
          <h2 style={styles.sectionHeader}>PROJECTS</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "12pt" }}>
              {/* Proje adı */}
              <div style={styles.jobTitle}>
                {proj.name}
                {proj.link && (
                  <span
                    style={{
                      fontWeight: "normal",
                      fontSize: "10pt",
                      marginLeft: "6pt",
                    }}
                  >
                    ({proj.link.replace(/^https?:\/\//, "")})
                  </span>
                )}
              </div>

              {/* Teknolojiler */}
              {proj.technologies && (
                <div
                  style={{
                    fontSize: "10pt",
                    fontStyle: "italic",
                    marginBottom: "4pt",
                  }}
                >
                  <strong>Technologies:</strong> {proj.technologies}
                </div>
              )}

              {/* Açıklama */}
              {proj.description && renderBulletList(proj.description)}
            </div>
          ))}
        </section>
      )}

      {/* ============ CERTIFICATIONS ============ */}
      {certificates && certificates.length > 0 && (
        <section>
          <h2 style={styles.sectionHeader}>CERTIFICATIONS</h2>
          {certificates.map((cert) => (
            <div key={cert.id} style={{ marginBottom: "6pt" }}>
              <div>
                <strong>{cert.title}</strong>
                {cert.issuer && ` – ${cert.issuer}`}
                {cert.date && (
                  <span style={{ fontStyle: "italic", marginLeft: "6pt" }}>
                    ({new Date(cert.date).getFullYear()})
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          @page { 
            margin: 0; 
            size: A4; 
          }
          body { 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          #cv-preview {
            width: 100% !important;
            padding: 20mm !important;
            box-shadow: none !important;
            border: none !important;
          }
          /* ATS için tüm linkler siyah ve altı çizgisiz */
          a { 
            text-decoration: none !important; 
            color: #000000 !important; 
          }
          /* Sayfa sonlarında bölünmeyi engelle */
          section {
            page-break-inside: avoid;
          }
          h1, h2, h3 {
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default CvAtsScreen;
