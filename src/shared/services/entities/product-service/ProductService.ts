import type { Product } from "@/shared/interfaces";
import { handleApiError } from "../../axios/errorHandler";
import api from "../../axios/api";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get<Product[]>("/products");
    return data;
  } catch (error) {
    handleApiError(error, "Erro ao buscar produtos");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, "Erro ao buscar produto");
  }
};

export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  try {
    const { data } = await api.post<Product>("/products", product);
    return data;
  } catch (error) {
    handleApiError(error, "Erro ao criar produto");
  }
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  try {
    const { data } = await api.put<Product>(`/products/${id}`, product);
    return data;
  } catch (error) {
    handleApiError(error, "Erro ao atualizar produto");
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar produto");
  }
};
