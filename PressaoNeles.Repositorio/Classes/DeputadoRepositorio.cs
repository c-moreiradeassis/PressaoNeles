using System.Linq;
using System.Threading.Tasks;
using PressaoNeles.Dominio;
using PressaoNeles.Repositorio.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace PressaoNeles.Repositorio.Classes
{
    public class DeputadoRepositorio : IDeputadoRepositorio
    {
        private readonly PressaoNelesContext _contexto;
        public DeputadoRepositorio(PressaoNelesContext contexto)
        {
            _contexto = contexto;

            _contexto.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Deputado[]> ListarTodos()
        {
            IQueryable<Deputado> resultado = _contexto.Deputado;

            return await resultado.ToArrayAsync();
        }
        public async Task<Deputado> ListarDeputado(int id)
        {
            IQueryable<Deputado> resultado = _contexto.Deputado.Where(c => c.Id == id);

            return await resultado.FirstOrDefaultAsync();
        }
     }
}