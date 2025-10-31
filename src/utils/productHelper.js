// src/utils/productHelper.js

export function getProductImage(product) {
  if (product.image) return product.image;
  if (product.Image) return product.Image;
  if (product.Images && Array.isArray(product.Images) && product.Images.length > 0) {
    const firstImage = product.Images[0];
    return firstImage.image || firstImage.Image || null;
  }
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    const firstImage = product.images[0];
    return firstImage.image || firstImage.Image || null;
  }
  
  return null;
}

/**
 * Formata um produto da API para o formato usado no frontend
 */
export function formatProduct(product) {
  const image = getProductImage(product);
  const price = parseFloat(product.price);
  
  return {
    id: product.id,
    title: product.name,
    image: image,
    price: price,
    installmentText: `Até 4x de R$ ${(price / 4).toFixed(2).replace('.', ',')} sem juros`,
    description: product.description,
    stock: product.stock,
    category: product.category,
    brand: product.brand,
  };
}

/**
 * Formata o preço para exibição
 */
export function formatPrice(value) {
  const numValue = typeof value === 'number' ? value : parseFloat(value);
  return numValue.toFixed(2).replace('.', ',');
}