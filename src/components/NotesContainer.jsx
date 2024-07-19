import React, { Component, useEffect } from "react";

export default function NotesContainer({
  allNotes,
  setAllNotes,
  searchResults,
}) {
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(allNotes));
  }, [allNotes]);

  const addNote = () => {
    const newId = allNotes.length ? allNotes[allNotes.length - 1].id + 1 : 0;
    const newNote = { id: newId, title: "Title", note: "" };

    setAllNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const removeNote = (id) => {
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNote = (id, updatedNote) => {
    setAllNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note
      )
    );
  };

  const formatString = (string) => {
    return string
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, "");
  };

  const filterBySearch = (note) => {
    const results = formatString(searchResults);
    const title = formatString(note.title);
    const content = formatString(note.note);

    if (
      title.includes(results) || content.includes(results)) {
      return note;
    }
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <hr />
      {allNotes.filter(filterBySearch).map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          note={note.note}
          removeNote={removeNote}
          updateNote={updateNote}
        />
      ))}
      <NewNoteButton onClick={addNote} />
    </div>
  );
}

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      note: props.note,
      isVisible: {
        title: true,
        note: true,
      },
    };

    this.titleInputRef = React.createRef();
    this.noteInputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.focusOnInput = this.focusOnInput.bind(this);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleChange(e) {
    if (e.target.className === "title-input") {
      this.setState((prevState) => ({
        ...prevState,
        title: e.target.value,
      }));
      this.props.updateNote(this.props.id, { title: e.target.value });
    } else {
      this.setState((prevState) => ({
        ...prevState,
        note: e.target.value,
      }));
      this.props.updateNote(this.props.id, { note: e.target.value });
    }
  }

  handleEnterKey(field) {
    return (e) => {
      if (e.key === "Enter") {
        this.toggleVisibility(field);
      }
    };
  }

  toggleVisibility(field) {
    this.setState(
      (prevState) => ({
        isVisible: {
          ...prevState.isVisible,
          [field]: !prevState.isVisible[field],
        },
      }),
      () => {
        this.focusOnInput(field);
      }
    );
  }

  focusOnInput(field) {
    if (field === "title" && this.titleInputRef.current) {
      this.titleInputRef.current.focus();
    } else if (field === "note" && this.noteInputRef.current) {
      this.noteInputRef.current.focus();
    }
  }

  handleRemoveNote() {
    this.props.removeNote(this.props.id);
  }

  render() {
    const { title, note, isVisible } = this.state;

    return (
      <div className="note">
        <button className="remove-note-btn" onClick={this.handleRemoveNote}>
          X
        </button>
        {isVisible.title ? (
          <h3
            className="title-p"
            onClick={() => this.toggleVisibility("title")}
          >
            {title.trim() === "" ? "Title" : title}
          </h3>
        ) : (
          <input
            type="text"
            value={title}
            className="title-input"
            ref={this.titleInputRef}
            name="title"
            maxLength={24}
            onBlur={() => this.toggleVisibility("title")}
            onChange={this.handleChange}
            onKeyDown={this.handleEnterKey("title")}
          />
        )}

        {isVisible.note ? (
          <p className="note-p" onClick={() => this.toggleVisibility("note")}>
            {note.trim() == "" ? "(Empty)" : note}
          </p>
        ) : (
          <textarea
            value={note}
            name="note"
            className="note-input"
            ref={this.noteInputRef}
            placeholder="Write your thoughts here..."
            onBlur={() => this.toggleVisibility("note")}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

function NewNoteButton({ onClick }) {
  return (
    <button className="new-note-btn" onClick={onClick}>
      +
    </button>
  );
}
