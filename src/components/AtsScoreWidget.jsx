import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { calculateAtsScore } from "../utils/atsScorer";

const AtsScoreWidget = () => {
  const fullState = useSelector((state) => state);
  const [showTooltip, setShowTooltip] = useState(false);

  const { score, feedback } = useMemo(
    () => calculateAtsScore(fullState),
    [fullState],
  );

  const getColor = (s) => {
    if (s >= 90) return "#22c55e"; // Yeşil
    if (s >= 70) return "#eab308"; // Sarı
    return "#ef4444"; // Kırmızı
  };

  const currentColor = getColor(score);

  const styles = {
    // --- BURASI DEĞİŞTİ ---
    // Artık fixed/absolute değil, bulunduğu yerin kutusu.
    container: {
      position: "relative", // Tooltip buna göre konumlanacak
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "white",
      borderRadius: "6px", // Bootstrap butonlarına benzer ovallik
      border: "1px solid #dee2e6", // Bootstrap border rengi
      padding: "4px 12px", // Buton boyutlarına yakın padding
      cursor: "pointer",
      fontFamily: "'Segoe UI', sans-serif",
      transition: "all 0.2s ease",
      height: "38px", // Bootstrap standart buton yüksekliği (yaklaşık)
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    },
    // Daire boyutlarını butona sığacak şekilde küçülttük
    circleContainer: {
      position: "relative",
      width: "30px",
      height: "30px",
    },
    svg: {
      transform: "rotate(-90deg)",
      width: "100%",
      height: "100%",
    },
    circleBg: {
      fill: "none",
      stroke: "#e5e7eb",
      strokeWidth: "3",
    },
    circleProgress: {
      fill: "none",
      stroke: currentColor,
      strokeWidth: "3", // Çizgi kalınlığı
      strokeDasharray: "75", // 2 * PI * 12 (r=12)
      strokeDashoffset: 75 - (75 * score) / 100,
      transition: "stroke-dashoffset 0.8s ease, stroke 0.3s ease",
    },
    scoreText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "9px", // Font küçüldü
      fontWeight: "800",
      color: "#374151",
    },
    textCol: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      lineHeight: "1",
    },
    label: {
      fontSize: "11px",
      fontWeight: "700",
      color: "#374151",
    },
    statusText: {
      fontSize: "9px",
      color: "#6b7280",
      whiteSpace: "nowrap",
    },
    // Tooltip ayarları (Z-index artırıldı)
    tooltip: {
      position: "absolute",
      top: "45px", // Widget'ın hemen altı
      right: "0",
      width: "250px",
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      display: showTooltip ? "block" : "none",
      zIndex: 1050, // Bootstrap modal/dropdown seviyesine çıkardık
      textAlign: "left",
    },
    tooltipTitle: {
      fontSize: "12px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#111827",
      borderBottom: "1px solid #f3f4f6",
      paddingBottom: "4px",
    },
    feedbackItem: {
      fontSize: "11px",
      color: "#ef4444",
      marginBottom: "4px",
      display: "flex",
      alignItems: "start",
    },
  };

  return (
    <div
      style={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      // Bootstrap hover efekti için class ekleyebilirsin istersen: className="hover-shadow"
    >
      <div style={styles.textCol}>
        <span style={styles.label}>ATS SKORU</span>
        <span style={styles.statusText}>
          {score === 100 ? "Mükemmel" : "Geliştirilmeli"}
        </span>
      </div>

      <div style={styles.circleContainer}>
        <svg style={styles.svg}>
          {/* r değerini 12 yaptık (boyut 30px olduğu için) */}
          <circle cx="15" cy="15" r="12" style={styles.circleBg} />
          <circle cx="15" cy="15" r="12" style={styles.circleProgress} />
        </svg>
        <div style={styles.scoreText}>%{score}</div>
      </div>

      <div style={styles.tooltip}>
        <div style={styles.tooltipTitle}>Geliştirilecek Alanlar:</div>
        {feedback.length === 0 ? (
          <div
            style={{ fontSize: "11px", color: "#22c55e", fontWeight: "bold" }}
          >
            Mükemmel! ATS için hazır. 🎉
          </div>
        ) : (
          feedback.map((item, index) => (
            <div key={index} style={styles.feedbackItem}>
              <span style={{ marginRight: "6px" }}>⚠️</span>
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AtsScoreWidget;
