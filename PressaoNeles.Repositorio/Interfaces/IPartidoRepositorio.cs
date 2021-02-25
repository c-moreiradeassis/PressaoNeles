using System.Threading.Tasks;
using PressaoNeles.Dominio;

namespace PressaoNeles.Repositorio.Interfaces
{
    public interface IPartidoRepositorio
    {
         Task<Partido[]> ListarTodos();
         Task<Partido> ListarPartido(int id);
    }
}