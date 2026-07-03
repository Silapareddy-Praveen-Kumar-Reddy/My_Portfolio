import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TabNav, { Tab } from "@/components/TabNav";
import AboutTab from "@/components/tabs/AboutTab";
import ResumeTab from "@/components/tabs/ResumeTab";
import PortfolioTab from "@/components/tabs/PortfolioTab";
import ContactTab from "@/components/tabs/ContactTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("about");

  const renderTab = () => {
    switch (activeTab) {
      case "about":
        return <AboutTab key="about" />;
      case "resume":
        return <ResumeTab key="resume" />;
      case "portfolio":
        return <PortfolioTab key="portfolio" />;
      case "contact":
        return <ContactTab key="contact" />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1f",
        padding: "clamp(16px, 4vw, 40px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "min(300px, 100%) 1fr",
          gridTemplateAreas: '"sidebar main"',
          gap: 24,
          width: "100%",
          maxWidth: 1100,
          alignItems: "start",
        }}
        className="portfolio-layout"
      >
        {/* LEFT SIDEBAR — sticky */}
        <div
          style={{
            gridArea: "sidebar",
            position: "sticky",
            top: "clamp(16px, 4vw, 40px)",
          }}
        >
          <Sidebar />
        </div>

        {/* RIGHT MAIN PANEL */}
        <main
          style={{
            gridArea: "main",
            background: "#212429",
            borderRadius: 20,
            padding: "clamp(18px, 3vw, 32px)",
            minHeight: "calc(100vh - 80px)",
          }}
        >
          <TabNav active={activeTab} onChange={setActiveTab} />
          {renderTab()}
        </main>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .portfolio-layout {
            grid-template-columns: 1fr !important;
            grid-template-areas: 'sidebar' 'main' !important;
          }
          .portfolio-layout > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
