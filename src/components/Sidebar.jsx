export default function Sidebar({ isOpen, clearNotes }) {
  return (
  <div className={`sidebar ${isOpen ? "open" : ""}`}>
    <button className="delete-all-btn" onClick={clearNotes}>Delete All Notes</button>
  </div>
  )
}