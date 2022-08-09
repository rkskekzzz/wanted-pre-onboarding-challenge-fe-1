import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { SignIn, Todo } from './pages/';
import './App.css';

const ProtectedRoute = () => {
  if (!window.localStorage.getItem('todoAuthToken')) {
    return <Navigate to={'/auth'} replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
