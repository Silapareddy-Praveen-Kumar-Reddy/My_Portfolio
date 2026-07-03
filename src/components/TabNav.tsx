export type Tab = "about" | "resume" | "portfolio" | "contact";

const TABS: { id: Tab; label: string }[] = [
  { id: "about",     label: "About" },
  { id: "resume",    label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact",   label: "Contact" },
];

interface TabNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const TabNav = ({ active, onChange }: TabNavProps) => (
  <nav className="tab-nav-bar" role="tablist" aria-label="Main navigation">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        role="tab"
        className={`tab-btn${active === tab.id ? " active" : ""}`}
        onClick={() => onChange(tab.id)}
        aria-selected={active === tab.id}
        aria-controls={`panel-${tab.id}`}
        id={`tab-${tab.id}`}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);

export default TabNav;
