import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { userService } from '../services/userService';
import './pages.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateUser = async (userData: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      await userService.createUser(userData);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page">
      <h1>Cadastro de Usuário</h1>
      <UserForm 
        onSubmit={handleCreateUser}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default HomePage; 