import React, { useState, useEffect } from 'react';
import CarroModel from '../../Interfaces/Carro';

interface EditarCarroProps {
  show: boolean;
  onClose: () => void;
  onSave: (carro: CarroModel) => void;
  carro?: CarroModel | null;
}

const EditarCarro: React.FC<EditarCarroProps> = ({ show, onClose, onSave, carro }) => {
  const [localCarro, setLocalCarro] = useState<CarroModel | null>(null);

  useEffect(() => {
    if (carro) {
      setLocalCarro({ ...carro });
    }
  }, [carro]);

  if (!show) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (localCarro) {
      const { name, value, type } = e.target;
      setLocalCarro({
        ...localCarro,
        [name]: type === 'checkbox' ? e.target.checked : value,
      });
    }
  };

  const handleSave = async () => {
    if (localCarro) {
      try {
        await onSave(localCarro);
        onClose();
      } catch (error) {
        console.error('Erro ao salvar carro:', error);
      }
    }
  };

  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Carro</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Marca</label>
                <input
                  type="text"
                  name="marca"
                  className="form-control"
                  value={localCarro?.marca || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  className="form-control"
                  value={localCarro?.modelo || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Ano</label>
                <input
                  type="number"
                  name="ano"
                  className="form-control"
                  value={localCarro?.ano || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Valor Diária</label>
                <input
                  type="number"
                  name="valorDiaria"
                  className="form-control"
                  value={localCarro?.valorDiaria || ''}
                  onChange={handleChange}
                  min={0}
                  step="0.01"
                />
              </div>
              <input
                type="hidden"
                name="status"
                value={localCarro?.status ? 'true' : 'false'}
              />
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

export default EditarCarro;
