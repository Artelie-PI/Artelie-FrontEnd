export function getProductImage(product) {
  if (!product) return null;

  // diretos
  if (product.image) return product.image;
  if (product.Image) return product.Image;
  if (product.image_url) return product.image_url;

  // arrays típicos
  const arrays = [product.Images, product.images, product.photos, product.Photos, product.media, product.Media, product.gallery];
  for (const arr of arrays) {
    if (arr && Array.isArray(arr) && arr.length > 0) {
      const f = arr[0];
      if (!f) continue;
      if (f.image) return f.image;
      if (f.Image) return f.Image;
      if (f.url) return f.url;
      if (f.src) return f.src;
      if (f.file) return f.file;
      if (f.image_url) return f.image_url;
      if (f.path) return f.path;
    }
  }

  // aninhados comuns
  const nested = [product.thumbnail, product.cover, product.primary_image, product.main_image, product.picture];
  for (const n of nested) {
    if (n?.url) return n.url;
    if (n?.src) return n.src;
    if (n?.image) return n.image;
  }

  return null;
}

function normalizeBrand(brandField, brandMap) {
  if (!brandField && brandField !== 0) return '';
  if (typeof brandField === 'object') return String(brandField?.name || '').trim();
  if (typeof brandField === 'number') {
    const found = brandMap?.get?.(Number(brandField));
    return String(found ?? brandField).trim();
  }
  return String(brandField).trim();
}

export function formatProduct(product, brandMap) {
  const image = getProductImage(product);
  const price = Number(product.price);

  return {
    id: product.id,
    title: product.name || product.title,
    image,
    price,
    installmentText: Number.isFinite(price)
      ? `Até 4x de R$ ${(price / 4).toFixed(2).replace('.', ',')} sem juros`
      : '',
    description: product.description,
    stock: product.stock,
    category: product.category,
    brand: normalizeBrand(product.brand, brandMap),
    // material (se existir em algum lugar)
    material: product.material || product.line || product.Material || null,
  };
}

export function formatPrice(value) {
  const numValue = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(numValue) ? numValue.toFixed(2).replace('.', ',') : '0,00';
}
