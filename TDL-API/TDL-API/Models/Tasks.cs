namespace TDL_API.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public partial class Tasks
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; }

        public bool Done { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime? ConclusionDate { get; set; }
    }
}
