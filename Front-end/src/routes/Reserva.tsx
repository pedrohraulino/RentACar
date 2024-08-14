import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ReservaModel from '../Interfaces/Reserva';
import ReservaResponse from '../Interfaces/ReservaResponse';
import CadastroReserva from '../components/Reserva/CadastroReserva';
import EditarReserva from '../components/Reserva/EditarReserva';
import DeletarReserva from '../components/Reserva/DeletarReserva';
import AlertaFlutuante from '../utils/alertaFlutuante';
import { Collapse, Button } from 'react-bootstrap';

const Reservas: React.FC = () => {
  const [reservas, setReservas] = useState<ReservaModel[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [itensPorPagina] = useState<number>(10);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'danger' | 'warning'>('success');
  const [reservaParaEditar, setReservaParaEditar] = useState<ReservaModel | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await api.get<ReservaResponse>('/api/Reserva/BuscarReservas');
      const reservasData = response.data.dados;

      const sortedReservas = reservasData.sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime());
      setReservas(sortedReservas);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const buscarReservaInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(event.target.value);
    setPaginaAtual(1);
  };

  const reservasFiltradas = reservas.filter((reserva) =>
    reserva.carro.marca.toLowerCase().includes(busca.toLowerCase()) ||
    reserva.cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const indexUltimaReserva = paginaAtual * itensPorPagina;
  const indexPrimeiraReserva = indexUltimaReserva - itensPorPagina;
  const reservasPaginated = reservasFiltradas.slice(indexPrimeiraReserva, indexUltimaReserva);

  const totalPaginas = Math.ceil(reservasFiltradas.length / itensPorPagina);

  const handlePageChange = (pageNumber: number) => {
    setPaginaAtual(pageNumber);
  };

  const handleCadastroSuccess = () => {
    fetchReservas();
    setAlertMessage('Reserva cadastrada com sucesso!');
    setAlertType('success');
    setShowForm(false);
  };

  const handleDeleteSuccess = () => {
    fetchReservas();
    setAlertMessage('Reserva excluída com sucesso!');
    setAlertType('success');
  };

  const handleEditClick = (reserva: ReservaModel) => {
    setReservaParaEditar(reserva);
    setShowEditModal(true);
  };

  const handleEditSave = async (reserva: ReservaModel) => {
    try {
      await api.put('/api/Reserva/EditarReserva', reserva, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchReservas();
      setAlertMessage('Reserva atualizada com sucesso!');
      setAlertType('success');
      setShowEditModal(false);
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error);
      setAlertMessage('Erro ao atualizar reserva!');
      setAlertType('danger');
    }
  };

  return (
    <div className="w-100 pl-5">
      <section id="home" className="shadow-lg telas p-5">
        <div className="ultimasReservas">
          <h2>Todas as Reservas</h2>
          <AlertaFlutuante
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage(null)}
          />

          <div className="d-flex mb-3 mt-3">
            <input
              type="text"
              className="form-control mr-5"
              placeholder="Buscar por carro ou cliente"
              value={busca}
              onChange={buscarReservaInput}
            />
            <Button
              className="text-nowrap"
              variant="primary"
              onClick={() => setShowForm(!showForm)}
              aria-controls="cadastro-reserva-collapse"
              aria-expanded={showForm}
            >
              {showForm ? "Fechar Cadastro" : "Cadastrar Reserva"}
            </Button>
          </div>

          <Collapse in={showForm}>
            <div id="cadastro-reserva-collapse">
              <CadastroReserva onSuccess={handleCadastroSuccess} />
            </div>
          </Collapse>

          <table className="table" id="tabelaReservas">
            <thead>
              <tr className="bg-dark">
                <th className="pl-3 text-white" scope="col">Carro</th>
                <th className="pl-3 text-white" scope="col">Cliente</th>
                <th className="pl-3 text-white" scope="col">Data Início</th>
                <th className="pl-3 text-white" scope="col">Data Fim</th>
                <th className="pl-3 text-white" scope="col">Valor</th>
                <th className="pl-3 text-white" scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {(busca ? reservasFiltradas : reservasPaginated).map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.carro.marca} - {reserva.carro.modelo}</td>
                  <td>{reserva.cliente.nome}</td>
                  <td>{new Date(reserva.dataInicio).toLocaleDateString()}</td>
                  <td>{new Date(reserva.dataFim).toLocaleDateString()}</td>
                  <td>{`R$ ${reserva.valorReserva}`}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(reserva)}
                    >
                      Editar
                    </button>
                    <DeletarReserva
                      id={reserva.id}
                      onDeleteSuccess={handleDeleteSuccess}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="mt-5">
            <ul className="pagination">
              {[...Array(totalPaginas)].map((_, index) => (
                <li key={index} className={`page-item ${paginaAtual === index + 1 ? 'active' : ''}`}>
                  <button
                    className={`page-link ${paginaAtual === index + 1 ? 'bg-dark text-white' : 'bg-white text-dark'} border-0 outline-0`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <EditarReserva
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
        reserva={reservaParaEditar}
      />
    </div>
  );
};

export default Reservas;
