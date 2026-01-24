import React, { useRef } from "react";
import { useSelector } from "react-redux";
import UserInfo from "../components/UserInfo";
import ExperiencesPart from "../components/ExperiencesPart";
import EducationPart from "../components/EducationPart";
import SkillsPart from "../components/SkillsPart";
import SocialSkills from "../components/SocialSkills";
import ProjectsPart from "../components/ProjectsPart";
import CertificatePart from "../components/CertificatePart";
import CvAtsScreen from "./CvAtsScreen";
import DownloadButtons from "../components/DownloadButtons";

const CvAts = () => {
  // 1. Yazdırılacak alan referansı
  const atsRef = useRef();

  // 2. Dosya adı için kullanıcı bilgilerini çek
  const userInfo = useSelector((state) => state.userInfo);

  // 3. Dinamik Dosya Adı Oluşturma (Boşlukları alt çizgi yap)
  const fileName =
    userInfo.name && userInfo.lastName
      ? `${userInfo.name}_${userInfo.lastName}_ATS_CV`.replace(/\s+/g, "_")
      : "ATS_Uyumlu_CV";

  return (
    <section className="container-fluid bg-light min-vh-100 py-4">
      <div className="row g-4 justify-content-center">
        {/* --- SOL PANEL: VERİ GİRİŞİ (INPUTS) --- */}
        <div className="col-12 col-lg-5 col-xl-4 order-1">
          <div className="d-flex flex-column gap-5 pb-5">
            {/* 1. Header & İletişim */}
            <section id="user-info">
              <UserInfo />
            </section>
            <hr className="border-secondary opacity-25 mx-2 my-0" />

            {/* 2. Deneyim */}
            <section id="experiences">
              <ExperiencesPart />
            </section>
            <hr className="border-secondary opacity-25 mx-2 my-0" />

            {/* 3. Eğitim */}
            <section id="education">
              <EducationPart />
            </section>
            <hr className="border-secondary opacity-25 mx-2 my-0" />

            {/* 4. Teknik Beceriler */}
            <section id="skills">
              <SkillsPart />
            </section>
            <hr className="border-secondary opacity-25 mx-2 my-0" />

            {/* 5. Sosyal Beceriler */}
            <section id="social-skills">
              <SocialSkills />
            </section>
            <hr className="border-secondary opacity-25 mx-2 my-0" />

            {/* 6. Projeler */}
            <section id="projects">
              <ProjectsPart />
            </section>
            <hr className="border-secondary opacity-25 mx-2 my-0" />

            {/* 7. Sertifikalar */}
            <section id="certificates">
              <CertificatePart />
            </section>
          </div>
        </div>

        {/* --- SAĞ PANEL: CV ÖNİZLEME (PREVIEW) --- */}
        <div className="col-12 col-lg-7 col-xl-8 order-2">
          <div className="sticky-lg-top" style={{ top: "20px", zIndex: 10 }}>
            {/* --- İNDİRME BUTONLARI (YENİ EKLENDİ) --- */}
            {/* Ref'i ve dinamik dosya adını gönderiyoruz */}
            <DownloadButtons targetRef={atsRef} fileName={fileName} />

            {/* CV Kapsayıcısı */}
            <div className="shadow-lg rounded overflow-hidden border border-secondary border-opacity-10 bg-white">
              {/* Önizleme Başlık Çubuğu */}
              <div className="bg-dark text-white py-2 text-center small fw-bold letter-spacing-1 d-flex justify-content-between px-3 align-items-center">
                <span>
                  <i className="bi bi-robot me-2"></i>ATS DOSTU ÖNİZLEME
                </span>
              </div>

              {/* Gerçek CV Componenti */}
              <div
                className="bg-white overflow-auto"
                style={{ maxHeight: "calc(100vh - 120px)" }}
              >
                <div className="p-1 p-md-3 d-flex justify-content-center">
                  {/* --- YAZDIRILACAK ALAN BAŞLANGICI --- */}
                  {/* Ref buraya bağlandı */}
                  <div ref={atsRef}>
                    <CvAtsScreen />
                  </div>
                  {/* --- YAZDIRILACAK ALAN BİTİŞİ --- */}
                </div>
              </div>
            </div>

            {/* Mobil Bilgilendirme */}
            <div className="d-lg-none text-center mt-3 text-muted small fst-italic">
              <i className="bi bi-arrow-up-short"></i> Yukarıdaki formları
              doldurdukça önizleme güncellenir.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CvAts;
