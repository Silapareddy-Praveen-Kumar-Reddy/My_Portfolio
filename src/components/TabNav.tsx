type Tab = "about" | "resume" | "portfolio" | "contact";

interface TabNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

const TabNav = ({ active, onChange }: TabNavProps) => {
  return (
    <nav
      role="tablist"
      aria-label="Portfolio sections"
      style={{
        display: "flex",
        gap: 4,
        background: "#212429",
        borderRadius: 16,
        padding: "6px",
        marginBottom: 28,
        flexWrap: "wrap",
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              minWidth: 80,
              padding: "9px 16px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.88rem",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#1a1a1f" : "#9a9a9a",
              background: isActive
                ? "#ffb100"
                : "transparent",
              transition: "all 0.25s ease",
              letterSpacing: "0.01em",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

export default TabNav;
export type { Tab };
