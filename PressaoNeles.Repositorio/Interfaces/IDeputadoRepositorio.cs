using System.Threading.Tasks;
using PressaoNeles.Dominio;

namespace PressaoNeles.Repositorio.Interfaces
{
    public interface IDeputadoRepositorio
    {
         Task<Deputado[]> ListarTodos();
         Task<Deputado> ListarDeputado(int id);
    }
}