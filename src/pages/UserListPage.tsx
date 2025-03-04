import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable';
import ConfirmationModal from '../components/ConfirmationModal';
import { userService, User } from '../services/userService';
import './pages.css';

const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar usuários');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/editar/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUserId) {
      try {
        await userService.deleteUser(selectedUserId);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        await loadUsers();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao excluir usuário');
      }
    }
  };

  const handleDeleteCancel = () => {
    setSelectedUserId(null);
    setShowConfirmModal(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  const handleRefresh = () => {
    loadUsers();
  };

  return (
    <div className="user-list-page">
      <h1>Lista de Usuários</h1>
      <UserTable 
        users={users}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        error={error}
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este usuário?"
      />

      <ConfirmationModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        onConfirm={handleSuccessClose}
        title="Sucesso!"
        message="Usuário excluído com sucesso!"
        isSuccess={true}
      />
    </div>
  );
};

export default UserListPage; 