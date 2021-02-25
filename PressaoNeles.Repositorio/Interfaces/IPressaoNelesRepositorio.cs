using System.Threading.Tasks;

namespace PressaoNeles.Repositorio.Interfaces
{
    public interface IPressaoNelesRepositorio
    {
        void Adicionar<T>(T entidade) where T : class;
        void Atualizar<T>(T entidade) where T : class;
        void Excluir<T>(T entidade) where T : class;
        Task<bool> SalvarMudancas();
    }
}