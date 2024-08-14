import ClienteModel from "./Cliente"; 

interface ClienteResponse {
  dados: ClienteModel[];
  mensagem: string;
  status: boolean;
}
export default ClienteResponse