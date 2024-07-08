import { useState } from "react";

export default function NotesContainer({ children }) {
  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <hr />
      <Note />
      {children}
    </div>
  );
}

function Note() {
  const [note, setNote] = useState({ title: "Note", note: "" });
  const [isVisible, setIsVisible] = useState({ title: true, note: false });

  const handleChange = (e) => {
    if (e.target.className === "title-input") {
      setNote({ ...note, title: e.target.value });
    } else {
      setNote({ ...note, note: e.target.value });
    }
  };

  const handleEnterKey = (field) => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        toggleVisibility(field);
      }
    });
  };
  
  const toggleVisibility = (field) => {
    setIsVisible({ ...isVisible, [field]: !isVisible[field] });
  };

  return (
    <div className="note">
      {isVisible.title ? (
        <p className="title" onClick={() => toggleVisibility('title')}>
          {note.title}
        </p>
      ) : (
        <input
          type="text"
          value={note.title}
          className="title-input"
          name="title"
          onChange={handleChange}
          onKeyDown={() => handleEnterKey('title')}
        />
      )}

      {isVisible.note ? (
        <p className="note" onClick={() => toggleVisibility("note")}>
          {note.note}
        </p>
      ) : (
        <input
          type="text"
          value={note.note}
          name="note"
          className="note-input"
          placeholder="Write your thoughts here..."
          onChange={handleChange}
          onKeyDown={() => handleEnterKey("note")}
        ></input>
      )}
    </div>
  );
}
