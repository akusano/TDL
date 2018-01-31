using System;

namespace TDL_WPF.Model
{
    public class MTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Done { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? ConclusionDate { get; set; }
    }
}