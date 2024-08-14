namespace SistemaAluguelCarros.Dto.Carro
{
    public class EditarCarroDto
    {
        public int Id { get; set; }
        public string Modelo { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public float ValorDiaria { get; set; }
        public int Ano { get; set; }
        public bool Status { get; set; }
    }
}