using SistemaAluguelCarros.Dto.Reserva;
using SistemaAluguelCarros.Model;
using Reserva.Model;

namespace SistemaAluguelCarros.Services.Reserva
{
  public interface IReservaInterface
  {

    Task<ResponseModel<ReservaModel>> BuscarReservaPorId(int ReservaId);
    Task<ResponseModel<List<ReservaModel>>> BuscarReservas();
    Task<ResponseModel<List<ReservaModel>>> CriarReserva(CriarReservaDto criarReservaDto);
    Task<ResponseModel<List<ReservaModel>>> BuscarPorIdCliente(int clienteId);
    Task<ResponseModel<ReservaModel>> BuscarPorIdCarro(int carroId);
    Task<ResponseModel<List<ReservaModel>>> EditarReserva(EditarReservaDto editarReservaDto);
    Task<ResponseModel<List<ReservaModel>>> RemoverReserva(int ReservaId);
  }
}
