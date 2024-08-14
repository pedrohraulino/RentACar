import React, { useState } from 'react';
import api from '../../services/api';

interface DeletarCarroProps {
  id: number;
  status: boolean;
  onDeleteSuccess: () => void;
}

const DeletarCarro: React.FC<DeletarCarroProps> = ({ id, status, onDeleteSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    if (!status) {
      setLoading(false);
      return;
    }

    try {
      await api.delete('/api/Carro/RemoverCarro', {
        params: {
          carroId: id
        }
      });
      onDeleteSuccess();
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
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

export default DeletarCarro;
