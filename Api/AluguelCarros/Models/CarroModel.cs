namespace Carro.Model
{
    public class CarroModel
    {
        public int Id { get; set; }
        public string Modelo { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public string Placa { get; set; } = string.Empty;
        public int Ano { get; set; }
        public float ValorDiaria { get; set; }
        public bool Status { get; set; }

    }
}