using System.Threading.Tasks;
using PressaoNeles.Repositorio.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace PressaoNeles.Repositorio.Classes
{
    public class PressaoNelesRepositorio : IPressaoNelesRepositorio
    {
        private readonly PressaoNelesContext _contexto;

        public PressaoNelesRepositorio(PressaoNelesContext contexto)
        {
            _contexto = contexto;
        }

        public void Adicionar<T>(T entidade) where T : class
        {
            _contexto.Add(entidade);
        }

        public void Atualizar<T>(T entidade) where T : class
        {
            _contexto.Update(entidade);
        }

        public void Excluir<T>(T entidade) where T : class
        {
            _contexto.Remove(entidade);
        }

        public async Task<bool> SalvarMudancas()
        {
            return (await _contexto.SaveChangesAsync()) > 0;
        }
    }
}