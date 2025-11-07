import { enrichProductWithImage } from '@/utils/imageMapping'

export function formatProduct(product) {
  const p = enrichProductWithImage(product)
  const title = p.name || p.title || ''
  const price = typeof p.price === 'string' ? parseFloat(p.price) : p.price

  return {
    id: p.id,
    title,
    image: p.image,
    price,
    installmentText: price
      ? `Até 4x de R$ ${(price / 4).toFixed(2).replace('.', ',')} sem juros`
      : '',
    description: p.description,
    stock: p.stock,
    category: p.category,
    brand: p.brand,
  }
}

export function formatPrice(value) {
  const numValue = typeof value === 'number' ? value : parseFloat(value)
  return Number.isFinite(numValue) ? numValue.toFixed(2).replace('.', ',') : '0,00'
}
