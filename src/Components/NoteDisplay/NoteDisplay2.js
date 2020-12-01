// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './NoteDisplay.css';
// import NotefulContext from '../../NotefulContext';

// function NoteDisplay2() {
//   const [noteClass, setNoteClass] = useState('note');

//   function toggleNoteClass(e, id) {
//     setNoteClass('');
//   }

//   const deleteFromApi = (id) => {
//     console.log(id);
//     const raw = '';
//     const url = `http://localhost:8000/api/notes/${id}`;
//     var options = {
//       method: 'DELETE',
//       body: raw,
//       redirect: 'follow',
//     };
//     fetch(url, options)
//       .then((response) => response.text())
//       .then((result) => console.log(result))
//       .catch((error) => console.log('error', error));
//   };
//   const context = useContext(NotefulContext);
//   const selectedFolder = context.selectedFolder;
//   const notes = context.notes;
//   const newNotesList = notes.filter((i) => i.folder_id === selectedFolder);
//   // console.log(newNotesList);
//   return (
//     <div className='notebox'>
//       {newNotesList.map((note, id) => {
//         let newMod = new Date(note.date_created);
//         let month = newMod.getMonth();
//         let day = newMod.getDay();
//         let year = newMod.getFullYear();
//         return (
//           // <Link
//           //   to={`/note?name=${note.note_name}`}
//           //   key={id}
//           //   name={id}
//           //   onClick={(e) => toggleNoteClass(e, id)}
//           //   className="newnotebox"
//           // >
//           <div className='newnotebox' key={id}>
//             <Link to={`/note?name=${note.id}`}>
//               <h2 className='noteTitle'>{note.note_name}</h2>
//               <div className='noteDetails'>
//                 <p>Last modified {`${month + 1}/${day + 1}/${year}`}</p>
//                 <button
//                   id='folderDelete'
//                   onClick={() => deleteFromApi(note.id)}
//                 >
//                   <h5>Delete</h5>
//                 </button>
//               </div>
//             </Link>
//           </div>
//         );
//       })}
//       <div className='addFolderButton'>
//         <Link to={'/add-note'} name='linkToAddNote'>
//           <h5>Add note</h5>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default NoteDisplay2;
