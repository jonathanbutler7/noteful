import FolderList from './Components/FolderList/FolderList';
import NoteRoute from './Components/NoteRoute/NoteRoute';
import AddFolder from './Components/AddFolder/AddFolder';
import AddNote from './Components/AddNote/AddNote';
import EditNote from './Components/EditNote/EditNote';
import NoteDetails from './Components/NoteDetails/NoteDetails';

const routes = [
  {
    exact: true,
    path: '/',
    component: FolderList,
  },
  {
    exact: false,
    path: '/folder/:folderId',
    component: NoteRoute,
  },
  {
    exact: false,
    path: '/add-folder',
    component: AddFolder,
  },
  {
    exact: false,
    path: '/add-note',
    component: AddNote,
  },
  {
    exact: true,
    path: '/edit-note/:note_id',
    component: EditNote,
  },
  {
    exact: false,
    path: '/note',
    component: NoteDetails
  }
];

export { routes };
