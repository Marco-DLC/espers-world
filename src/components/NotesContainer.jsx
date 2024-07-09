import React, { Component } from "react";

export default function NotesContainer({ children }) {
  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <hr />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      {children}
    </div>
  );
}

class Note extends Component {
  constructor () {
    super();

    this.state = {
      note: {
        title: 'Note',
        note: ""
      },
      isVisible: {
        title: true,
        note: false
      }
    }
    

    this.handleChange = this.handleChange.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  handleChange(e) {
    if (e.target.className === "title-input") {
      this.setState(prevState => ({
        note: {
         ...prevState.note, 
         title: e.target.value
        }
         }));
    } else {
      this.setState(prevState => ({
        note: {
         ...prevState.note,
          note: e.target.value
        }
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

  toggleVisibility(field){
    this.setState(prevState => ({
      isVisible: {
       ...prevState.isVisible, 
       [field]: !prevState.isVisible[field] 
      }
      }));
  }

  render() {
    const { note, isVisible } = this.state;

  return (
    <div className="note">
      {isVisible.title ? (
        <p className="title" onClick={() => this.toggleVisibility("title")}>
          {note.title.trim() === "" ? "Note" : note.title}
        </p>
      ) : (
        <input
          type="text"
          value={note.title}
          className="title-input"
          name="title"
          onBlur={() => this.toggleVisibility('title')}
          onChange={this.handleChange}
          onKeyDown={this.handleEnterKey("title")}
        />
      )}

      {isVisible.note ? (
        <p className="note" onClick={() => this.toggleVisibility("note")}>
          {note.note.trim() == "" ? "(Empty)" : note.note}
        </p>
      ) : (
        <textarea
          value={note.note}
          name="note"
          className="note-input"
          placeholder="Write your thoughts here..."
          onBlur={() => this.toggleVisibility('note')}
          onChange={this.handleChange}
          onKeyDown={this.handleEnterKey("note")}
        />
      )}
    </div>
  );
}
}
