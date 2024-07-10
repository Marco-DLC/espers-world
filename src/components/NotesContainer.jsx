import React, { Component, useState } from "react";

export default function NotesContainer() {
  const [allNotes, setAllNotes] = useState([
    { id: 0, note: <Note id={0} key={0} removeNote={removeNote} /> },
  ]);

  const addNote = () => {
    const newId = allNotes.length ? allNotes[allNotes.length - 1].id + 1 : 0;
    setAllNotes((prevNotes) => [
      ...prevNotes,
      {
        id: newId,
        note: <Note key={newId} id={newId} removeNote={removeNote} />,
      },
    ]);
  };

  function removeNote(id) {
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <hr />
      {allNotes.map((note) => note.note)}
      <NewNoteButton onClick={addNote} />
    </div>
  );
}

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {
        title: "Title",
        note: "",
      },
      isVisible: {
        title: true,
        note: false,
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
        note: {
          ...prevState.note,
          title: e.target.value,
        },
      }));
    } else {
      this.setState((prevState) => ({
        note: {
          ...prevState.note,
          note: e.target.value,
        },
      }));
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
    const { note, isVisible } = this.state;

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
            {note.title.trim() === "" ? "Title" : note.title}
          </h3>
        ) : (
          <input
            type="text"
            value={note.title}
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
            {note.note.trim() == "" ? "(Empty)" : note.note}
          </p>
        ) : (
          <textarea
            value={note.note}
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
