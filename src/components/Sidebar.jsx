export default function Sidebar({ isOpen }) {
  return <div className={`sidebar ${isOpen ? "open" : ""}`}></div>;
}