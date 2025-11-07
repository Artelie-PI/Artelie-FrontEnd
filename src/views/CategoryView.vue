<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchProductsByCategoryAll, fetchCategories } from "@/api/category";
import { getBrandMap } from "@/api/brands";
import { formatProduct, getProductImage } from "@/utils/productHelper";
import CardProducts from "@/components/CardProducts.vue";
import SidebarFilter from "@/components/SidebarFilter.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

// Estado principal
const route = useRoute();
const products = ref([]);
const categories = ref([]);
const currentCategory = ref(null);
const isLoading = ref(false);
const errorMsg = ref("");

// Abertura da sidebar de filtros
const isFilterOpen = ref(false);

// Pesquisa
const search = ref("");
let searchDebounce = null;

// Filtros selecionados
const filters = reactive({
  sort: null,
  materials: [],
  brands: [],
  priceMin: null,
  priceMax: null,
});

// Facetas
const facets = reactive({
  brands: [],
  materials: [],
});

// Chips
const chips = computed(() => {
  const list = [];
  if (filters.sort) {
    const map = { az: "A-Z", za: "Z-A", new: "Novidades", price_desc: "Maior Preço", price_asc: "Menor Preço" };
    list.push({ key: "sort", label: map[filters.sort] || filters.sort, group: "sort" });
  }
  filters.materials.forEach((m) => list.push({ key: `mat:${m}`, label: m, group: "materials", value: m }));
  filters.brands.forEach((b) => list.push({ key: `br:${b}`, label: b, group: "brands", value: b }));
  if (filters.priceMin != null) list.push({ key: "pmin", label: `De R$ ${Number(filters.priceMin).toFixed(2)}`, group: "priceMin" });
  if (filters.priceMax != null) list.push({ key: "pmax", label: `Até R$ ${Number(filters.priceMax).toFixed(2)}`, group: "priceMax" });
  return list;
});

// Nome da categoria
const categoryTitle = computed(() => currentCategory.value?.name || "Categoria");

function findCategoryBySlug(slug) {
  const normalizedSlug = slug.toLowerCase().trim();
  const slugToId = {
    'papeis': 3, 'papéis': 3,
    'pintura': 5,
    'lapis-canetas': 2, 'lápis-canetas': 2, 'lapis-e-canetas': 2, 'lápis-e-canetas': 2,
    'livros-gibis': 4, 'livros-e-gibis': 4, 'livros-gib is': 4
  };
  if (slugToId[normalizedSlug]) {
    const categoryId = slugToId[normalizedSlug];
    return categories.value.find(c => c.id === categoryId);
  }
  return categories.value.find(c => {
    const categorySlug = c.name.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');
    return categorySlug.includes(normalizedSlug.replace(/-/g, ''));
  });
}

async function loadProducts() {
  isLoading.value = true;
  errorMsg.value = "";
  try {
    if (categories.value.length === 0) {
      categories.value = await fetchCategories();
    }
    const slug = route.params.slug;
    const category = findCategoryBySlug(slug);
    if (!category) {
      errorMsg.value = "Categoria não encontrada.";
      products.value = [];
      return;
    }
    currentCategory.value = category;

    // Mapa de marcas id->nome
    const brandMap = await getBrandMap();

    // Produtos e formatação com nome de marca e imagem garantidos
    const rawProducts = await fetchProductsByCategoryAll(category.id);
    products.value = rawProducts.map(p => formatProduct(p, brandMap));

    // Sanitize extra: se ainda faltar image, tenta achar no raw
    products.value = products.value.map(p => {
      if (!p.image) {
        const raw = rawProducts.find(r => r.id === p.id);
        const maybe = raw ? getProductImage(raw) : null;
        return maybe ? { ...p, image: maybe } : p;
      }
      return p;
    });

    // Facetas por nome
    const setBrands = new Set();
    const setMaterials = new Set();
    for (const p of products.value) {
      if (p.brand) setBrands.add(String(p.brand));
      if (p.material) setMaterials.add(String(p.material));
    }
    facets.brands = Array.from(setBrands).sort();
    facets.materials = Array.from(setMaterials).sort();

    // LOG opcional para inspecionar (remover em produção)
    // console.table(rawProducts.slice(0, 10).map(r => ({
    //   id: r.id,
    //   image: !!r.image,
    //   Images_len: Array.isArray(r.Images) ? r.Images.length : 0,
    //   images_len: Array.isArray(r.images) ? r.images.length : 0,
    //   photos_len: Array.isArray(r.photos) ? r.photos.length : 0,
    //   image_url: !!r.image_url,
    //   thumb_url: !!r?.thumbnail?.url,
    // })));
    // console.table(products.value.map(p => ({ id: p.id, hasImage: !!p.image, image: p.image })));
  } catch (e) {
    console.error('Erro ao carregar produtos:', e);
    errorMsg.value = "Erro ao carregar produtos da categoria.";
  } finally {
    isLoading.value = false;
  }
}

// Aplica filtros
function onApplyFilters(payload) {
  filters.sort = payload.sort || null;
  filters.materials = Array.isArray(payload.materials) ? payload.materials.map(String) : [];
  filters.brands = Array.isArray(payload.brands) ? payload.brands.map(String) : [];
  filters.priceMin = payload.priceMin != null && payload.priceMin !== "" ? Number(payload.priceMin) : null;
  filters.priceMax = payload.priceMax != null && payload.priceMax !== "" ? Number(payload.priceMax) : null;
  isFilterOpen.value = false;
}

// Limpa filtros
function onClearFilters() {
  filters.sort = null;
  filters.materials = [];
  filters.brands = [];
  filters.priceMin = null;
  filters.priceMax = null;
}

// Remove chip
function removeChip(chip) {
  if (chip.group === "sort") filters.sort = null;
  if (chip.group === "materials") filters.materials = filters.materials.filter((m) => m !== chip.value);
  if (chip.group === "brands") filters.brands = filters.brands.filter((b) => b !== chip.value);
  if (chip.group === "priceMin") filters.priceMin = null;
  if (chip.group === "priceMax") filters.priceMax = null;
}

// Produtos filtrados
const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase();
  let list = [...products.value];

  if (q) list = list.filter((p) => p.title?.toLowerCase().includes(q));
  if (filters.brands.length) list = list.filter((p) => p.brand && filters.brands.includes(String(p.brand)));
  if (filters.materials.length) list = list.filter((p) => p.material && filters.materials.includes(String(p.material)));
  if (filters.priceMin != null) list = list.filter((p) => p.price >= Number(filters.priceMin));
  if (filters.priceMax != null) list = list.filter((p) => p.price <= Number(filters.priceMax));

  switch (filters.sort) {
    case "az": list.sort((a, b) => a.title.localeCompare(b.title)); break;
    case "za": list.sort((a, b) => b.title.localeCompare(a.title)); break;
    case "price_desc": list.sort((a, b) => b.price - a.price); break;
    case "price_asc": list.sort((a, b) => a.price - b.price); break;
  }
  return list;
});

// Debounce
watch(search, () => {
  if (searchDebounce) clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => { }, 250);
});

watch(
  () => route.params.slug,
  () => {
    search.value = "";
    onClearFilters();
    loadProducts();
  }
);

onMounted(loadProducts);
</script>

<template>
  <main class="category-page">
    <div class="section-header">
      <h2 class="section-title">{{ categoryTitle }}</h2>
    </div>


    <div class="tools-row">
      <button class="filter-btn" @click="isFilterOpen = true">
        FILTRAR PRODUTOS
        <img src="/src/assets/images/ConfigIcon.png" class="filter-icon">
      </button>

      <div class="search-box">
        <img src="/src/assets/images/lupa.png" class="search-icon">
        <input type="text" class="search-input" placeholder="Pesquisar Produto" v-model="search"
          aria-label="Pesquisar Produto" />
      </div>
    </div>

    <div v-if="chips.length" class="chips-row">
      <button v-for="c in chips" :key="c.key" class="chip" @click="removeChip(c)" :title="`Remover filtro ${c.label}`">
        {{ c.label }}
        <img src="/src/assets/images/Cancel.png" class="chip-x">
      </button>
      <button class="chip-clear" @click="onClearFilters">Limpar filtros</button>
    </div>

    <section class="products-section">
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <div v-if="isLoading" class="loading-message">
        <LoadingSpinner size="large" message="Carregando produtos..." />
      </div>

      <div v-else-if="filteredProducts.length === 0 && !errorMsg" class="empty-message">
        <p>Nenhum produto encontrado nesta categoria.</p>
      </div>

      <CardProducts v-else :products="filteredProducts" />
    </section>

    <SidebarFilter :open="isFilterOpen" :facets="facets" :selected="filters" @close="isFilterOpen = false"
      @apply="onApplyFilters" @clear="onClearFilters" />
  </main>
</template>


<style scoped>
.category-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px 32px 24px;
}

.section-header {
  max-width: 1320px;
  margin: 30px auto 20px;
  text-align: left;
  border-bottom: 1px solid black;
}

.section-title {
  font-weight: 600;
  font-size: 2rem;
  text-transform: uppercase;
}

.tools-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.filter-btn {
  display: flex;
  align-items: center;
  background: #000;
  color: #fff;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 20px;
  gap: 10px;
  cursor: pointer;
}


.filter-btn:hover {
  background: #333;
  transition: 0.3s;
}

.filter-icon {
  width: 20px;
}

.search-box {
  min-width: 50%;
  position: relative;
  margin-left: auto;
  display: inline-flex;
  border: 1px solid #000;
  font-size: 1rem;
  border-radius: 8px;
  padding: 8px 10px;
  gap: 8px;
  background: #fff;
}

.search-icon {
  width: 22px;
}

.search-input {
  font-weight: 500;
  border: none;
  background: transparent;

}
.search-input::placeholder{
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.25;
}

.chips-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #000787;
  border: 1px solid #000787;
  border-radius: 9px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 500;
  text-transform: uppercase;
  transition: all 0.2s;
}

.chip:hover {
  color: #000be0;
  border-color: #000be0;
}

.chip .chip-x {
  width: 8px;
}

.chip-clear {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #000787;
  border: 1px solid #000787;
  border-radius: 9px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 500;
  text-transform: uppercase;
  transition: all 0.2s;
}

.chip-clear:hover {
  color: #000be0;
  border-color: #000be0;
}


.loading-message,
.empty-message {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 16px;
}

.error {
  color: #d00;
  font-weight: 700;
  text-align: center;
  padding: 20px;
}
</style>
