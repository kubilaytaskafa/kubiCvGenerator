import React, { useState } from "react";
// react-to-print yerine html2pdf.js kullanılıyor
import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";
import AtsScoreWidget from "../components/AtsScoreWidget"; // Widget importu

const DownloadButtons = ({ targetRef, fileName = "My_CV" }) => {
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

  // --- DOCX İNDİRME İŞLEVİ ---
  const handleDocxDownload = async () => {
    if (!targetRef.current) return;

    // Word için basit bir CSS sıfırlama ve Times New Roman zorlaması
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${fileName}</title>
          <style>
             body { font-family: 'Times New Roman', serif; color: #000; }
             h1, h2, h3, h4 { font-weight: bold; }
             ul { list-style-type: disc; margin-left: 20px; }
             li { margin-bottom: 5px; }
             a { text-decoration: none; color: black; }
             table { width: 100%; border-collapse: collapse; }
          </style>
        </head>
        <body>
          ${targetRef.current.outerHTML}
        </body>
      </html>
    `;

    try {
      const data = await asBlob(htmlContent, {
        orientation: "portrait",
        margins: { top: 720, right: 720, bottom: 720, left: 720 }, // Word marginleri (twip)
      });
      saveAs(data, `${fileName}.docx`);
    } catch (error) {
      console.error("Word indirme hatası:", error);
      alert("Word dosyası oluşturulurken bir hata oluştu.");
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
        className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
        style={{ height: "38px" }}
      >
        <i className="bi bi-file-earmark-word-fill"></i> Word
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
