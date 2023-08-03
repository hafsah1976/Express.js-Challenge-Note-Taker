//Notes to self:

//global variables
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

//getting elements to display in the window
//to get the DOM elements for notes
if (window.location.pathname === '/notes') {// checking if the current page is the notes page. then getting dom elements for the following
  noteTitle = document.querySelector('.note-title');//the note title
  noteText = document.querySelector('.note-textarea');//text in the note
  saveNoteBtn = document.querySelector('.save-note');//save button
  newNoteBtn = document.querySelector('.new-note');//new note button
  noteList = document.querySelectorAll('.list-container .list-group');//list of notes
}

// takes an element as an argument and 
//sets its display property to "inline".

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

//takes an element as an argument and 
//sets its display property to "none".
// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// fetches data from the API and returns a promise.
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

//sends a POST request to the 
//API with the note data as the request body
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });


  //This function sends a DELETE request to the API with the note-ID 
  //as the request URL.

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

//hides the save button 
//and sets the readonly attribute of the title and text fields to true, 
//and sets the values of the fields to the active note's title and text. 
//If there is no active note, 
//it sets the readonly attribute to false and clears the fields.

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

//gets the values of the title and text fields, 
//creates a new note object with those values, 
//sends a POST request to the API with that note object as the request body, 
//and then gets and renders the notes again.

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

//gets the clicked note element, 
//gets the note ID from its parent element's data-note attribute, 
//sets the activeNote to an empty object 
//if the note being deleted is the active note, 
//sends a DELETE request to the API with the note ID as the request URL, 
//and then gets and renders the notes again.

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};


//gets the clicked note element, 
//gets the note data from its parent element's data-note attribute, 
//sets the activeNote to that note, and then renders the active note.

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};


// Sets the activeNote to and empty object and allows the user to enter a new note-renders a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

// checks if the title and text fields are empty 
//and hides the save button if they are.

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

//The `renderNoteList` function takes a promise of notes as an argument and returns a promise.

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();//gets the JSON data for the notes from the promise. 
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = '')); //If the current page is the notes page, the function clears the contents of the note list.
  }

  let noteListItems = [];//creates an empty array to store the note list items

  // Returns HTML element with or without a delete button
  //defines an arrow function that takes a title and a boolean value as arguments
  const createLi = (text, delBtn = true) => {
  const liEl = document.createElement('li');//creates a `li` element 
  liEl.classList.add('list-group-item');//adds the `list-group-item` class to it

    const spanEl = document.createElement('span');//creates a `span` element
    spanEl.classList.add('list-item-title');//adds the `list-item-title` class
    spanEl.innerText = text;//sets the inner text of the `span` element to the title argument.
    spanEl.addEventListener('click', handleNoteView);//adds an event listener to the `span` element that calls the `handleNoteView` function. 

    liEl.append(spanEl);//appends the `span` element to the `li` element

    //If the boolean value is true,  `i` element will get created and gets styled according to the given css classes
    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);///adding an event listener to the icon element that calls the `handleNoteDelete` function. 
      liEl.append(delBtnEl);//appending the icon to the `li` element.
    }

    return liEl;// returns the list element. 

  };

//The `renderNoteList` function will then check if the length of the JSON data is 0.   
//If it is,  `li` element will get added with the text `No saved Notes` to list items array. 

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

// iterates over the JSON data to create a list element for each note. 
  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);// adding the dataset.note attribute to the list element & setting its value to the JSON data for the note. 


    noteListItems.push(li);//add the note list element to the note list items array. 
  });
// checks if the current page is the notes page. 
  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));//If the check is true,iterate over the list of notes array and append each item in the list to the first list element
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);
//adding event listeners to the buttons
if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();




