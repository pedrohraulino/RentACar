using Carro.Model;
using Microsoft.AspNetCore.Mvc;
using SistemaAluguelCarros.Dto.Carro;
using SistemaAluguelCarros.Model;
using SistemaAluguelCarros.Services.Carro;

namespace SistemaAluguelCarros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarroController : ControllerBase
    {
        private readonly ICarroInterface _carroInterface;

        public CarroController(ICarroInterface carronInterface)
        {
            _carroInterface = carronInterface;
        }

        [HttpGet("BuscarCarros")]
        public async Task<ActionResult<ResponseModel<List<CarroModel>>>> BuscarCarros()
        {
            var carros = await _carroInterface.BuscarCarros();
            if (carros.Status)
            {
                return Ok(carros);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, carros);
            }
        }

        [HttpGet("BuscarCarroPorId/{carroId}")]
        public async Task<ActionResult<ResponseModel<CarroModel>>> BuscarCarroPorId(int carroId)
        {
            var Carro = await _carroInterface.BuscarCarroPorId(carroId);
            if (Carro.Status)
            {
                return Ok(Carro);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, Carro);
            }
        }


        [HttpPost("CriarCarro")]
        public async Task<ActionResult<List<ResponseModel<CarroModel>>>> CriarCarro(CriarCarroDto criarCarroDto)
        {
            var carro = await _carroInterface.CriarCarro(criarCarroDto);
            if (carro.Status)
            {
                return Ok(carro);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, carro);
            }
        }

        [HttpPut("EditarCarro")]
        public async Task<ActionResult<List<ResponseModel<CarroModel>>>> EditarCarro(EditarCarroDto editarCarroDto)
        {
            var carro = await _carroInterface.EditarCarro(editarCarroDto);
            if (carro.Status)
            {
                return Ok(carro);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, carro);
            }
        }

        [HttpDelete("RemoverCarro")]
        public async Task<ActionResult<List<ResponseModel<CarroModel>>>> RemoverCarro(int carroId)
        {
            var carro = await _carroInterface.RemoverCarro(carroId);
            if (carro.Status)
            {
                return Ok(carro);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, carro);
            }
        }

    }
}

