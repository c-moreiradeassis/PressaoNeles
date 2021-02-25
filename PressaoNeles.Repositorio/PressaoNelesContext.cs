using Microsoft.EntityFrameworkCore;
using PressaoNeles.Dominio;

namespace PressaoNeles.Repositorio
{
    public class PressaoNelesContext : DbContext
    {
        public PressaoNelesContext(DbContextOptions<PressaoNelesContext> options) : base(options) { }

        public DbSet<Partido> Partido { get; set; }
        public DbSet<Deputado> Deputado { get; set; }
    }
}