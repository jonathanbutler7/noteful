// import React from 'react';
// import { Link } from 'react-router-dom';
// import NotefulContext from '../../NotefulContext';
// import FolderSelect from '../FolderSelect/FolderSelect';
// import NoteDisplayF from '../NoteDisplay/NoteDisplayF';
// import './NoteDetails.css';
// import PropTypes from 'prop-types';

// export default class NoteDetails extends React.Component {
//   static contextType = NotefulContext;

//   deleteFromApi = (id) => {
//     fetch(`http://localhost:9090/notes/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'content-type': 'application/json',
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return res.json().then((error) => {
//             throw error;
//           });
//         }
//         return res.json();
//       })
//       .then((data) => this.context.deleteNote(id))
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   render() {
//     const { notes } = this.context;
//     const params = this.props.location.search;

//     let noteId = parseInt(params.split('=')[1]);
//     let foundNote = notes.find((item) => item.id === noteId);
//     // let foundNote = notes.find((item) => console.log(item.id));

//     let readableDate = '';
//     let folderId = '';
//     if (foundNote) {
//       folderId = foundNote.folderId;
//       let newMod = new Date(foundNote.date_created);
//       let month = newMod.getMonth();
//       let day = newMod.getDay();
//       let year = newMod.getFullYear();
//       readableDate = `${month + 1}/${day}/${year}`;
//     }

//     return (
//       <div className='fullDisplay'>
//         <FolderSelect />
//         <NoteDisplayF folderId={folderId} />
//         {foundNote && (
//           //make 55-65 another component in the future
//           <div className='note__box'>
//             <h2>{foundNote.note_name}</h2>
//             <p>Content: {foundNote.content}</p>
//             <p>Last modified {readableDate}</p>
//             <Link to={`edit-note/${foundNote.id}`}>
//               <button
//                 id='folderDelete'
//                 onClick={() => this.deleteFromApi(foundNote.id)}
//               >
//                 <h5>Edit</h5>
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// NoteDetails.propTypes = {
//   location: PropTypes.object,
// };
