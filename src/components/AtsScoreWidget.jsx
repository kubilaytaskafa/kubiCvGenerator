import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { calculateAtsScore } from "../utils/atsScorer";

const AtsScoreWidget = () => {
  const fullState = useSelector((state) => state);
  const [showDetails, setShowDetails] = useState(false);

  const { score, details, summary } = useMemo(
    () => calculateAtsScore(fullState),
    [fullState],
  );

  const styles = {
    // Kompakt widget butonu
    widget: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "white",
      borderRadius: "6px",
      border: `2px solid ${summary.color}`,
      padding: "6px 14px",
      cursor: "pointer",
      fontFamily: "'Segoe UI', sans-serif",
      transition: "all 0.2s ease",
      height: "38px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    widgetHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    },
    // Skor göstergesi
    scoreCircle: {
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: `conic-gradient(${summary.color} ${score * 3.6}deg, #e5e7eb 0deg)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      fontWeight: "bold",
      color: "#fff",
      position: "relative",
    },
    scoreInner: {
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: summary.color,
      fontSize: "9px",
      fontWeight: "800",
    },
    textCol: {
      display: "flex",
      flexDirection: "column",
      lineHeight: "1.2",
    },
    label: {
      fontSize: "11px",
      fontWeight: "700",
      color: "#374151",
    },
    statusText: {
      fontSize: "9px",
      color: summary.color,
      fontWeight: "600",
    },
    // Detaylı analiz modal
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: showDetails ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "20px",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "12px",
      maxWidth: "700px",
      width: "100%",
      maxHeight: "90vh",
      overflow: "auto",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    modalHeader: {
      padding: "24px",
      borderBottom: "2px solid #f3f4f6",
      position: "sticky",
      top: 0,
      backgroundColor: "white",
      zIndex: 1,
      borderRadius: "12px 12px 0 0",
    },
    modalTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    scoreDisplay: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginTop: "16px",
      padding: "16px",
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
      border: `2px solid ${summary.color}`,
    },
    bigScore: {
      fontSize: "48px",
      fontWeight: "bold",
      color: summary.color,
    },
    scoreInfo: {
      flex: 1,
    },
    scoreLevel: {
      fontSize: "18px",
      fontWeight: "bold",
      color: summary.color,
      marginBottom: "4px",
    },
    scoreMessage: {
      fontSize: "14px",
      color: "#6b7280",
      lineHeight: "1.5",
    },
    modalBody: {
      padding: "24px",
    },
    section: {
      marginBottom: "24px",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    itemCard: {
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
      padding: "12px 16px",
      marginBottom: "8px",
      borderLeft: "4px solid",
      transition: "all 0.2s ease",
    },
    itemCardCritical: {
      borderLeftColor: "#ef4444",
      backgroundColor: "#fef2f2",
    },
    itemCardImportant: {
      borderLeftColor: "#f97316",
      backgroundColor: "#fff7ed",
    },
    itemCardOptional: {
      borderLeftColor: "#3b82f6",
      backgroundColor: "#eff6ff",
    },
    itemHeader: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "4px",
    },
    itemIcon: {
      fontSize: "18px",
    },
    itemTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#111827",
    },
    itemDescription: {
      fontSize: "13px",
      color: "#6b7280",
      marginLeft: "26px",
      lineHeight: "1.5",
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      backgroundColor: "transparent",
      border: "none",
      fontSize: "28px",
      cursor: "pointer",
      color: "#9ca3af",
      transition: "color 0.2s",
      padding: "4px 8px",
      lineHeight: "1",
    },
    emptyState: {
      textAlign: "center",
      padding: "32px",
      color: "#22c55e",
    },
    emptyIcon: {
      fontSize: "48px",
      marginBottom: "16px",
    },
    emptyText: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#22c55e",
    },
  };

  const renderItems = (items, type) => {
    if (!items || items.length === 0) return null;

    const cardStyle = {
      ...styles.itemCard,
      ...(type === "critical" ? styles.itemCardCritical : {}),
      ...(type === "important" ? styles.itemCardImportant : {}),
      ...(type === "optional" ? styles.itemCardOptional : {}),
    };

    return items.map((item, index) => (
      <div key={index} style={cardStyle}>
        <div style={styles.itemHeader}>
          <span style={styles.itemIcon}>{item.icon}</span>
          <span style={styles.itemTitle}>{item.title}</span>
        </div>
        <div style={styles.itemDescription}>{item.description}</div>
      </div>
    ));
  };

  const totalIssues =
    (details.critical?.length || 0) +
    (details.important?.length || 0) +
    (details.optional?.length || 0);

  return (
    <>
      {/* Kompakt Widget */}
      <div
        style={styles.widget}
        onClick={() => setShowDetails(true)}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, styles.widgetHover);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
      >
        <div style={styles.textCol}>
          <span style={styles.label}>ATS SKORU</span>
          <span style={styles.statusText}>{summary.level}</span>
        </div>

        <div style={styles.scoreCircle}>
          <div style={styles.scoreInner}>{score}</div>
        </div>
      </div>

      {/* Detaylı Analiz Modal */}
      <div style={styles.modal} onClick={() => setShowDetails(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <button
              style={styles.closeButton}
              onClick={() => setShowDetails(false)}
              onMouseEnter={(e) => (e.target.style.color = "#374151")}
              onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
            >
              ×
            </button>

            <div style={styles.modalTitle}>
              <span>{summary.emoji}</span>
              <span>ATS Uyumluluk Analizi</span>
            </div>

            <div style={styles.scoreDisplay}>
              <div style={styles.bigScore}>{score}</div>
              <div style={styles.scoreInfo}>
                <div style={styles.scoreLevel}>{summary.level}</div>
                <div style={styles.scoreMessage}>{summary.message}</div>
              </div>
            </div>
          </div>

          <div style={styles.modalBody}>
            {totalIssues === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🎉</div>
                <div style={styles.emptyText}>
                  Tebrikler! CV'niz %100 ATS uyumlu!
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginTop: "8px",
                  }}
                >
                  İş başvurularınızda başarılar dileriz!
                </div>
              </div>
            ) : (
              <>
                {/* Kritik Eksiklikler */}
                {details.critical && details.critical.length > 0 && (
                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>
                      <span>🚨</span>
                      <span>
                        Kritik Eksiklikler ({details.critical.length})
                      </span>
                    </div>
                    {renderItems(details.critical, "critical")}
                  </div>
                )}

                {/* Önemli Öneriler */}
                {details.important && details.important.length > 0 && (
                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>
                      <span>⚠️</span>
                      <span>Önemli Öneriler ({details.important.length})</span>
                    </div>
                    {renderItems(details.important, "important")}
                  </div>
                )}

                {/* İsteğe Bağlı İyileştirmeler */}
                {details.optional && details.optional.length > 0 && (
                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>
                      <span>💡</span>
                      <span>
                        İsteğe Bağlı İyileştirmeler ({details.optional.length})
                      </span>
                    </div>
                    {renderItems(details.optional, "optional")}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AtsScoreWidget;
