using Carro.Model;
using Cliente.Model;

namespace SistemaAluguelCarros.Dto.Reserva
{
  public class CriarReservaDto
  {
    public int CarroId { get; set; }
    public CarroModel Carro { get; set; }
    public int ClienteId { get; set; }
    public float ValorReserva { get; set; }
    public ClienteModel Cliente { get; set; }
    public DateTime DataInicio { get; set; }
    public DateTime DataFim { get; set; }
  }
}