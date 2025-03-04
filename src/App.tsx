import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-brand">
              <Link to="/">Sistema de Usuários</Link>
            </div>
            <div className="nav-links">
              <Link to="/cadastro" className="nav-link">Cadastrar</Link>
              <Link to="/" className="nav-link">Listar Usuários</Link>
            </div>
          </div>
        </nav>

        <div className="main-container">
          <Routes>
            <Route path="/" element={<UserListPage />} />
            <Route path="/cadastro" element={<HomePage />} />
            <Route path="/editar/:id" element={<UserEditPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
