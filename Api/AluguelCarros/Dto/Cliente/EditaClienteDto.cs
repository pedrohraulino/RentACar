namespace SistemaAluguelCarros.Dto.Cliente
{
    public class EditarClienteDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Contato { get; set; } = string.Empty;
        public string CNH { get; set; } = string.Empty;
    }
}