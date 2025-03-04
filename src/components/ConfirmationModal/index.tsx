import React from 'react';
import './styles.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isSuccess?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isSuccess = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${isSuccess ? 'success' : ''}`}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            {isSuccess ? 'OK' : 'Confirmar'}
          </button>
          {!isSuccess && (
            <button className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 