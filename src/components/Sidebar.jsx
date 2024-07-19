export default function Sidebar({ isOpen, clearNotes, searchResults, setSearchResults }) {

  const handleChange = (e) => {
    setSearchResults(e.target.value);
  }

  return (
  <div className={`sidebar ${isOpen ? "open" : ""}`}>
    <input className="search-bar" onChange={handleChange} value={searchResults} placeholder="Search Notes..." />
    <button className="delete-all-btn" onClick={clearNotes}>Delete All Notes</button>
  </div>
  )
}