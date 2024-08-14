import React, { useState } from 'react';
import api from '../../services/api';

interface DeletarReservaProps {
  id: number;
  onDeleteSuccess: () => void;
}

const DeletarReserva: React.FC<DeletarReservaProps> = ({ id, onDeleteSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await api.delete('/api/Reserva/RemoverReserva', {
        params: {
          reservaId: id
        }
      });
      onDeleteSuccess();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="btn btn-danger ml-2"
        disabled={loading}
      >
        {loading ? 'Deletando...' : 'Deletar'}
      </button>
    </div>
  );
};

export default DeletarReserva;
