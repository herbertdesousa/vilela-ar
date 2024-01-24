import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { DocumentCreate } from './DocumentCreate';
import { Documents } from './Documents';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={() => <Navigate to="/documents" />} />
        <Route path="/documents" Component={Documents} />
        <Route path="/documents/:id" Component={DocumentCreate} />
      </Routes>
    </BrowserRouter>
  );
}
