import React, { useState } from 'react';
import './styles.css';

interface UserFormProps {
  onSubmit: (userData: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  }) => void;
  isLoading: boolean;
  error: string | null;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  });
  const [formErrors, setFormErrors] = useState({
    cpf: ''
  });

  const formatCPF = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const cpf = numbers.slice(0, 11);
    
    // Aplica a máscara
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
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
        [name]: formattedCPF
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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
    
    onSubmit(formData);
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
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

        <button type="submit" className="submit-button" disabled={isLoading || !!formErrors.cpf}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar Usuário'}
        </button>
      </form>
    </div>
  );
};

export default UserForm; 