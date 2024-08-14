import CarroModel from "./Carro";

interface CarroResponse {
  dados: CarroModel[];
  mensagem: string;
  status: boolean;
}
export default CarroResponse