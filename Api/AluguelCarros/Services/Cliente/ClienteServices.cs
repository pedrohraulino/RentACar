using SistemaAluguelCarros.Dto.Cliente;
using SistemaAluguelCarros.Model;
using Cliente.Model;
using Microsoft.EntityFrameworkCore;
using SistemaAluguelCarros.Data;

namespace SistemaAluguelCarros.Services.Cliente
{
    public class ClienteService : IClienteInterface
    {
        private readonly AppDbContext _context;

        public ClienteService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseModel<ClienteModel>> BuscarClientePorId(int clienteId)
        {
            ResponseModel<ClienteModel> resposta = new ResponseModel<ClienteModel>();
            try
            {
                var cliente = await _context.Cliente.FirstOrDefaultAsync(clienteBanco => clienteBanco.Id == clienteId);
                if (cliente != null)
                {
                    resposta.Dados = cliente;
                    resposta.Mensagem = "Cliente encontrado com sucesso";
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

        public async Task<ResponseModel<List<ClienteModel>>> BuscarClientes()
        {
            ResponseModel<List<ClienteModel>> resposta = new ResponseModel<List<ClienteModel>>();
            try
            {
                var cliente = await _context.Cliente.ToListAsync();
                resposta.Dados = cliente;
                resposta.Mensagem = "Todos os cliente Foram Coletados";
                resposta.Status = true;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
            }
            return resposta;
        }

        public async Task<ResponseModel<List<ClienteModel>>> CriarCliente(CriarClienteDto criarClienteDto)
        {
            ResponseModel<List<ClienteModel>> resposta = new ResponseModel<List<ClienteModel>>();
            try
            {
                bool cnhExiste = await _context.Cliente
                    .AsNoTracking()
                    .AnyAsync(c => c.CNH == criarClienteDto.CNH);

                if (cnhExiste)
                {
                    resposta.Mensagem = "Já existe um cliente com a CNH informada.";
                    resposta.Status = false;
                    return resposta;
                }

                var cliente = new ClienteModel()
                {
                    Nome = criarClienteDto.Nome,
                    Contato = criarClienteDto.Contato,
                    CNH = criarClienteDto.CNH,
                };

                _context.Add(cliente);
                await _context.SaveChangesAsync();

                resposta.Dados = await _context.Cliente.ToListAsync();
                resposta.Mensagem = "Cliente Criado com Sucesso";
                return resposta;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
                return resposta;
            }
        }
        public async Task<ResponseModel<List<ClienteModel>>> EditarCliente(EditarClienteDto editarClienteDto)
        {
            ResponseModel<List<ClienteModel>> resposta = new ResponseModel<List<ClienteModel>>();
            try
            {
                var cliente = await _context.Cliente.FirstOrDefaultAsync(clienteBanco => clienteBanco.Id == editarClienteDto.Id);
                if (cliente == null)
                {
                    resposta.Mensagem = "Nenhum cliente localizado com o ID fornecido.";
                    resposta.Status = false;
                    return resposta;
                }

                bool cnhExiste = await _context.Cliente
                    .AsNoTracking()
                    .AnyAsync(c => c.CNH == editarClienteDto.CNH && c.Id != editarClienteDto.Id);

                if (cnhExiste)
                {
                    resposta.Mensagem = "Já existe um cliente com a CNH informada.";
                    resposta.Status = false;
                    return resposta;
                }

                cliente.Nome = editarClienteDto.Nome;
                cliente.Contato = editarClienteDto.Contato;
                cliente.CNH = editarClienteDto.CNH;

                _context.Update(cliente);
                await _context.SaveChangesAsync();

                resposta.Dados = await _context.Cliente.ToListAsync();
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

        public async Task<ResponseModel<List<ClienteModel>>> RemoverCliente(int clienteId)
        {
            ResponseModel<List<ClienteModel>> resposta = new ResponseModel<List<ClienteModel>>();
            try
            {
                var cliente = await _context.Cliente
                .FirstOrDefaultAsync(clienteBanco => clienteBanco.Id == clienteId);
                if (cliente == null)
                {
                    resposta.Mensagem = "Nenhum cliente Localizado";
                    return resposta;
                }
                _context.Remove(cliente);
                await _context.SaveChangesAsync();
                resposta.Dados = await _context.Cliente.ToListAsync();
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
