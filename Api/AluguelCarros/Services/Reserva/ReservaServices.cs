using SistemaAluguelCarros.Dto.Reserva;
using SistemaAluguelCarros.Model;
using Reserva.Model;
using Microsoft.EntityFrameworkCore;
using SistemaAluguelCarros.Data;

namespace SistemaAluguelCarros.Services.Reserva
{
    public class ReservaService : IReservaInterface
    {
        private readonly AppDbContext _context;

        public ReservaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseModel<ReservaModel>> BuscarPorIdCarro(int carroId)
        {
            ResponseModel<ReservaModel> resposta = new ResponseModel<ReservaModel>();
            try
            {
                var reserva = await _context.Reserva
                    .Include(r => r.Carro)
                    .Include(r => r.Cliente)
                    .FirstOrDefaultAsync(r => r.CarroId == carroId);

                if (reserva != null)
                {
                    resposta.Dados = reserva;
                    resposta.Mensagem = "Reserva encontrada com sucesso";
                    resposta.Status = true;
                }
                else
                {
                    resposta.Mensagem = "Reserva não encontrada";
                    resposta.Status = false;
                }
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
            }
            return resposta;
        }


        public async Task<ResponseModel<List<ReservaModel>>> BuscarPorIdCliente(int clienteId)
        {
            ResponseModel<List<ReservaModel>> resposta = new ResponseModel<List<ReservaModel>>();
            try
            {
                // Obtém todas as reservas associadas ao cliente
                var reservas = await _context.Reserva
                    .Include(r => r.Carro)
                    .Include(r => r.Cliente)
                    .Where(r => r.ClienteId == clienteId)
                    .ToListAsync();

                if (reservas.Any())
                {
                    resposta.Dados = reservas;
                    resposta.Mensagem = "Reservas encontradas com sucesso";
                    resposta.Status = true;
                }
                else
                {
                    resposta.Mensagem = "Nenhuma reserva encontrada para o cliente";
                    resposta.Status = false;
                }
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
            }
            return resposta;
        }


        public async Task<ResponseModel<ReservaModel>> BuscarReservaPorId(int reservaId)
        {
            ResponseModel<ReservaModel> resposta = new ResponseModel<ReservaModel>();
            try
            {
                var reserva = await _context.Reserva
                            .Include(r => r.Carro)
                            .Include(r => r.Cliente)
                            .FirstOrDefaultAsync(reservaBanco => reservaBanco.Id == reservaId);
                if (reserva != null)
                {
                    resposta.Dados = reserva;
                    resposta.Mensagem = "Reserva encontrado com sucesso";
                    resposta.Status = true;
                }
                resposta.Mensagem = "Reserva não encontrado";
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

        public async Task<ResponseModel<List<ReservaModel>>> BuscarReservas()
        {
            ResponseModel<List<ReservaModel>> resposta = new ResponseModel<List<ReservaModel>>();
            try
            {
                var reserva = await _context.Reserva
                            .Include(r => r.Carro)
                            .Include(r => r.Cliente).ToListAsync();
                resposta.Dados = reserva;
                resposta.Mensagem = "Todos as Reservas Foram Coletados";
                resposta.Status = true;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
            }
            return resposta;
        }

        public async Task<ResponseModel<List<ReservaModel>>> CriarReserva(CriarReservaDto criarReservaDto)
        {
            ResponseModel<List<ReservaModel>> resposta = new ResponseModel<List<ReservaModel>>();
            try
            {
                var carro = await _context.Carro
                    .FirstOrDefaultAsync(c => c.Id == criarReservaDto.CarroId);

                if (carro == null)
                {
                    resposta.Mensagem = "Carro não encontrado.";
                    resposta.Status = false;
                    return resposta;
                }

                if (!carro.Status)
                {
                    resposta.Mensagem = "O carro não está disponível para reserva.";
                    resposta.Status = false;
                    return resposta;
                }

                var reserva = new ReservaModel()
                {
                    CarroId = criarReservaDto.CarroId,
                    ClienteId = criarReservaDto.ClienteId,
                    DataInicio = criarReservaDto.DataInicio,
                    DataFim = criarReservaDto.DataFim,
                    ValorReserva = criarReservaDto.ValorReserva,
                };

                _context.Add(reserva);

                // Atualiza o status do carro para indisponível
                carro.Status = false;
                _context.Update(carro);

                await _context.SaveChangesAsync();

                resposta.Dados = await _context.Reserva
                    .Include(r => r.Carro)
                    .Include(r => r.Cliente)
                    .ToListAsync();
                resposta.Mensagem = "Reserva criada com sucesso";
                resposta.Status = true;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
            }
            return resposta;
        }

        public async Task<ResponseModel<List<ReservaModel>>> EditarReserva(EditarReservaDto editarReservaDto)
        {
            ResponseModel<List<ReservaModel>> resposta = new ResponseModel<List<ReservaModel>>();
            try
            {

                var reserva = await _context.Reserva
                    .Include(r => r.Carro)
                    .Include(r => r.Cliente)
                    .FirstOrDefaultAsync(r => r.Id == editarReservaDto.Id);
                if (reserva == null)
                {
                    resposta.Mensagem = "Nenhum reserva Localizado";
                    return resposta;
                }

                reserva.CarroId = editarReservaDto.CarroId;
                reserva.ClienteId = editarReservaDto.ClienteId;
                reserva.DataInicio = editarReservaDto.DataInicio;
                reserva.DataFim = editarReservaDto.DataFim;
                reserva.ValorReserva = editarReservaDto.ValorReserva;

                _context.Update(reserva);
                await _context.SaveChangesAsync();
                reserva = await _context.Reserva
                    .Include(r => r.Carro)
                    .Include(r => r.Cliente)
                    .FirstOrDefaultAsync(r => r.Id == editarReservaDto.Id);
                resposta.Dados = await _context.Reserva.ToListAsync();
                resposta.Mensagem = "Dados Atualizados";
                return resposta;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
            }
            return resposta;
        }

        public async Task<ResponseModel<List<ReservaModel>>> RemoverReserva(int reservaId)
        {
            ResponseModel<List<ReservaModel>> resposta = new ResponseModel<List<ReservaModel>>();
            try
            {

                var reserva = await _context.Reserva
                    .Include(r => r.Carro)
                    .FirstOrDefaultAsync(r => r.Id == reservaId);
                if (reserva == null)
                {
                    resposta.Mensagem = "Nenhum reserva Localizado";
                    return resposta;
                }

                reserva.Carro.Status = true;

                _context.Remove(reserva);
                await _context.SaveChangesAsync();
                resposta.Dados = await _context.Reserva.ToListAsync();
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
