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

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<TaskItem>> Get(string id)
        {
            var task = await _taskService.GetAsync(id);
            if (task is null) return NotFound();
            return task;
        }

        [HttpPost]
        public async Task<IActionResult> Create(TaskItem newTask)
        {
            await _taskService.CreateAsync(newTask);
            return CreatedAtAction(nameof(Get), new { id = newTask.Id }, newTask);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, TaskItem updatedTask)
        {
            var task = await _taskService.GetAsync(id);
            if (task is null) return NotFound();

            updatedTask.Id = task.Id;
            await _taskService.UpdateAsync(id, updatedTask);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var task = await _taskService.GetAsync(id);
            if (task is null) return NotFound();

            await _taskService.RemoveAsync(id);
            return NoContent();
        }
    }
}
