const btnEl = document.querySelector("#btn");
const app = document.querySelector("#app");

getNotes().forEach((note) => {
        const noteEl = createNoteEl(note.id, note.content);
        app.insertBefore(noteEl, btnEl);
    })
    // *createNoteElement function

function createNoteEl(id, content) {
    const textArea = document.createElement("textarea");
    textArea.classList.add("note");
    textArea.placeholder = "Empty Note";
    textArea.value = content;

    textArea.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note ?");
        if (warning) {
            deleteNoteEl(id, textArea)
        }
    });
    textArea.addEventListener("input", () => {
        updateNote(id, textArea.value)
    })

    return textArea;
}

// *deletnoteElement
function deleteNoteEl(id, noteText) {
    const notes = getNotes().filter((note) => note.id !== id);
    saveNote(notes);
    app.removeChild(noteText);

}
// *update note
function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.filter((note) => note.id === id)[0];
    target.content = content;
    saveNote(notes);
}
// *add note
function addNote() {
    const notes = getNotes();
    const noteObj = {
        // *Random 1 to 99999
        id: Math.floor(Math.random() * 99999) + 1,
        content: ""
    }
    const note = createNoteEl(noteObj.id, noteObj.content);
    app.insertBefore(note, btn)
    notes.push(noteObj);
    saveNote(notes);
}
// *Save note
function saveNote(note) {
    localStorage.setItem("note-app", JSON.stringify(note));
}
// *get Note 
function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}
btnEl.addEventListener("click", addNote);