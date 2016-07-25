import firebase from 'firebase';

// Set the configuration for your app
// TODO: Replace with your project's config object
const config = {
  apiKey: 'AIzaSyAIJ1mNJ7bb3avruSGA-Gj7WKvHPO9hhXw',
  authDomain: 'notetaking-app-c9761.firebaseapp.com',
  databaseURL: 'https://notetaking-app-c9761.firebaseio.com',
  storageBucket: 'notetaking-app-c9761.appspot.com',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export function createNote(note) {
  database.ref('notes').push(note);
}

export function updateNote(noteID, fields) {
  database.ref('notes').child(noteID).update(fields);
}

export function deleteNote(noteID) {
  database.ref('notes').child(noteID).remove();
}

export function onNotesChanged(callback) {
  database.ref('notes').on('value', (snapshot) => {
  // snapshot.val contains the new notes state
    callback(snapshot.val());
  });
}
