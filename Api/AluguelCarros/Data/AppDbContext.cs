using Carro.Model;
using Cliente.Model;
using Reserva.Model;
using Microsoft.EntityFrameworkCore;

namespace SistemaAluguelCarros.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<CarroModel> Carro { get; set; }
    public DbSet<ClienteModel> Cliente { get; set; }
    public DbSet<ReservaModel> Reserva { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<ReservaModel>()
          .HasOne(r => r.Carro)
          .WithMany()
          .HasForeignKey(r => r.CarroId)
          .OnDelete(DeleteBehavior.Restrict);

      modelBuilder.Entity<ReservaModel>()
          .HasOne(r => r.Cliente)
          .WithMany()
          .HasForeignKey(r => r.ClienteId)
          .OnDelete(DeleteBehavior.Restrict);
    }
  }

}
