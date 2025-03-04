import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import UserEdit from '../components/UserEdit';
import { userService, User } from '../services/userService';
import './pages.css';

const UserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (userId: string, userData: { name: string; email: string; phone: string; cpf: string }) => {
    try {
      console.log('UserEditPage - Recebendo dados para atualização:', { userId, userData });
      setIsLoading(true);
      setError(null);
      await userService.updateUser(userId, userData);
    } catch (err) {
      console.error('UserEditPage - Erro na atualização:', err);
      setError(err instanceof Error ? err.message : 'Erro ao atualizar usuário');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadUser = useCallback(async (userId: string): Promise<User> => {
    try {
      console.log('UserEditPage - Carregando usuário:', userId);
      setIsLoading(true);
      setError(null);
      const user = await userService.getUser(userId);
      console.log('UserEditPage - Dados do usuário carregados:', user);
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar usuário';
      console.error('UserEditPage - Erro ao carregar usuário:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (!id) {
    return <div className="error-message">ID do usuário não fornecido</div>;
  }

  return (
    <div className="user-edit-page">
      <h1>Editar Usuário</h1>
      <UserEdit 
        userId={id}
        onUpdate={handleUpdate}
        onLoadUser={handleLoadUser}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default UserEditPage; 