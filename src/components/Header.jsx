export default function Header({ toggleSidebar }) {
  return (
    <div className="header">
      <img src="./images/dryad.webp" className="icon-dryad" />
      <h1>Esper&apos;s World</h1>
      <img src="./images/dryad.webp" className="icon-dryad reverse" />
      <SidebarButton onClick={toggleSidebar} />
    </div>
  );
}

export function SidebarButton({ onClick }) {
  return (
    <button className="sidebar-button" onClick={onClick}>
      Menu ☰
    </button>
  );
}
