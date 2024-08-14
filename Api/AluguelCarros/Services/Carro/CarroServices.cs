using SistemaAluguelCarros.Model;
using Carro.Model;
using Microsoft.EntityFrameworkCore;
using SistemaAluguelCarros.Data;
using SistemaAluguelCarros.Dto.Carro;

namespace SistemaAluguelCarros.Services.Carro
{
    public class CarroService : ICarroInterface
    {
        private readonly AppDbContext _context;

        public CarroService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseModel<CarroModel>> BuscarCarroPorId(int carroId)
        {
            ResponseModel<CarroModel> resposta = new ResponseModel<CarroModel>();
            try
            {
                var carro = await _context.Carro.FirstOrDefaultAsync(carroBanco => carroBanco.Id == carroId);
                if (carro != null)
                {
                    resposta.Dados = carro;
                    resposta.Mensagem = "Carro encontrado com sucesso";
                    resposta.Status = true;
                }
                resposta.Mensagem = "Autor não encontrado";
                resposta.Status = false;
                return resposta;

            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
                return resposta;
            }
        }

        public async Task<ResponseModel<List<CarroModel>>> BuscarCarros()
        {
            ResponseModel<List<CarroModel>> resposta = new ResponseModel<List<CarroModel>>();
            try
            {
                var carros = await _context.Carro.ToListAsync();
                resposta.Dados = carros;
                resposta.Mensagem = "Todos os Carros Foram Coletados";
                resposta.Status = true;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
            }
            return resposta;
        }

        public async Task<ResponseModel<List<CarroModel>>> CriarCarro(CriarCarroDto criarCarroDto)
        {
            ResponseModel<List<CarroModel>> resposta = new ResponseModel<List<CarroModel>>();
            try
            {
                bool placaExiste = await _context.Carro
                    .AsNoTracking()
                    .AnyAsync(c => c.Placa == criarCarroDto.Placa);

                if (placaExiste)
                {
                    resposta.Mensagem = "Já existe um carro com a placa informada.";
                    resposta.Status = false;
                    return resposta;
                }

                var carro = new CarroModel()
                {
                    Modelo = criarCarroDto.Modelo,
                    Marca = criarCarroDto.Marca,
                    Ano = criarCarroDto.Ano,
                    Placa = criarCarroDto.Placa,
                    Status = criarCarroDto.Status,
                    ValorDiaria = criarCarroDto.ValorDiaria
                };

                _context.Add(carro);
                await _context.SaveChangesAsync();

                resposta.Dados = await _context.Carro.ToListAsync();
                resposta.Mensagem = "Carro Criado com Sucesso";
                return resposta;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
                return resposta;
            }
        }


        public async Task<ResponseModel<List<CarroModel>>> EditarCarro(EditarCarroDto editarCarroDto)
        {
            ResponseModel<List<CarroModel>> resposta = new ResponseModel<List<CarroModel>>();
            try
            {
                var carro = await _context.Carro.FirstOrDefaultAsync(carroBanco => carroBanco.Id == editarCarroDto.Id);
                if (carro == null)
                {
                    resposta.Mensagem = "Nenhum carro localizado com o ID fornecido.";
                    resposta.Status = false;
                    return resposta;
                }

                bool placaExiste = await _context.Carro
                    .AsNoTracking()
                    .AnyAsync(c => c.Placa == editarCarroDto.Placa && c.Id != editarCarroDto.Id);

                if (placaExiste)
                {
                    resposta.Mensagem = "Já existe um carro com a placa informada.";
                    resposta.Status = false;
                    return resposta;
                }

                carro.Modelo = editarCarroDto.Modelo;
                carro.Marca = editarCarroDto.Marca;
                carro.Ano = editarCarroDto.Ano;
                carro.Placa = editarCarroDto.Placa;
                carro.Status = editarCarroDto.Status;
                carro.ValorDiaria = editarCarroDto.ValorDiaria;

                _context.Update(carro);
                await _context.SaveChangesAsync();

                resposta.Dados = await _context.Carro.ToListAsync();
                resposta.Mensagem = "Dados Atualizados com Sucesso";
                return resposta;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
                return resposta;
            }
        }


        public async Task<ResponseModel<List<CarroModel>>> RemoverCarro(int carroId)
        {
            ResponseModel<List<CarroModel>> resposta = new ResponseModel<List<CarroModel>>();
            try
            {
                var carro = await _context.Carro
                .FirstOrDefaultAsync(carroBanco => carroBanco.Id == carroId);
                if (carro == null)
                {
                    resposta.Mensagem = "Nenhum Carro Localizado";
                    return resposta;
                }
                _context.Remove(carro);
                await _context.SaveChangesAsync();
                resposta.Dados = await _context.Carro.ToListAsync();
                return (resposta);
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
            }
            return resposta;
        }
    }
}
