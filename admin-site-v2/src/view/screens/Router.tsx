import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '../utils/Routes';
import { Docs } from './Docs';
import { DocSaveRooms } from './DocSave/DocSaveRooms';
import { DocSaveRoomsDetails } from './DocSave/DocSaveRoomsDetails';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={() => <Navigate to="/documents" />} />
        {/* <Route path="/documents" Component={Docs} />
        <Route path="/documents/:document_id/rooms" Component={DocSaveRooms} />
        <Route
          path="/documents/:document_id/rooms/:room_id"
          Component={DocSaveRoomsSpecs}
        /> */}
        <Route path={ROUTES.DOCUMENTS.path} Component={Docs} />
        <Route
          path={ROUTES.DOCUMENTS.SAVE_ROOMS.path}
          Component={DocSaveRooms}
        />
        <Route
          path={ROUTES.DOCUMENTS.SAVE_ROOMS.DETAILS.path}
          Component={DocSaveRoomsDetails}
        />
      </Routes>
    </BrowserRouter>
  );
}
