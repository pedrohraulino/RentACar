using Cliente.Model;
using Microsoft.AspNetCore.Mvc;
using SistemaAluguelCarros.Dto.Cliente;
using SistemaAluguelCarros.Model;
using SistemaAluguelCarros.Services.Cliente;

namespace SistemaAluguelCarros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteInterface _clienteInterface;

        public ClienteController(IClienteInterface clienteInterface)
        {
            _clienteInterface = clienteInterface;
        }

        [HttpGet("BuscarClientes")]
        public async Task<ActionResult<ResponseModel<List<ClienteModel>>>> BuscarClientes()
        {
            var clientes = await _clienteInterface.BuscarClientes();
            if (clientes.Status)
            {
                return Ok(clientes);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, clientes);
            }
        }

        [HttpGet("BuscarClientePorId/{clienteId}")]
        public async Task<ActionResult<ResponseModel<ClienteModel>>> BuscarClientePorId(int clienteId)
        {
            var cliente = await _clienteInterface.BuscarClientePorId(clienteId);
            if (cliente.Status)
            {
                return Ok(cliente);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, cliente);
            }
        }


        [HttpPost("CriarCliente")]
        public async Task<ActionResult<List<ResponseModel<ClienteModel>>>> CriarCliente(CriarClienteDto criarClienteDto)
        {
            var cliente = await _clienteInterface.CriarCliente(criarClienteDto);
            if (cliente.Status)
            {
                return Ok(cliente);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, cliente);
            }
        }

        [HttpPut("EditarCliente")]
        public async Task<ActionResult<List<ResponseModel<ClienteModel>>>> EditarCliente(EditarClienteDto editarClienteDto)
        {
            var cliente = await _clienteInterface.EditarCliente(editarClienteDto);
            if (cliente.Status)
            {
                return Ok(cliente);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, cliente);
            }
        }

        [HttpDelete("RemoverCliente")]
        public async Task<ActionResult<List<ResponseModel<ClienteModel>>>> RemoverCliente(int clienteId)
        {
            var cliente = await _clienteInterface.RemoverCliente(clienteId);
            if (cliente.Status)
            {
                return Ok(cliente);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, cliente);
            }
        }

    }
}

