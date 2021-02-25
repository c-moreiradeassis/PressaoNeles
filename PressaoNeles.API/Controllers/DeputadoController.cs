using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PressaoNeles.Dominio;
using PressaoNeles.Repositorio.Interfaces;

namespace PressaoNeles.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeputadoController : ControllerBase
    {
        private readonly IPressaoNelesRepositorio _pressaoNelesRepositorio;
        private readonly IDeputadoRepositorio _deputadoRepositorio;
        public DeputadoController(IPressaoNelesRepositorio pressaoNelesRepositorio, IDeputadoRepositorio deputadoRepositorio)
        {
            _deputadoRepositorio = deputadoRepositorio;
            _pressaoNelesRepositorio = pressaoNelesRepositorio;
        }

        public async Task<IActionResult> Get()
        {
            try
            {
                var resultado = await _deputadoRepositorio.ListarTodos();

                return Ok(resultado);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar os deputados.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Deputado deputado)
        {
            try
            {
                _pressaoNelesRepositorio.Adicionar(deputado);

                if (await _pressaoNelesRepositorio.SalvarMudancas())
                {
                    return Created($"/api/deputado/{deputado.Id}", deputado);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao cadastrar o deputado.");
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Deputado deputado)
        {
            try
            {
                var resultado = _deputadoRepositorio.ListarDeputado(id);
                if (resultado == null) return NotFound();

                _pressaoNelesRepositorio.Atualizar(deputado);

                if (await _pressaoNelesRepositorio.SalvarMudancas())
                {
                    return Created($"/api/deputado/{deputado.Id}", deputado);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar o deputado.");
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deputado = _deputadoRepositorio.ListarDeputado(id);
                if (deputado == null) return NotFound();

                _pressaoNelesRepositorio.Excluir(deputado);

                if (await _pressaoNelesRepositorio.SalvarMudancas())
                {
                    return Ok();
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao excluir o deputado.");
            }

            return BadRequest();
        }
    }
}