import React, { useState } from 'react';
import api from '../../services/api';

interface DeletarclienteProps {
  id: number;
  onDelete: (message: string, type: 'success' | 'danger') => void;
}

const Deletarcliente: React.FC<DeletarclienteProps> = ({ id, onDelete }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await api.delete('/api/Cliente/RemoverCliente', {
        params: {
          clienteId: id
        }
      });
      onDelete('Cliente excluído com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      onDelete('Cliente não pode ser excluído porque está possui reserva.', 'danger');
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
