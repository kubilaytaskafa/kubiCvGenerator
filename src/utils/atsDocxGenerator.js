import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";

/**
 * ATS uyumlu DOCX dosyası oluşturur
 * @param {Object} data - CV verileri (userInfo, experiences, educations, vb.)
 * @param {string} fileName - Dosya adı
 */
export const generateAtsDocx = async (data, fileName = "My_CV") => {
  const {
    userInfo,
    experiences,
    educations,
    skillsState,
    socialSkills,
    projects,
    certificates,
  } = data;

  // Yardımcı fonksiyonlar
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", { month: "long" });
    return `${month} ${date.getFullYear()}`;
  };

  const joinSkills = (list) => {
    if (!list || list.length === 0) return "";
    return list.map((i) => i.name).join(", ");
  };

  // Madde işaretli liste oluşturma
  const createBulletList = (text) => {
    if (!text) return [];
    const items = text.split("\n").filter((line) => line.trim() !== "");
    return items.map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: {
            level: 0,
          },
          spacing: {
            before: 50,
            after: 50,
          },
        }),
    );
  };

  // Bölüm başlığı oluşturma
  const createSectionHeader = (text) =>
    new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
      spacing: {
        before: 300,
        after: 150,
      },
      border: {
        bottom: {
          color: "000000",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    });

  // Belge içeriği
  const children = [];

  // HEADER - İsim (Sol hizalama - ATS için daha iyi)
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${userInfo.name} ${userInfo.lastName}`.toUpperCase(),
          bold: true,
          size: 40, // 20pt
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
    }),
  );

  // İletişim Bilgileri - Standart format
  if (userInfo.email) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Email: ", bold: true }),
          new TextRun({ text: userInfo.email }),
        ],
        spacing: { after: 40 },
      }),
    );
  }

  if (userInfo.phoneNumber) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Phone: ", bold: true }),
          new TextRun({ text: userInfo.phoneNumber }),
        ],
        spacing: { after: 40 },
      }),
    );
  }

  // Konum - ATS için çok önemli!
  if (userInfo.city || userInfo.country) {
    const location = [userInfo.city, userInfo.country]
      .filter(Boolean)
      .join(", ");
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Location: ", bold: true }),
          new TextRun({ text: location }),
        ],
        spacing: { after: 40 },
      }),
    );
  }

  if (userInfo.linkedin) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "LinkedIn: ", bold: true }),
          new TextRun({ text: `linkedin.com/in/${userInfo.linkedin}` }),
        ],
        spacing: { after: 40 },
      }),
    );
  }

  if (userInfo.github) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "GitHub: ", bold: true }),
          new TextRun({ text: `github.com/${userInfo.github}` }),
        ],
        spacing: { after: 40 },
      }),
    );
  }

  if (userInfo.website) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Website: ", bold: true }),
          new TextRun({
            text: userInfo.website.replace(/^https?:\/\//, ""),
          }),
        ],
        spacing: { after: 200 },
      }),
    );
  } else {
    // Website yoksa boşluk ekle
    children.push(new Paragraph({ spacing: { after: 200 } }));
  }

  // PROFESSIONAL SUMMARY - ATS skorunu artırır
  if (userInfo.summary) {
    children.push(createSectionHeader("PROFESSIONAL SUMMARY"));
    children.push(
      new Paragraph({
        text: userInfo.summary,
        spacing: { before: 100, after: 200 },
        alignment: AlignmentType.JUSTIFIED,
      }),
    );
  }

  // PROFESSIONAL EXPERIENCE
  if (experiences && experiences.length > 0) {
    children.push(createSectionHeader("PROFESSIONAL EXPERIENCE"));

    experiences.forEach((exp) => {
      // Pozisyon - En önemli bilgi (ATS için önce pozisyon)
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.position,
              bold: true,
              size: 24, // 12pt
            }),
          ],
          spacing: { before: 150, after: 40 },
        }),
      );

      // Şirket adı
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.company,
            }),
          ],
          spacing: { after: 40 },
        }),
      );

      // Tarih ve Konum
      const dateText = `${formatDate(exp.startDate)} – ${
        exp.endDate ? formatDate(exp.endDate) : "Present"
      }`;
      const locationText = exp.location ? ` | ${exp.location}` : "";

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: dateText + locationText,
              italics: true,
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 80 },
        }),
      );

      // Açıklama (madde işaretli)
      if (exp.description) {
        children.push(...createBulletList(exp.description));
      }
    });
  }

  // EDUCATION
  if (educations && educations.length > 0) {
    children.push(createSectionHeader("EDUCATION"));

    educations.forEach((edu) => {
      // Derece ve Alan - En önemli bilgi
      const degreeText = edu.degree
        ? edu.fieldOfStudy
          ? `${edu.degree} in ${edu.fieldOfStudy}`
          : edu.degree
        : edu.fieldOfStudy || "";

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: degreeText,
              bold: true,
              size: 24, // 12pt
            }),
          ],
          spacing: { before: 150, after: 40 },
        }),
      );

      // Okul adı
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.school,
            }),
          ],
          spacing: { after: 40 },
        }),
      );

      // Tarih, GPA ve Konum
      const dateText = `${formatDate(edu.startDate)} – ${
        edu.endDate ? formatDate(edu.endDate) : "Present"
      }`;
      const gradeText = edu.grade ? ` | GPA: ${edu.grade}` : "";
      const locationText = edu.location ? ` | ${edu.location}` : "";

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: dateText + gradeText + locationText,
              italics: true,
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 100 },
        }),
      );
    });
  }

  // SKILLS - ATS için kritik
  const hasSkills =
    skillsState?.programmingLanguages?.length > 0 ||
    skillsState?.developmentAreas?.length > 0 ||
    skillsState?.versionControl?.length > 0 ||
    skillsState?.languages?.length > 0 ||
    (socialSkills && socialSkills.length > 0);

  if (hasSkills) {
    children.push(createSectionHeader("SKILLS"));

    if (skillsState.programmingLanguages?.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Programming Languages: ",
              bold: true,
            }),
            new TextRun({
              text: joinSkills(skillsState.programmingLanguages),
            }),
          ],
          spacing: { before: 100, after: 100 },
        }),
      );
    }

    if (skillsState.developmentAreas?.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Technologies & Frameworks: ",
              bold: true,
            }),
            new TextRun({
              text: joinSkills(skillsState.developmentAreas),
            }),
          ],
          spacing: { after: 100 },
        }),
      );
    }

    if (skillsState.versionControl?.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Tools & Platforms: ",
              bold: true,
            }),
            new TextRun({
              text: joinSkills(skillsState.versionControl),
            }),
          ],
          spacing: { after: 100 },
        }),
      );
    }

    // Soft Skills - ATS için önemli
    if (socialSkills && socialSkills.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Soft Skills: ",
              bold: true,
            }),
            new TextRun({
              text: joinSkills(socialSkills),
            }),
          ],
          spacing: { after: 100 },
        }),
      );
    }

    if (skillsState.languages?.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Languages: ",
              bold: true,
            }),
            new TextRun({
              text: joinSkills(skillsState.languages),
            }),
          ],
          spacing: { after: 100 },
        }),
      );
    }
  }

  // PROJECTS
  if (projects && projects.length > 0) {
    children.push(createSectionHeader("PROJECTS"));

    projects.forEach((proj) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: proj.name,
              bold: true,
            }),
            ...(proj.link
              ? [
                  new TextRun({
                    text: ` [${proj.link}]`,
                    size: 20,
                  }),
                ]
              : []),
          ],
          spacing: { before: 150, after: 50 },
        }),
      );

      if (proj.technologies) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Technologies: ",
                bold: true,
                italics: true,
                size: 20,
              }),
              new TextRun({
                text: proj.technologies,
                italics: true,
                size: 20,
              }),
            ],
            spacing: { after: 50 },
          }),
        );
      }

      if (proj.description) {
        children.push(...createBulletList(proj.description));
      }
    });
  }

  // CERTIFICATIONS
  if (certificates && certificates.length > 0) {
    children.push(createSectionHeader("CERTIFICATIONS"));

    certificates.forEach((cert) => {
      const certText = [];
      certText.push(cert.title);
      if (cert.issuer) certText.push(` — ${cert.issuer}`);
      if (cert.date) certText.push(` (${new Date(cert.date).getFullYear()})`);

      children.push(
        new Paragraph({
          text: certText.join(""),
          bullet: {
            level: 0,
          },
          spacing: { before: 50, after: 50 },
        }),
      );
    });
  }

  // Belgeyi oluştur
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 twips
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: children,
      },
    ],
  });

  // Blob oluştur ve indir
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fileName}.docx`);
};
