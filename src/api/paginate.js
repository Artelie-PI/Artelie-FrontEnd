import apiClient from '@/axios';

// Busca todas as páginas de um endpoint paginado do DRF.
// Aceita url relativa (ex: '/products/') e params opcionais.
// Retorna um array único com todos os itens.
export async function fetchAllPages(url, params = {}) {
  let results = [];
  let nextUrl = url;
  let nextParams = { ...params };

  while (nextUrl) {
    const { data } = await apiClient.get(nextUrl, { params: nextParams });

    if (Array.isArray(data)) {
      // Caso o backend não pagine e já retorne um array
      results = data;
      break;
    }

    const pageResults = Array.isArray(data.results) ? data.results : [];
    results = results.concat(pageResults);

    // DRF costuma retornar 'next' como URL absoluta; remove baseURL para manter cliente consistente
    nextUrl = data.next ? data.next.replace(apiClient.defaults.baseURL || '', '') : null;
    // Depois da primeira, params passam a ser parte da própria next
    nextParams = {};
  }

  return results;
}
