const API_BASE = 'https://fakestoreapi.com';

export const api = {
  async getProducts(): Promise<import('../types/product').Product[]> {
    const response = await fetch(`${API_BASE}/products`);
    return response.json();
  },

  async getProduct(id: number): Promise<import('../types/product').Product> {
    const response = await fetch(`${API_BASE}/products/${id}`);
    return response.json();
  },

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE}/products/categories`);
    return response.json();
  },

  async getProductsByCategory(category: string): Promise<import('../types/product').Product[]> {
    const response = await fetch(`${API_BASE}/products/category/${category}`);
    return response.json();
  },
};