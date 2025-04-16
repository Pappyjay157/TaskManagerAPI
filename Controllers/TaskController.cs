using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Models;
using TaskManagerAPI.Services;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskItem>>> Get() =>
            await _taskService.GetAsync();

        [HttpPost]
        public async Task<IActionResult> Create(TaskItem newTask)
        {
            await _taskService.CreateAsync(newTask);
            return CreatedAtAction(nameof(Get), new { id = newTask.Id }, newTask);
        }
    }
}
