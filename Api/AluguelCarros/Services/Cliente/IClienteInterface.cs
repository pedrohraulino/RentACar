using SistemaAluguelCarros.Dto.Cliente;
using SistemaAluguelCarros.Model;
using Cliente.Model;

namespace SistemaAluguelCarros.Services.Cliente
{
  public interface IClienteInterface
  {
    Task<ResponseModel<List<ClienteModel>>> BuscarClientes();
    Task<ResponseModel<ClienteModel>> BuscarClientePorId(int clienteId);
    Task<ResponseModel<List<ClienteModel>>> CriarCliente(CriarClienteDto criarClienteDto);
    Task<ResponseModel<List<ClienteModel>>> EditarCliente(EditarClienteDto editarClienteDto);
    Task<ResponseModel<List<ClienteModel>>> RemoverCliente(int clienteId);
  }
}
