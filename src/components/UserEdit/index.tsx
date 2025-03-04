import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../services/userService';
import ConfirmationModal from '../ConfirmationModal';
import './styles.css';

interface UserEditProps {
  userId: string | undefined;
  onUpdate: (id: string, userData: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  }) => void;
  onLoadUser: (id: string) => Promise<User>;
  isLoading: boolean;
  error: string | null;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
};

const UserEdit: React.FC<UserEditProps> = ({
  userId,
  onUpdate,
  onLoadUser,
  isLoading,
  error
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  });
  const [formErrors, setFormErrors] = useState({
    cpf: ''
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formatCPF = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const cpf = numbers.slice(0, 11);
    
    // Aplica a máscara
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  useEffect(() => {
    const loadUser = async () => {
      if (userId) {
        try {
          const user = await onLoadUser(userId);
          console.log('Dados carregados do usuário:', user);
          
          if (user) {
            const newFormData = {
              name: user.name,
              email: user.email,
              phone: user.phone,
              cpf: user.cpf
            };
            console.log('Inicializando formData com:', newFormData);
            setFormData(newFormData);
          }
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
        }
      }
    };

    loadUser();
  }, [userId, onLoadUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormData;
    
    if (name === 'cpf') {
      // Aplica a formatação ao CPF
      const formattedCPF = formatCPF(value);
      
      // Valida se tem 11 dígitos
      const numbers = value.replace(/\D/g, '');
      if (numbers.length > 11) {
        setFormErrors(prev => ({
          ...prev,
          cpf: 'CPF deve ter 11 dígitos'
        }));
      } else {
        setFormErrors(prev => ({
          ...prev,
          cpf: ''
        }));
      }
      
      setFormData(prev => ({
        ...prev,
        [key]: formattedCPF
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valida se o CPF tem 11 dígitos antes de enviar
    const cpfNumbers = formData.cpf.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) {
      setFormErrors(prev => ({
        ...prev,
        cpf: 'CPF deve ter 11 dígitos'
      }));
      return;
    }
    
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    if (userId) {
      try {
        await onUpdate(userId, formData);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      }
    }
  };

  const handleCancelUpdate = () => {
    setShowConfirmModal(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isLoading) {
    return <div className="loading-message">Carregando...</div>;
  }

  return (
    <div className="user-edit-container">
      <form onSubmit={handleSubmit} className="user-edit-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            maxLength={14}
            required
          />
          {formErrors.cpf && <div className="error-message">{formErrors.cpf}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button type="submit" className="update-button" disabled={isLoading || !!formErrors.cpf}>
            {isLoading ? 'Atualizando...' : 'Atualizar Usuário'}
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancelUpdate}
        onConfirm={handleConfirmUpdate}
        title="Confirmar Atualização"
        message="Tem certeza que deseja atualizar este usuário?"
      />

      <ConfirmationModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        onConfirm={handleSuccessClose}
        title="Sucesso!"
        message="Usuário atualizado com sucesso!"
        isSuccess={true}
      />
    </div>
  );
};

export default UserEdit; 