import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import verifyAuth from './components/verifyAuth';
import Todos from './pages/Todos';

function App() {
  const TodosPage = verifyAuth(Todos);
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path='/mytodos' element={<TodosPage />} />
          <Route exact path='/' element={<Login />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
