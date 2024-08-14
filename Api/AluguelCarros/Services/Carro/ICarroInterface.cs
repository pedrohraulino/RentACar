using SistemaAluguelCarros.Dto.Carro;
using SistemaAluguelCarros.Model;
using Carro.Model;

namespace SistemaAluguelCarros.Services.Carro
{
  public interface ICarroInterface
  {

    Task<ResponseModel<CarroModel>> BuscarCarroPorId(int carroId);
    Task<ResponseModel<List<CarroModel>>> BuscarCarros();
    Task<ResponseModel<List<CarroModel>>> CriarCarro(CriarCarroDto criarCarroDto);
    Task<ResponseModel<List<CarroModel>>> EditarCarro(EditarCarroDto editarCarroDto);
    Task<ResponseModel<List<CarroModel>>> RemoverCarro(int carroId);
  }
}
