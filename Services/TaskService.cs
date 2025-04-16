using MongoDB.Driver;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Services
{
    public class TaskService
    {
        private readonly IMongoCollection<TaskItem> _tasks;

        public TaskService(IConfiguration config)
        {
            var client = new MongoClient(config["MongoDB:ConnectionString"]);
            var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
            _tasks = database.GetCollection<TaskItem>(config["MongoDB:CollectionName"]);
        }

        public async Task<List<TaskItem>> GetAsync() =>
            await _tasks.Find(_ => true).ToListAsync();

        public async Task<TaskItem?> GetAsync(string id) =>
            await _tasks.Find(t => t.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(TaskItem task) =>
            await _tasks.InsertOneAsync(task);

        public async Task UpdateAsync(string id, TaskItem taskIn) =>
            await _tasks.ReplaceOneAsync(t => t.Id == id, taskIn);

        public async Task RemoveAsync(string id) =>
            await _tasks.DeleteOneAsync(t => t.Id == id);
    }
}
