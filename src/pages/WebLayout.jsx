import React, { useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const WebLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // 1. Fragment yerine 'div' kullanıldı.
    // min-vh-100: Sayfanın en az ekran boyutu kadar olmasını sağlar.
    <>
      {/* Header en üstte kalır */}
      <Header />

      {/* 2. flex-grow-1: Header ve Footer'dan arta kalan TÜM alanı main'e verir.
         Böylece içerik az olsa bile Footer en alta yapışır, Main genişler.
      */}
      <main className="w-100 container p-5">
        {/* İsteğe bağlı: İçeriği ortalamak ve kenar boşluğu vermek için Container */}
        <Outlet />
      </main>

      {/* Footer en altta kalır */}
      <Footer />
    </>
  );
};

export default WebLayout;
