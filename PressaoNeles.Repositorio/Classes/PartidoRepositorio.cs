using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PressaoNeles.Dominio;
using PressaoNeles.Repositorio.Interfaces;

namespace PressaoNeles.Repositorio.Classes
{
    public class PartidoRepositorio : IPartidoRepositorio
    {
        private readonly PressaoNelesContext _contexto;

        public PartidoRepositorio(PressaoNelesContext contexto)
        {
            _contexto = contexto;
            _contexto.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Partido> ListarPartido(int id)
        {
            IQueryable<Partido> resultado = _contexto.Partido;

            resultado = resultado.Where(c => c.Id == id);

            return await resultado.FirstOrDefaultAsync();
        }

        public async Task<Partido[]> ListarTodos()
        {
            IQueryable<Partido> resultado = _contexto.Partido;

            return await resultado.ToArrayAsync();
        }
    }
}
