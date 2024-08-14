namespace SistemaAluguelCarros.Dto.Carro
{
  public class CriarCarroDto
  {
    public string Modelo { get; set; } = string.Empty;
    public string Marca { get; set; } = string.Empty;
    public int Ano { get; set; }
    public float ValorDiaria { get; set; }
    public bool Status { get; set; }

  }
}