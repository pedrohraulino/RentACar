import React, { useState, useEffect } from "react";
import api from "../services/api";
import CarroModel from "../Interfaces/Carro";
import CarroResponse from "../Interfaces/CarroResponse";
import CadastroCarro from "../components/Carro/CadastroCarro";
import DeletarCarro from "../components/Carro/DeletarCarro";
import EditarCarro from "../components/Carro/EditarCarro";
import AlertaFlutuante from "../utils/alertaFlutuante";
import { Button, Collapse } from 'react-bootstrap';

const Carro: React.FC = () => {
  const [carros, setCarros] = useState<CarroModel[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [itensPorPagina] = useState<number>(10);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [carroSelecionado, setCarroSelecionado] = useState<CarroModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'danger' | 'warning'>('success');

  const fetchCarros = async () => {
    try {
      const response = await api.get<CarroResponse>('/api/Carro/BuscarCarros');
      const carrosData = response.data.dados;
      const sortedCarros = carrosData.sort((a, b) => a.marca.localeCompare(b.marca));
      setCarros(sortedCarros);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarros();
  }, []);

  useEffect(() => {
    if (carroSelecionado) {
      setBusca("");
    }
  }, [carroSelecionado]);

  const buscarCarroInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(event.target.value);
    setPaginaAtual(1);
  };

  const carrosFiltrados = carros.filter((carro) =>
    carro.marca.toLowerCase().includes(busca.toLowerCase()) ||
    carro.modelo.toLowerCase().includes(busca.toLowerCase()) ||
    carro.ano.toString().includes(busca)
  );

  const indexUltimoCarro = paginaAtual * itensPorPagina;
  const indexPrimeiroCarro = indexUltimoCarro - itensPorPagina;
  const carrosPaginated = carrosFiltrados.slice(indexPrimeiroCarro, indexUltimoCarro);

  const totalPaginas = Math.ceil(carrosFiltrados.length / itensPorPagina);

  const handlePageChange = (pageNumber: number) => {
    setPaginaAtual(pageNumber);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = async (carro: CarroModel) => {
    try {
      await api.put('/api/Carro/EditarCarro/', carro, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchCarros();
      setAlertMessage('Carro atualizado com sucesso!');
      setAlertType('success');
    } catch (error) {
      console.error('Erro ao salvar carro:', error);
      setAlertMessage('Erro ao atualizar carro.');
      setAlertType('danger');
    }
  };

  const handleCarroSelect = (carro: CarroModel) => {
    setCarroSelecionado(carro);
    setShowModal(true);
  };

  const handleDeleteSuccess = async () => {
    fetchCarros();
    setAlertMessage('Carro excluído com sucesso!');
    setAlertType('success');
  };

  const handleCadastroSuccess = async () => {
    fetchCarros();
    setAlertMessage('Carro cadastrado com sucesso!');
    setAlertType('success');
  };

  return (
    <div className="w-100 pl-5">
      <section id="home" className="shadow-lg telas p-5">
        <div className="ultimasReservas">
          <h1>Todos os Carros</h1>
          <EditarCarro
            show={showModal}
            onClose={handleClose}
            onSave={handleSave}
            carro={carroSelecionado}
          />
          <AlertaFlutuante
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage(null)}
          />
          <div className="d-flex mb-3 mt-3">
            <input
              type="text"
              className="form-control mr-5"
              placeholder="Buscar por marca, modelo ou ano"
              value={busca}
              onChange={buscarCarroInput}
            />
            <Button
              className="text-nowrap"
              variant="primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar Cadastro' : 'Cadastrar Carro'}
            </Button>

          </div>
          <Collapse in={showForm}>
            <div>
              <CadastroCarro onSuccess={handleCadastroSuccess} />
            </div>
          </Collapse>
          <table className="table" id="tabelaCarros">
            <thead>
              <tr className="bg-dark">
                <th className="text-white pl-2" scope="col">Marca</th>
                <th className="text-white pl-2" scope="col">Modelo</th>
                <th className="text-white pl-2" scope="col">Ano</th>
                <th className="text-white pl-2" scope="col">Valor Diária</th>
                <th className="text-white pl-2" scope="col">Status</th>
                <th className="text-white pl-2" scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {(busca ? carrosFiltrados : carrosPaginated).map((carro) => {
                const statusClass = carro.status ? 'status-disponivel' : 'status-indisponivel';

                return (
                  <tr key={carro.id}>
                    <td>{carro.marca}</td>
                    <td>{carro.modelo}</td>
                    <td>{carro.ano}</td>
                    <td>{`R$ ${carro.valorDiaria.toFixed(2)}`}</td>
                    <td>
                      <span className={`status ${statusClass}`}>
                        {carro.status ? 'Disponível' : 'Indisponível'}
                      </span>
                    </td>
                    <td className="d-flex">
                      <button onClick={() => handleCarroSelect(carro)} className="btn btn-primary">Editar</button>
                      <DeletarCarro
                        id={carro.id}
                        status={carro.status}
                        onDeleteSuccess={handleDeleteSuccess}
                      />
                    </td>
                  </tr>
                );
              })}
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
    </div>
  );
};

export default Carro;
