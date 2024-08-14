import CarroModel from "./Carro";
import ClienteModel from "./Cliente";

interface ReservaModel {
  id: number;
  carroId: number;
  carro: CarroModel;
  clienteId: number;
  cliente: ClienteModel;
  dataInicio: string;
  valorReserva:number;
  dataFim: string;
}

export default ReservaModel