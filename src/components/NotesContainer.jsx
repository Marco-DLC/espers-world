import React, { Component, useState } from "react";

export default function NotesContainer() {
  const [allNotes, setAllNotes] = useState([<Note key='0' />]);

  const handleAddNote = () => {
    setAllNotes(prevNotes => [...prevNotes, <Note key={prevNotes.length} />])
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <hr />
      {allNotes}
      <NewNoteButton onClick={handleAddNote}/>
    </div>
  );
}

class Note extends Component {
  constructor() {
    super();

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
    this.setState((prevState) => ({
      isVisible: {
        ...prevState.isVisible,
        [field]: !prevState.isVisible[field],
      },
    }), () => {this.focusOnInput(field)});
  }

  focusOnInput(field) {
    if (field === 'title' && this.titleInputRef.current) {
      this.titleInputRef.current.focus();
    } else if (field === 'note' && this.noteInputRef.current) {
      this.noteInputRef.current.focus();
    }
  }

  render() {
    const { note, isVisible } = this.state;

    return (
      <div className="note">
        {isVisible.title ? (
          <h3 className="title-p" onClick={() => this.toggleVisibility("title")}>
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
            onKeyDown={this.handleEnterKey("note")}
          />
        )}
      </div>
    );
  }
}

function NewNoteButton({onClick}) {
  return <button className="new-note-btn" onClick={onClick}>+</button>
}
