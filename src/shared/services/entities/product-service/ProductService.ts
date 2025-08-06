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

export const updateProduct = async (
  id: number,
  product: Partial<Product>
): Promise<Product> => {
  try {
    const { data } = await api.put<Product>(`/products/${id}`, product);
    return data;
  } catch (error) {
    handleApiError(error, "Erro ao atualizar produto");
  }
};