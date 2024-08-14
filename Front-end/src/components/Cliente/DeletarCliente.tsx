import React, { useState } from 'react';
import api from '../../services/api';

interface DeletarclienteProps {
  id: number;
  onDeleteSuccess: () => void;
}

const Deletarcliente: React.FC<DeletarclienteProps> = ({ id, onDeleteSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await api.delete('/api/Cliente/RemoverCliente', {
        params: {
          clienteId: id
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

export default Deletarcliente;
