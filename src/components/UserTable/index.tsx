import React from 'react';
import './styles.css';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  error: string | null;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onRefresh,
  isLoading,
  error
}) => {
  if (isLoading) {
    return <div className="loading-message">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Erro ao carregar usuários: {error}</p>
        <button className="refresh-button" onClick={onRefresh}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return <div className="empty-message">Nenhum usuário encontrado</div>;
  }

  return (
    <div className="user-table-container">
      <div className="table-header">
        <h2 className="user-table-title">Usuários Cadastrados</h2>
        <button className="refresh-button" onClick={onRefresh}>
          Atualizar
        </button>
      </div>
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.cpf}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="actions-cell">
                  <button
                    className="edit-button"
                    onClick={() => onEdit(user.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDelete(user.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable; 