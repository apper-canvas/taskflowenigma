import tasksData from '@/services/mockData/tasks.json';

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay();
    const task = this.tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  }

  async create(taskData) {
    await this.delay();
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id)) + 1,
      ...taskData,
      completed: false,
      archived: false,
      createdAt: new Date().toISOString(),
      order: this.tasks.length + 1
    };
    this.tasks.push(newTask);
    return { ...newTask };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Task not found');
    }
    this.tasks[index] = { ...this.tasks[index], ...updates };
    return { ...this.tasks[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Task not found');
    }
    const deletedTask = this.tasks.splice(index, 1)[0];
    return { ...deletedTask };
  }

  async getByCategory(category) {
    await this.delay();
    return this.tasks.filter(t => t.category === category);
  }

  async getByPriority(priority) {
    await this.delay();
    return this.tasks.filter(t => t.priority === priority);
  }

  async getActive() {
    await this.delay();
    return this.tasks.filter(t => !t.completed && !t.archived);
  }

  async getCompleted() {
    await this.delay();
    return this.tasks.filter(t => t.completed && !t.archived);
  }

  async getArchived() {
    await this.delay();
    return this.tasks.filter(t => t.archived);
  }

  async toggleComplete(id) {
    await this.delay();
    const task = this.tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error('Task not found');
    }
    task.completed = !task.completed;
    return { ...task };
  }

  async archive(id) {
    await this.delay();
    const task = this.tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error('Task not found');
    }
    task.archived = true;
    return { ...task };
  }

  async restore(id) {
    await this.delay();
    const task = this.tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error('Task not found');
    }
    task.archived = false;
    return { ...task };
  }

  async reorder(tasks) {
    await this.delay();
    tasks.forEach((task, index) => {
      const existingTask = this.tasks.find(t => t.Id === task.Id);
      if (existingTask) {
        existingTask.order = index + 1;
      }
    });
    return this.tasks.sort((a, b) => a.order - b.order);
  }
}

export default new TaskService();