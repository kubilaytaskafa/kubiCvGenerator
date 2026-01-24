import React, { useState } from "react";
// react-to-print kaldırıldı, yerine html2pdf.js kullanacağız (importu dinamik yapacağız)
import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";

const DownloadButtons = ({ targetRef, fileName = "My_CV" }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // --- PDF İNDİRME İŞLEVİ (HTML2PDF - DİREKT İNDİRME) ---
  const handlePdfDownload = async () => {
    if (!targetRef.current) {
      alert("İçerik bulunamadı.");
      return;
    }

    setIsDownloading(true);

    // html2pdf.js'i sadece bu fonksiyon çalıştığında import ediyoruz (Performance için)
    const html2pdf = (await import("html2pdf.js")).default;

    const element = targetRef.current;

    // PDF Ayarları
    const opt = {
      margin: 0, // Kenar boşluklarını sıfırlıyoruz (zaten tasarımda padding var)
      filename: `${fileName}.pdf`,
      image: { type: "jpeg", quality: 0.98 }, // Resim kalitesi
      html2canvas: {
        scale: 2, // Yüksek çözünürlük için scale artırıldı
        useCORS: true, // Resimlerin yüklenmesi için gerekli
        logging: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // PDF'i oluştur ve indir
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsDownloading(false);
        // İndirme bittiğinde opsiyonel alert
        // alert("PDF İndirildi!");
      })
      .catch((err) => {
        console.error(err);
        setIsDownloading(false);
        alert("PDF oluşturulurken bir hata oluştu.");
      });
  };

  // --- DOCX (WORD) İNDİRME İŞLEVİ ---
  const handleDocxDownload = async () => {
    if (!targetRef.current) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${fileName}</title>
          <style>
             body { font-family: 'Times New Roman', serif; }
             ul { list-style-type: disc; padding-left: 20px; }
             li { margin-bottom: 5px; }
             /* Linklerin mavi ve altı çizili olmasını engelle (Word için) */
             a { text-decoration: none; color: black; }
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
        margins: { top: 720, right: 720, bottom: 720, left: 720 },
      });
      saveAs(data, `${fileName}.docx`);
    } catch (error) {
      console.error("Word indirme hatası:", error);
      alert("Word dosyası oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="d-flex gap-2 justify-content-end mb-3 no-print">
      {/* PDF BUTONU */}
      <button
        onClick={handlePdfDownload}
        disabled={isDownloading}
        className="btn btn-danger d-flex align-items-center gap-2 shadow-sm"
      >
        {isDownloading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            İndiriliyor...
          </>
        ) : (
          <>
            <i className="bi bi-file-earmark-pdf-fill"></i> PDF İndir
          </>
        )}
      </button>

      {/* WORD BUTONU */}
      <button
        onClick={handleDocxDownload}
        className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
      >
        <i className="bi bi-file-earmark-word-fill"></i> Word İndir
      </button>

      {/* Yazdırma Stili */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default DownloadButtons;
