namespace TDL_API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

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
