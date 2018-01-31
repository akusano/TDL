namespace TDL_API.Models
{
    using System.Data.Entity;

    public partial class DbModels : DbContext
    {
        public DbModels()
            : base("name=DbModels")
        {
        }

        public virtual DbSet<Tasks> Tasks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tasks>()
                .Property(e => e.Name)
                .IsUnicode(false);
        }
    }
}
