import categoriesData from '@/services/mockData/categories.json';

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  // Simulate API delay
  delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.categories];
  }

  async getById(id) {
    await this.delay();
    const category = this.categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  }

  async create(categoryData) {
    await this.delay();
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id)) + 1,
      ...categoryData,
      taskCount: 0
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Category not found');
    }
    this.categories[index] = { ...this.categories[index], ...updates };
    return { ...this.categories[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Category not found');
    }
    const deletedCategory = this.categories.splice(index, 1)[0];
    return { ...deletedCategory };
  }

  async updateTaskCount(categoryName, count) {
    await this.delay();
    const category = this.categories.find(c => c.name === categoryName);
    if (category) {
      category.taskCount = count;
      return { ...category };
    }
    return null;
  }
}

export default new CategoryService();