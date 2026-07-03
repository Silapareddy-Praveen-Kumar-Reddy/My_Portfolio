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
      case "about":     return <AboutTab     key="about" />;
      case "resume":    return <ResumeTab    key="resume" />;
      case "portfolio": return <PortfolioTab key="portfolio" />;
      case "contact":   return <ContactTab   key="contact" />;
    }
  };

  return (
    <div className="portfolio-wrapper">
      <div className="portfolio-layout">

        {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
        <aside className="sidebar-area">
          <Sidebar />
        </aside>

        {/*
          ── TABLET-ONLY NAV ROW ───────────────────────────────
          Shown only on 701–900px as its own separator row
          between sidebar and the content card.
          Hidden on desktop (nav is inside right-col) and mobile (fixed bottom).
        */}
        <div className="tablet-nav-row">
          <TabNav active={activeTab} onChange={setActiveTab} />
        </div>

        {/*
          ── RIGHT COLUMN ──────────────────────────────────────
          On desktop this is ONE glass card containing:
            • desktop-nav-row  (top-right, inside card)
            • content panel    (below)
          On tablet/mobile the desktop-nav-row is hidden.
        */}
        <div className="right-col glass-card">
          {/* Desktop nav: top-right inside the card */}
          <div className="desktop-nav-row">
            <TabNav active={activeTab} onChange={setActiveTab} />
          </div>

          {/* Page content */}
          <main
            className="content-inner"
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
            {renderTab()}
          </main>
        </div>

      </div>

      {/*
        ── MOBILE FIXED BOTTOM NAV ───────────────────────────
        Only visible on ≤700px as a fixed bar at the bottom of the screen.
      */}
      <nav className="mobile-bottom-nav" aria-label="Main navigation">
        <TabNav active={activeTab} onChange={setActiveTab} />
      </nav>
    </div>
  );
};

export default Index;
