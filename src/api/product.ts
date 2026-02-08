import type { IProductCard } from "../components/catalog/product/ProductCard.type";
export const fetchProductById = async (
  id: number,
): Promise<IProductCard | null> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) throw new Error(`Ошибка при загрузке товара ${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getProduct = async (id: number): Promise<IProductCard | null> => {
  return fetchProductById(id);
};
