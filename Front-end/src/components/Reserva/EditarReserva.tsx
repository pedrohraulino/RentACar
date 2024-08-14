import React, { useState, useEffect } from 'react';
import ReservaModel from '../../Interfaces/Reserva';

interface EditarReservaProps {
  show: boolean;
  onClose: () => void;
  onSave: (reserva: ReservaModel) => void;
  reserva?: ReservaModel | null;
}

const EditarReserva: React.FC<EditarReservaProps> = ({ show, onClose, onSave, reserva }) => {
  const [localReserva, setLocalReserva] = useState<ReservaModel | null>(null);

  useEffect(() => {
    if (reserva) {
      setLocalReserva({ ...reserva });
    }
  }, [reserva]);

  const calculateValor = (dataInicio: string, dataFim: string) => {
    if (!dataInicio || !dataFim) return 0;

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (inicio >= fim) return 0;

    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 3600 * 24));

    const valorPorDia = 50; // Valor diário fixo para a reserva
    return dias * valorPorDia;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (localReserva) {
      const { name, value } = e.target;
      const updatedReserva = {
        ...localReserva,
        [name]: value,
      };

      if (name === 'dataInicio' || name === 'dataFim') {
        const { dataInicio, dataFim } = updatedReserva;
        updatedReserva.valorReserva = calculateValor(dataInicio, dataFim);
      }

      setLocalReserva(updatedReserva);
    }
  };

  const handleSave = async () => {
    if (localReserva) {
      try {
        await onSave(localReserva);
        onClose();
      } catch (error) {
        console.error('Erro ao salvar a reserva:', error);
      }
    }
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Reserva</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Carro</label>
                <input
                  type="text"
                  name="carro"
                  className="form-control"
                  value={localReserva?.carro.modelo || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Cliente</label>
                <input
                  type="text"
                  name="cliente"
                  className="form-control"
                  value={localReserva?.cliente.nome || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Data de Locação</label>
                <input
                  type="date"
                  name="dataInicio"
                  className="form-control"
                  value={localReserva?.dataInicio?.substring(0, 10) || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Data de Entrega</label>
                <input
                  type="date"
                  name="dataFim"
                  className="form-control"
                  value={localReserva?.dataFim?.substring(0, 10) || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Valor da Reserva</label>
                <input
                  type="number"
                  name="valorReserva"
                  className="form-control"
                  value={localReserva?.valorReserva || ''}
                  readOnly
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

export default EditarReserva;
