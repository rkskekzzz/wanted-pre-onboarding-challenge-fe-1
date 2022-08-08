import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn, Todo } from './pages/';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
