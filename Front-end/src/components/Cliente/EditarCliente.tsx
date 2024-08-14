import React, { useState, useEffect } from 'react';
import ClienteModel from '../../Interfaces/Cliente';

interface EditarClienteProps {
  show: boolean;
  onClose: () => void;
  onSave: (cliente: ClienteModel) => void;
  cliente?: ClienteModel | null;
}

const EditarCliente: React.FC<EditarClienteProps> = ({ show, onClose, onSave, cliente }) => {
  const [localCliente, setLocalCliente] = useState<ClienteModel | null>(null);

  useEffect(() => {
    if (cliente) {
      setLocalCliente({ ...cliente });
    }
  }, [cliente]);

  if (!show) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (localCliente) {
      const { name, value, type } = e.target;
      setLocalCliente({
        ...localCliente,
        [name]: type === 'checkbox' ? e.target.checked : value,
      });
    }
  };

  const handleSave = async () => {
    if (localCliente) {
      try {
        await onSave(localCliente);
        onClose();
      } catch (error) {
        console.error('Erro ao salvar cliente:', error);
      }
    }
  };

  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Cliente</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  name="nome"
                  className="form-control"
                  value={localCliente?.nome || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Contato</label>
                <input
                  type="text"
                  name="contato"
                  className="form-control"
                  value={localCliente?.contato || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>CNH</label>
                <input
                  type="text"
                  name="cnh"
                  className="form-control"
                  value={localCliente?.cnh || ''}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCliente;
