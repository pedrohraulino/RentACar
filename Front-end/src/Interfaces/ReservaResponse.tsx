import ReservaModel from "./Reserva";

interface ReservaResponse {
  dados: ReservaModel[];
  mensagem: string;
  status: boolean;
}
export default ReservaResponse