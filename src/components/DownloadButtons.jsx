import React, { useState } from "react";
import { generateAtsDocx } from "../utils/atsDocxGenerator";
import AtsScoreWidget from "../components/AtsScoreWidget"; // Widget importu
import { useSelector } from "react-redux";

const DownloadButtons = ({ targetRef, fileName = "My_CV" }) => {
  // Redux state'lerini al (DOCX için gerekli)
  const userInfo = useSelector((state) => state.userInfo);
  const { experiences } = useSelector((state) => state.experiences);
  const { educations } = useSelector((state) => state.educations);
  const skillsState = useSelector((state) => state.skills);
  const { socialSkills } = useSelector((state) => state.socialSkills);
  const { projects } = useSelector((state) => state.projects);
  const { certificates } = useSelector((state) => state.certificates);

  const [isDownloading, setIsDownloading] = useState(false);

  // --- PDF İNDİRME İŞLEVİ ---
  const handlePdfDownload = async () => {
    if (!targetRef.current) {
      alert("İçerik bulunamadı.");
      return;
    }

    setIsDownloading(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = targetRef.current;

      const opt = {
        margin: 0,
        filename: `${fileName}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false, // Konsol kirliliğini azalttım
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      // Başarılı olursa buraya düşer
    } catch (err) {
      console.error(err);
      alert("PDF oluşturulurken bir hata oluştu.");
    } finally {
      setIsDownloading(false);
    }
  };

  // --- DOCX İNDİRME İŞLEVİ (ATS UYUMLU) ---
  const handleDocxDownload = async () => {
    try {
      setIsDownloading(true);
      await generateAtsDocx(
        {
          userInfo,
          experiences,
          educations,
          skillsState,
          socialSkills,
          projects,
          certificates,
        },
        fileName,
      );
    } catch (error) {
      console.error("Word indirme hatası:", error);
      alert("Word dosyası oluşturulurken bir hata oluştu.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    // 'align-items-center' ekledik ki widget ve butonlar aynı hizada dursun
    <div className="d-flex gap-2 justify-content-end align-items-center mb-3 no-print">
      {/* ATS SKOR WIDGET: Artık flex flow içinde bir kutu */}
      <AtsScoreWidget />

      {/* PDF BUTONU */}
      <button
        onClick={handlePdfDownload}
        disabled={isDownloading}
        className="btn btn-danger d-flex align-items-center gap-2 shadow-sm"
        style={{ height: "38px" }} // Yükseklik sabitleme (opsiyonel, widget ile uyum için)
      >
        {isDownloading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Processing...
          </>
        ) : (
          <>
            <i className="bi bi-file-earmark-pdf-fill"></i> PDF
          </>
        )}
      </button>

      {/* WORD BUTONU */}
      <button
        onClick={handleDocxDownload}
        disabled={isDownloading}
        className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
        style={{ height: "38px" }}
      >
        {isDownloading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Processing...
          </>
        ) : (
          <>
            <i className="bi bi-file-earmark-word-fill"></i> Word
          </>
        )}
      </button>

      <style>{`
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default DownloadButtons;
