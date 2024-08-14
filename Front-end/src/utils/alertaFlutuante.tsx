import React, { useEffect } from 'react';

interface AlertaFlutuanteProps {
  message: string | null;
  type: 'success' | 'danger' | 'warning';
  onClose: () => void;
}

const AlertaFlutuante: React.FC<AlertaFlutuanteProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Alerta desaparece após 5 segundos

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const alertClass = `alert alert-${type} alert-dismissible fade show`;

  return (
    <div className={alertClass} role="alert" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1050 }}>
      {message}
      <button type="button" className="close" aria-label="Close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default AlertaFlutuante;
