import React from "react";
import { Link } from "react-router-dom";
import {
  FaFilePdf,
  FaMagic,
  FaCheckCircle,
  FaRobot,
  FaListAlt,
  FaLightbulb,
} from "react-icons/fa";
import SEO from "../components/SEO";

const Home = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://kubicvgenerator.com/#organization",
      name: "kubiCvGenerator",
      url: "https://kubicvgenerator.com",
      logo: "https://kubicvgenerator.com/logo.png", // Varsayılan logo
      description: "Profesyonel ve ATS uyumlu CV hazırlama aracı.",
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://kubicvgenerator.com/#website",
      url: "https://kubicvgenerator.com",
      name: "kubiCvGenerator",
      description:
        "Dakikalar içinde profesyonel ve ATS uyumlu CV'nizi oluşturun.",
      publisher: {
        "@id": "https://kubicvgenerator.com/#organization",
      },
      inLanguage: "tr-TR",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Anasayfa",
          item: "https://kubicvgenerator.com",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Hizmetler",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Product",
            name: "Standart CV Oluşturucu",
            description: "Hızlı ve kolay CV oluştur.",
            url: "https://kubicvgenerator.com/cv",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Product",
            name: "ATS Dostu CV Oluşturucu",
            description: "ATS sistemleri için optimize edilmiş CV oluştur.",
            url: "https://kubicvgenerator.com/cv-ats",
          },
        },
      ],
    },
  ];

  return (
    <div className="home-container">
      <SEO
        title="kubiCvGenerator - Ücretsiz & ATS Uyumlu Online CV Hazırlama"
        description="Dakikalar içinde profesyonel ve ATS uyumlu CV'nizi ücretsiz oluşturun. Üyelik gerektirmez, PDF olarak indirin. İşe alım sistemlerine (ATS) tam uyumlu şablonlar."
        canonical="https://kubicvgenerator.com/"
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <section className="bg-light py-5 mb-5 text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                kubiCvGenerator - Profesyonel CV Hazırla
              </h1>
              <p className="lead text-muted mb-4">
                Dakikalar içinde profesyonel ve ATS uyumlu CV'nizi oluşturun.
                Ücretsiz ve üyelik gerektirmez.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link
                  to="/cv"
                  className="btn btn-primary btn-lg px-4"
                  title="Hemen CV Oluştur"
                >
                  Hemen CV Oluştur
                </Link>
                <Link
                  to="/cv-ats"
                  className="btn btn-outline-dark btn-lg px-4"
                  title="ATS Dostu CV Oluştur"
                >
                  ATS Dostu Mod
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Neden Bizi Seçmelisiniz?</h2>
          <p className="text-muted">
            Kariyerinizde bir adım öne geçmeniz için ihtiyacınız olan her şey.
          </p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center p-4">
              <div className="text-primary mb-3">
                <FaMagic size={40} />
              </div>
              <h3 className="card-title h4 fw-bold">Kolay Kullanım</h3>
              <p className="card-text text-muted">
                Karmaşık formlarla uğraşmayın. Kullanıcı dostu arayüzümüzle
                bilgilerinizi girin ve anında önizleyin.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center p-4">
              <div className="text-success mb-3">
                <FaCheckCircle size={40} />
              </div>
              <h3 className="card-title h4 fw-bold">ATS Uyumlu</h3>
              <p className="card-text text-muted">
                İşe alım sistemleri (ATS) tarafından kolayca okunabilen
                formatlarla şansınızı artırın.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center p-4">
              <div className="text-danger mb-3">
                <FaFilePdf size={40} />
              </div>
              <h3 className="card-title h4 fw-bold">PDF İndir</h3>
              <p className="card-text text-muted">
                CV'nizi yüksek kalitede PDF formatında ücretsiz olarak indirin
                ve başvurularınızda kullanın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- YENİ EKLENEN BÖLÜM: BİLGİ KÖŞESİ --- */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Profesyonel CV Rehberi</h2>
            <p className="text-muted">
              Başvurularınızın neden reddedildiğini hiç düşündünüz mü? İşte
              bilmeniz gerekenler.
            </p>
          </div>

          <div className="row g-5">
            {/* 1. ATS Nedir? */}
            <div className="col-lg-6">
              <div className="d-flex align-items-start">
                <div className="flex-shrink-0 text-dark me-3">
                  <FaRobot size={32} />
                </div>
                <div>
                  <h3 className="h4 fw-bold">ATS Nedir ve Neden Önemlidir?</h3>
                  <p className="text-muted">
                    ATS (Aday Takip Sistemi), iş başvurularını filtrelemek için
                    kullanılan bir yazılımdır. Büyük şirketlerin %90'ı, CV'leri
                    insan gözü görmeden önce bu robotlara okutur. Eğer CV'niz
                    ATS formatına uygun değilse, ne kadar yetenekli olursanız
                    olun elenme riskiniz vardır.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. ATS Uyumlu Tasarım */}
            <div className="col-lg-6">
              <div className="d-flex align-items-start">
                <div className="flex-shrink-0 text-dark me-3">
                  <FaListAlt size={32} />
                </div>
                <div>
                  <h3 className="h4 fw-bold">ATS Uyumlu CV Nasıl Olmalı?</h3>
                  <ul className="list-unstyled text-muted">
                    <li className="mb-2">
                      <strong>Sade ve Tek Sütun:</strong>
                      ATS sistemleri çok sütunlu, grafik ve ikon içeren
                      tasarımları yanlış okuyabilir. Tek sütunlu ve düz metin
                      yapısı en güvenlisidir.
                    </li>
                    <li className="mb-2">
                      <strong>Standart Fontlar:</strong>
                      Arial, Calibri, Times New Roman gibi sistem fontları
                      tercih edilmelidir. Özel fontlar bazı ATS’lerde
                      bozulabilir.
                    </li>
                    <li className="mb-2">
                      <strong>Anahtar Kelime Uyumu:</strong>
                      İş ilanında geçen teknik beceriler ve pozisyon terimleri
                      CV içinde birebir kullanılmalıdır (örn: React, Node.js,
                      SQL).
                    </li>
                    <li className="mb-2">
                      <strong>Dosya Formatı:</strong>
                      ATS başvuruları için en güvenli format DOCX’tir. PDF
                      yalnızca sade ve metin tabanlı hazırlanmışsa önerilir.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-4 opacity-25" />

            {/* 3. Genel İpuçları */}
            <div className="col-12">
              <div className="card border-0 shadow-sm bg-white p-4">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0 text-warning me-3">
                    <FaLightbulb size={32} />
                  </div>
                  <div>
                    <h3 className="h4 fw-bold">
                      Mükemmel Bir CV İçin Altın Kurallar
                    </h3>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <p className="text-muted mb-2">
                          <strong>1. Ters Kronolojik Sıra:</strong>{" "}
                          Deneyimlerinizi en yeniden en eskiye doğru sıralayın.
                        </p>
                        <p className="text-muted mb-2">
                          <strong>2. Dosya Formatı Stratejisi:</strong> ATS
                          sistemleri için DOCX formatı en güvenli seçenektir.
                          Recruiter veya e-posta başvurularında ise sade
                          hazırlanmış PDF tercih edilebilir.
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="text-muted mb-2">
                          <strong>3. İletişim Bilgileri:</strong> Telefon ve
                          E-posta adresinizin güncel olduğundan emin olun.
                          Fotoğraf (Türkiye standartlarında) opsiyoneldir ancak
                          ATS için fotoğrafsız olması daha iyidir.
                        </p>
                        <p className="text-muted mb-0">
                          <strong>4. Sonuç Odaklı Olun:</strong> Sadece
                          görevlerinizi değil, başardığınız somut sonuçları
                          (örn: "%20 verimlilik artışı") yazın.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 text-center container">
        <h2 className="fw-bold mb-3">Kariyerine Bugün Yön Ver</h2>
        <div className="mb-4">
          {/* Internal Links Block as requested */}
          <div className="d-flex justify-content-center gap-3 text-muted small">
            <span>Hızlı Erişim:</span>
            <Link to="/cv" className="text-decoration-none text-muted">
              Standart CV
            </Link>
            <span>|</span>
            <Link to="/cv-ats" className="text-decoration-none text-muted">
              ATS Uyumlu CV
            </Link>
          </div>
        </div>
        <p className="text-muted mb-4">
          kubiCvGenerator, CV’nizi hem ATS için optimize edilmiş DOCX hem de
          insan okuyucu için profesyonel PDF olarak üretir. ATS uyumlu ve
          profesyonel CV'nizi hazırlamak sadece birkaç dakikanızı alacak.
        </p>
        <Link
          to="/cv-ats"
          className="btn btn-dark btn-lg px-5 shadow"
          title="Ücretsiz Başla"
        >
          Ücretsiz Başla
        </Link>
      </section>
    </div>
  );
};

export default Home;
