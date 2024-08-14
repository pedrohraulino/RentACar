import React, { useEffect, useState } from "react";
import CardInfo from "../components/Home/CardInfos";
import api from "../services/api";
import ReservaModel from "../Interfaces/Reserva";
import ReservaResponse from "../Interfaces/ReservaResponse";
import CarroModel from "../Interfaces/Carro";
import { formatDate } from "../utils/formateDate";

const Home: React.FC = () => {
  const [reservas, setReservas] = useState<ReservaModel[]>([]);
  const [totalReceber, setTotalReceber] = useState<number>(0);
  const [totalClientes, setTotalClientes] = useState<number>(0);
  const [totalCarrosDisponivel, setTotalCarrosDisponivel] = useState<number>(0)

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.get<ReservaResponse>('/api/Reserva/BuscarReservas');
        const reservasData = response.data.dados;
        setReservas(reservasData);

        const total = reservasData.reduce((acc, reserva) => acc + reserva.valorReserva, 0);
        setTotalReceber(total);

        const clientesResponse = await api.get('/api/Cliente/BuscarClientes');
        const clientesData = clientesResponse.data.dados;
        setTotalClientes(clientesData.length);

        const carroResponse = await api.get<{ dados: CarroModel[] }>('/api/Carro/BuscarCarros');
        const carrosData = carroResponse.data.dados;
        const totalCarrosDisponivel = carrosData.filter((carro: CarroModel) => carro.status === true).length;
        console.log(totalCarrosDisponivel)
        setTotalCarrosDisponivel(totalCarrosDisponivel);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchReservas();
    // const intervalId = setInterval(fetchReservas, 5000); 

    // return () => clearInterval(intervalId);
  }, []);
  const formattedTotalReceber = totalReceber.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return (
    <div className="w-100 pl-5">
      <section id="home" className="shadow-lg telas p-5">
        <div className="row">
          <CardInfo title="Total a receber" text={formattedTotalReceber} />
          <CardInfo title="Carros disponíveis" text={totalCarrosDisponivel} />
          <CardInfo title="Total de Clientes" text={totalClientes} />
        </div>
        <div className="ultimasReservas">
          <h2>Ultímas as Reservas</h2>
          <table className="table" id="tabelaReservas">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Contato</th>
                <th scope="col">CNH</th>
                <th scope="col">Carro</th>
                <th scope="col">Placa</th>
                <th scope="col">Ano</th>
                <th scope="col">Valor da Reserva</th>
                <th scope="col">Data Início</th>
                <th scope="col">Data Fim</th>
              </tr>
            </thead>
            <tbody>
              {reservas.slice(0, 10).map((reserva) => (
                <tr key={reserva.id}>
                  <td className="pl-0">{reserva.cliente.nome}</td>
                  <td>{reserva.cliente.contato}</td>
                  <td>{reserva.cliente.cnh}</td>
                  <td>{reserva.carro.marca} {reserva.carro.modelo}</td>
                  <td>{reserva.carro.placa}</td>
                  <td>{reserva.carro.ano}</td>
                  <td>{`R$ ${reserva.valorReserva.toFixed(2)}`}</td>
                  <td>{formatDate(reserva.dataInicio)}</td>
                  <td>{formatDate(reserva.dataFim)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Home;
