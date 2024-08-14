using Reserva.Model;
using Microsoft.AspNetCore.Mvc;
using SistemaAluguelCarros.Dto.Reserva;
using SistemaAluguelCarros.Model;
using SistemaAluguelCarros.Services.Reserva;

namespace SistemaAluguelCarros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        private readonly IReservaInterface _reservaInterface;

        public ReservaController(IReservaInterface reservaInterface)
        {
            _reservaInterface = reservaInterface;
        }

        [HttpGet("BuscarReservas")]
        public async Task<ActionResult<ResponseModel<List<ReservaModel>>>> BuscarReservas()
        {
            var Reservas = await _reservaInterface.BuscarReservas();
            if (Reservas.Status)
            {
                return Ok(Reservas);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, Reservas);
            }
        }

        [HttpGet("BuscarReservaPorId/{reservaId}")]
        public async Task<ActionResult<ResponseModel<ReservaModel>>> BuscarReservaPorId(int reservaId)
        {
            var reserva = await _reservaInterface.BuscarReservaPorId(reservaId);
            if (reserva.Status)
            {
                return Ok(reserva);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, reserva);
            }
        }

        [HttpGet("BuscarPorIdCliente/{clienteId}")]
        public async Task<ActionResult<ResponseModel<ReservaModel>>> BuscarPorIdCliente(int clienteId)
        {
            var reserva = await _reservaInterface.BuscarPorIdCliente(clienteId);
            if (reserva.Status)
            {
                return Ok(reserva);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, reserva);
            }
        }

        [HttpGet("BuscarPorIdCarro/{carroId}")]
        public async Task<ActionResult<ResponseModel<ReservaModel>>> BuscarPorIdCarro(int carroId)
        {
            var reserva = await _reservaInterface.BuscarPorIdCarro(carroId);
            if (reserva.Status)
            {
                return Ok(reserva);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, reserva);
            }
        }

        [HttpPost("CriarReserva")]
        public async Task<ActionResult<List<ResponseModel<ReservaModel>>>> CriarReserva(CriarReservaDto criarReservaDto)
        {
            var reserva = await _reservaInterface.CriarReserva(criarReservaDto);
            if (reserva.Status)
            {
                return Ok(reserva);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, reserva);
            }
        }

        [HttpPut("EditarReserva")]
        public async Task<ActionResult<List<ResponseModel<ReservaModel>>>> EditarReserva(EditarReservaDto editarReservaDto)
        {
            var reserva = await _reservaInterface.EditarReserva(editarReservaDto);
            if (reserva.Status)
            {
                return Ok(reserva);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, reserva);
            }
        }

        [HttpDelete("RemoverReserva")]
        public async Task<ActionResult<List<ResponseModel<ReservaModel>>>> RemoverReserva(int reservaId)
        {
            var reserva = await _reservaInterface.RemoverReserva(reservaId);
            if (reserva.Status)
            {
                return Ok(reserva);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, reserva);
            }
        }

    }
}

