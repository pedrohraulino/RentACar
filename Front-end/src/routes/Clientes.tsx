import React, { useEffect, useState } from "react";
import api from "../services/api";
import ClienteModel from "../Interfaces/Cliente";
import ClienteResponse from "../Interfaces/ClienteResponse";
import CadastroCliente from "../components/Cliente/CadastroCliente";
import DeletarCliente from "../components/Cliente/DeletarCliente";
import EditarCliente from "../components/Cliente/EditarCliente";
import AlertaFlutuante from "../utils/alertaFlutuante";
import { Collapse, Button } from 'react-bootstrap';

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<ClienteModel[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [itensPorPagina] = useState<number>(10);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'danger' | 'warning'>('success');
  const [clienteParaEditar, setClienteParaEditar] = useState<ClienteModel | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get<ClienteResponse>(`/api/Cliente/BuscarClientes`);
      const clientesData = response.data.dados;

      const sortedClientes = clientesData.sort((a, b) => a.nome.localeCompare(b.nome));
      setClientes(sortedClientes);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const buscarClienteInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(event.target.value);
    setPaginaAtual(1);
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.cnh.toLowerCase().includes(busca.toLowerCase())
  );

  const indexUltimoCliente = paginaAtual * itensPorPagina;
  const indexPrimeiroCliente = indexUltimoCliente - itensPorPagina;
  const clientesPaginated = clientesFiltrados.slice(indexPrimeiroCliente, indexUltimoCliente);

  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);

  const handlePageChange = (pageNumber: number) => {
    setPaginaAtual(pageNumber);
  };

  const handleCadastro = (message: string, type: 'success' | 'danger') => {
    setAlertMessage(message);
    setAlertType(type);
    fetchClientes();  
    setShowForm(false);
  };

  const handleDelete = (message: string, type: 'success' | 'danger') => {
    setAlertMessage(message);
    setAlertType(type);
    fetchClientes();  
  };

  const handleEditClick = (cliente: ClienteModel) => {
    setClienteParaEditar(cliente);
    setShowEditModal(true);
  };

  const handleEditSave = async (cliente: ClienteModel) => {
    try {
      await api.put('/api/Cliente/EditarCliente', cliente, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchClientes();
      setAlertMessage('Cliente atualizado com sucesso!');
      setAlertType('success');
      setShowEditModal(false);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      setAlertMessage('Cliente com CNH já cadastrado');
      setAlertType('danger');
    }
  };

  return (
    <div className="w-100 pl-5">
      <section id="home" className="shadow-lg telas p-5">
        <div className="ultimasReservas">
          <h2>Todos os Clientes</h2>
          <AlertaFlutuante
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage(null)}
          />

          <div className="d-flex mb-3 mt-3">
            <input
              type="text"
              className="form-control mr-5"
              placeholder="Buscar por nome ou CNH"
              value={busca}
              onChange={buscarClienteInput}
            />
            <Button
              className="text-nowrap"
              variant="primary"
              onClick={() => setShowForm(!showForm)}
              aria-controls="cadastro-cliente-collapse"
              aria-expanded={showForm}
            >
              {showForm ? "Fechar Cadastro" : "Cadastrar Cliente"}
            </Button>
          </div>

          <Collapse in={showForm}>
            <div id="cadastro-cliente-collapse">
              <CadastroCliente onSuccess={handleCadastro} />
            </div>
          </Collapse>

          <table className="table" id="tabelaClientes">
            <thead>
              <tr className="bg-dark">
                <th className="pl-3 text-white" scope="col">Nome</th>
                <th className="pl-3 text-white" scope="col">Contato</th>
                <th className="pl-3 text-white" scope="col">CNH</th>
                <th className="pl-3 text-white" scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {(busca ? clientesFiltrados : clientesPaginated).map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.contato}</td>
                  <td>{cliente.cnh}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(cliente)}
                    >
                      Editar
                    </button>
                    <DeletarCliente
                      id={cliente.id}
                      onDelete={handleDelete}
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
                  >{index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <EditarCliente
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
        cliente={clienteParaEditar}
      />
    </div>
  );
};

export default Clientes;
