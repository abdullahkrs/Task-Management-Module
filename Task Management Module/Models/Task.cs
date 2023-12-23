using System;
using System.ComponentModel.DataAnnotations;
namespace Task_Management_Module.Models
{
    public class Task
    {
            [Key]
            public int Id { get; set; }

            [Required]
            public string TaskTitle { get; set; }

            public string TaskDesc { get; set; }

            [Required]
            public string TaskUser { get; set; }

            public string TaskStatus { get; set; }

            [Required]
            public string CreatedBy { get; set; }

            
            public DateTime CreatedDate { get; set; } = DateTime.Now;

            public string ApprovedBy { get; set; }
            public string ApproveStatus { get; set; }

            public DateTime? ApprovedDate { get; set; }

        public string AdminRemarks { get; set; }
        
    }

    public class editTask
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string TaskTitle { get; set; }

        public string TaskDesc { get; set; }

        [Required]
        public string TaskUser { get; set; }

        public string TaskStatus { get; set; }

    }


    public class approveTask
    {
        [Key]
        public int Id { get; set; }

        public string TaskStatus { get; set; }

        public string ApproveStatus { get; set; }
        public string ApprovedBy { get; set; }

        public DateTime ApprovedDate { get; set; } = DateTime.Now;

        public string AdminRemarks { get; set; }

    }
}
