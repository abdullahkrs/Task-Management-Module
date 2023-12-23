
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Task_Management_Module.Data;
using Task_Management_Module.Models;

namespace Task_Management_Module.Controllers
{
    public class TasksController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult AddTask([FromBody] Task task)
        {
            if (ModelState.IsValid)
            {
                _context.Tasks.Add(task);
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors) });
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var tasks = _context.Tasks.ToList();
            return Json(tasks);
        }

        [HttpGet]
        public IActionResult GetTasksByUser(string username)
        {
            var tasks = _context.Tasks.Where(t => t.TaskUser == username).ToList();
            return Json(tasks);
        }

        [HttpPost]
        public IActionResult UpdateTask([FromBody] editTask updatedtask)
        {
            var task = _context.Tasks.Find(updatedtask.Id);

            if (task == null)
            {
                return NotFound(); // Task not found
            }

            task.TaskTitle = updatedtask.TaskTitle;
            task.TaskDesc = updatedtask.TaskDesc;
            task.TaskUser = updatedtask.TaskUser;
            task.TaskStatus = updatedtask.TaskStatus;

            _context.SaveChanges();

            return Ok(); // Task updated successfully
        }

        [HttpPost]
        public IActionResult ApproveTask([FromBody] approveTask updatedtask)
        {
            var task = _context.Tasks.Find(updatedtask.Id);

            if (task == null)
            {
                return NotFound(); // Task not found
            }

            
            task.TaskStatus = updatedtask.TaskStatus;
            
            task.ApproveStatus = updatedtask.ApproveStatus;
            task.ApprovedBy = updatedtask.ApprovedBy;
            task.AdminRemarks = updatedtask.AdminRemarks;

            _context.SaveChanges();

            return Ok(); // Task updated successfully
        }




    }



}
