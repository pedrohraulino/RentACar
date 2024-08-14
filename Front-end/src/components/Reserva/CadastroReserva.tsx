import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import CarroModel from '../../Interfaces/Carro';
import ClienteModel from '../../Interfaces/Cliente';

interface CadastroReservaProps {
  onSuccess: () => void;
}
const CadastroReserva: React.FC<CadastroReservaProps> = ({ onSuccess }) => {
  const [carros, setCarros] = useState<CarroModel[]>([]);
  const [clientes, setClientes] = useState<ClienteModel[]>([]);
  const [carroReservar, setCarroReservar] = useState<string>('');
  const [carroId, setCarroId] = useState<number | null>(null);
  const [modeloCarro, setModeloCarro] = useState<string>('');
  const [marcaCarro, setMarcaCarro] = useState<string>('');
  const [anoCarro, setAnoCarro] = useState<string>('');
  const [valorDiaria, setValorDiaria] = useState<number>(100);
  const [clienteReservarNome, setClienteReservarNome] = useState<string>('');
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [cnhCliente, setCnhCliente] = useState<string>('');
  const [nomeCliente, setNomeCliente] = useState<string>('');
  const [contatoCliente, setContatoCliente] = useState<string>('');
  const [dataLocacao, setDataLocacao] = useState<Date | undefined>(undefined);
  const [dataEntrega, setDataEntrega] = useState<Date | undefined>(undefined);
  const [valorReserva, setValorReserva] = useState<number>(0);

  const [showCarroResultados, setShowCarroResultados] = useState<boolean>(false);
  const [showClienteResultados, setShowClienteResultados] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'danger'>('success');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carrosResponse = await api.get<{ dados: CarroModel[] }>('/api/Carro/BuscarCarros');
        setCarros(carrosResponse.data.dados.filter(carro => carro.status)); // Filtra os carros com status true

        const clientesResponse = await api.get<{ dados: ClienteModel[] }>('/api/Cliente/BuscarClientes');
        setClientes(clientesResponse.data.dados);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleCarroSelect = (carro: CarroModel) => {
    setCarroId(carro.id);
    setCarroReservar(carro.marca);
    setModeloCarro(carro.modelo);
    setMarcaCarro(carro.marca);
    setAnoCarro(carro.ano.toString());
    setValorDiaria(carro.valorDiaria);
    setShowCarroResultados(false);
  };

  const handleClienteSelect = (cliente: ClienteModel) => {
    setClienteId(cliente.id);
    setClienteReservarNome(cliente.nome);
    setCnhCliente(cliente.cnh);
    setNomeCliente(cliente.nome);
    setContatoCliente(cliente.contato);
    setShowClienteResultados(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'carro' | 'cliente') => {
    const value = e.target.value;

    if (type === 'carro') {
      setCarroReservar(value);
      setShowCarroResultados(!!value);

      if (!value) {
        setCarroId(null);
        setModeloCarro('');
        setMarcaCarro('');
        setAnoCarro('');
        setValorDiaria(100);
      }
    } else if (type === 'cliente') {
      setClienteReservarNome(value);
      setShowClienteResultados(!!value);

      if (!value) {
        setClienteId(null);
        setCnhCliente('');
        setNomeCliente('');
        setContatoCliente('');
      }
    }
  };

  useEffect(() => {
    if (dataLocacao && dataEntrega) {
      const totalDias = calcularDias(dataLocacao, dataEntrega);
      const totalReserva = totalDias * valorDiaria;
      setValorReserva(totalReserva);
    }
  }, [dataLocacao, dataEntrega, valorDiaria]);

  const calcularDias = (inicio: Date, fim: Date): number => {
    const diffTime = Math.abs(fim.getTime() - inicio.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const reservaPayload = {
        carroId: carroId!,
        carro: {
          id: carroId!,
          modelo: modeloCarro,
          marca: marcaCarro,
          ano: parseInt(anoCarro),
          valorDiaria: valorDiaria
        },
        clienteId: clienteId!,
        cliente: {
          id: clienteId!,
          nome: clienteReservarNome || '',
          contato: contatoCliente,
          cnh: cnhCliente
        },
        valorReserva: valorReserva,
        dataInicio: dataLocacao?.toISOString(),
        dataFim: dataEntrega?.toISOString()
      };

      await api.post('/api/Reserva/CriarReserva', reservaPayload);
      setAlertType('success');
      onSuccess();
      setCarroReservar('');
      setCarroId(null);
      setModeloCarro('');
      setMarcaCarro('');
      setAnoCarro('');
      setValorDiaria(100);

      setClienteReservarNome('');
      setClienteId(null);
      setCnhCliente('');
      setNomeCliente('');
      setContatoCliente('');

      setDataLocacao(undefined);
      setDataEntrega(undefined);
      setValorReserva(0);
    } catch (error) {
      setAlertMessage('Erro ao finalizar a reserva');
      setAlertType('danger');
      console.error('Erro ao finalizar a reserva:', error);
    }
  };


  return (
    <div>
      <h2>Reservar carro</h2>
      {alertMessage && (
        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          {alertMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <form id="form" onSubmit={handleSubmit} className="pt-2 pb-5">
        <div className="form-group">
          <label htmlFor="carro">Carro:</label>
          <input
            type="text"
            className="form-control"
            id="carroReservar"
            placeholder="Busque por um Carro"
            value={carroReservar}
            onChange={(e) => handleInputChange(e, 'carro')}
            required
            autoComplete="off"
          />
          {showCarroResultados && carroReservar && (
            <ul className="resultadosBusca">
              {carros.filter(carro => carro.marca.toLowerCase().includes(carroReservar.toLowerCase())).map(filteredCarro => (
                <li key={filteredCarro.id} onClick={() => handleCarroSelect(filteredCarro)}>
                  {filteredCarro.marca} - {filteredCarro.modelo}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='form-group d-flex'>
          <div className="mr-4 w-100">
            <label htmlFor="modeloCarro">Modelo:</label>
            <input
              type="text"
              className="form-control"
              id="modeloCarro"
              value={modeloCarro}
              readOnly
            />
          </div>

          <div className="mr-4 w-100">
            <label htmlFor="marcaCarro">Marca:</label>
            <input
              type="text"
              className="form-control"
              id="marcaCarro"
              value={marcaCarro}
              readOnly
            />
          </div>

          <div className="w-100">
            <label htmlFor="anoCarro">Ano:</label>
            <input
              type="text"
              className="form-control"
              id="anoCarro"
              value={anoCarro}
              readOnly
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cliente">Cliente:</label>
          <input
            type="text"
            className="form-control"
            id="clienteReservar"
            placeholder="Busque por um Cliente"
            value={clienteReservarNome}
            onChange={(e) => handleInputChange(e, 'cliente')}
            required
            autoComplete="off"
          />
          {showClienteResultados && clienteReservarNome && (
            <ul className="resultadosBusca">
              {clientes.filter(cliente => cliente.nome.toLowerCase().includes(clienteReservarNome.toLowerCase())).map(filteredCliente => (
                <li key={filteredCliente.id} onClick={() => handleClienteSelect(filteredCliente)}>
                  {filteredCliente.nome} - {filteredCliente.contato}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group d-flex">
          <div className='w-100 mr-4'>
            <label htmlFor="cnhCliente">Nome:</label>
            <input
              type="text"
              className="form-control"
              id="cnhCliente"
              value={nomeCliente}
              readOnly
            />
          </div>
          <div className='w-100 mr-4'>
            <label htmlFor="cnhCliente">CNH:</label>
            <input
              type="text"
              className="form-control"
              id="cnhCliente"
              value={cnhCliente}
              readOnly
            />
          </div>
          <div className='w-100'>
            <label htmlFor="contatoCliente">Contato:</label>
            <input
              type="text"
              className="form-control"
              id="contatoCliente"
              value={contatoCliente}
              readOnly
            />
          </div>
        </div>

        <div className="form-group d-flex justify-content-between align-items-end">
          <div className='d-flex'>
            <div className='mr-4'>
              <label htmlFor="dataInicio">Data de Locação:</label>
              <input
                type="date"
                className="form-control"
                id="dataInicio"
                value={dataLocacao ? dataLocacao.toISOString().substring(0, 10) : ''}
                onChange={(e) => setDataLocacao(new Date(e.target.value))}
                required
              />
            </div>

            <div>
              <label htmlFor="dataFim">Data de Entrega:</label>
              <input
                type="date"
                className="form-control"
                id="dataFim"
                value={dataEntrega ? dataEntrega.toISOString().substring(0, 10) : ''}
                onChange={(e) => setDataEntrega(new Date(e.target.value))}
                required
              />
            </div>
          </div>
          <h3 className='font-weight-bold'>{`R$ ${valorReserva}`}</h3>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSuccess}>Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroReserva;
