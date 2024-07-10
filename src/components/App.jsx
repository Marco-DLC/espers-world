import { useState } from "react";
import "../App.css";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import NotesContainer from "./NotesContainer.jsx";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allNotes, setAllNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    return savedNotes || [{ id: 0, title: "Title", note: "" }];
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const clearNotes = () => {
    if (confirm("Are you sure? All your notes will be deleted permanently!")) {
      localStorage.removeItem("notes");
      setAllNotes([]);
    } else {
      alert("Deletion cancelled");
    }
  };

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} clearNotes={clearNotes} />
      <NotesContainer allNotes={allNotes} setAllNotes={setAllNotes} />
    </div>
  );
}

export default App;
