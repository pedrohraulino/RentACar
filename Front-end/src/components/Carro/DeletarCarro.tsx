import React, { useState } from 'react';
import api from '../../services/api';

interface DeletarCarroProps {
  id: number;
  status: boolean;
  onDelete: (message: string, type: 'success' | 'danger') => void;
}

const DeletarCarro: React.FC<DeletarCarroProps> = ({ id, status, onDelete }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    if (!status) {
      setLoading(false);
      onDelete('Carro não pode ser excluído porque está possui reserva.', 'danger');
      return;
    }

    try {
      await api.delete('/api/Carro/RemoverCarro', {
        params: {
          carroId: id
        }
      });
      onDelete('Carro excluído com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
      onDelete('Erro ao tentar excluir o carro.', 'danger');
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
