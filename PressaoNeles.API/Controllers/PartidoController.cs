using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PressaoNeles.Dominio;
using PressaoNeles.Repositorio.Interfaces;

namespace PressaoNeles.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PartidoController : ControllerBase
    {
        private readonly IPressaoNelesRepositorio _pressaoNelesRepositorio;
        private readonly IPartidoRepositorio _partidoRepositorio;

        public PartidoController(IPressaoNelesRepositorio pressaoNelesRepositorio, IPartidoRepositorio partidoRepositorio)
        {
            _pressaoNelesRepositorio = pressaoNelesRepositorio;
            _partidoRepositorio = partidoRepositorio;
        }

        public async Task<IActionResult> Get()
        {
            try
            {
                var resultado = await _partidoRepositorio.ListarTodos();

                return Ok(resultado);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar os partidos.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Partido model)
        {
            try
            {
                _pressaoNelesRepositorio.Adicionar(model);

                if (await _pressaoNelesRepositorio.SalvarMudancas())
                {
                    return Created($"/api/partido/{model.Id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao adicionar o partido.");
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Partido model)
        {
            try
            {
                var partido = _partidoRepositorio.ListarPartido(id);

                if (partido == null) return NotFound();

                _pressaoNelesRepositorio.Atualizar(model);

                if (await _pressaoNelesRepositorio.SalvarMudancas())
                {
                    return Created($"/api/partido/{model.Id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar o partido.");
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                Partido partido = _partidoRepositorio.ListarPartido(id).Result;

                if (partido == null) return NotFound();

                _pressaoNelesRepositorio.Excluir(partido);

                if (await _pressaoNelesRepositorio.SalvarMudancas())
                {
                    return Ok();
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao excluir partido.");
            }

            return BadRequest();
        }
    }
}