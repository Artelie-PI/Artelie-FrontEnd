<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchProductsByCategory, fetchCategories } from "@/api/category";
import { formatProduct } from "@/utils/productHelper";
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
    const map = {
      az: "A-Z",
      za: "Z-A",
      new: "Novidades",
      price_desc: "Maior Preço",
      price_asc: "Menor Preço",
    };
    list.push({ key: "sort", label: map[filters.sort] || filters.sort, group: "sort" });
  }
  filters.materials.forEach((m) =>
    list.push({ key: `mat:${m}`, label: m, group: "materials", value: m })
  );
  filters.brands.forEach((b) => list.push({ key: `br:${b}`, label: b, group: "brands", value: b }));
  if (filters.priceMin != null)
    list.push({
      key: "pmin",
      label: `De R$ ${Number(filters.priceMin).toFixed(2)}`,
      group: "priceMin",
    });
  if (filters.priceMax != null)
    list.push({
      key: "pmax",
      label: `Até R$ ${Number(filters.priceMax).toFixed(2)}`,
      group: "priceMax",
    });
  return list;
});

// Nome da categoria
const categoryTitle = computed(() => {
  return currentCategory.value?.name || "Categoria";
});

function findCategoryBySlug(slug) {
  const normalizedSlug = slug.toLowerCase().trim();
  
  console.log('🔍 Buscando categoria para slug:', normalizedSlug);
  
  // Mapeamento manual de slugs para IDs
  const slugToId = {
    'papeis': 3,
    'papéis': 3,
    'pintura': 5,
    'lapis-canetas': 2,
    'lápis-canetas': 2,
    'lapis-e-canetas': 2,      // ✅ Adiciona com "e"
    'lápis-e-canetas': 2,
    'livros-gibis': 4,
    'livros-e-gibis': 4,
    'livros-gib is': 4
  };
  
  // Tenta pelo mapeamento
  if (slugToId[normalizedSlug]) {
    const categoryId = slugToId[normalizedSlug];
    const found = categories.value.find(c => c.id === categoryId);
    console.log('✅ Categoria encontrada:', found);
    return found;
  }
  
  // Fallback
  const found = categories.value.find(c => {
    const categorySlug = c.name.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');
    
    return categorySlug.includes(normalizedSlug.replace(/-/g, ''));
  });
  
  console.log('🔍 Fallback encontrou:', found);
  return found;
}


// Busca produtos da categoria
async function loadProducts() {
  isLoading.value = true;
  errorMsg.value = "";
  
  try {
    // Carrega categorias se necessário
    if (categories.value.length === 0) {
      console.log('📦 Carregando categorias...');
      categories.value = await fetchCategories();
      console.log('✅ Categorias carregadas:', categories.value);
    }
    
    // Encontra a categoria pelo slug
    const slug = route.params.slug;
    console.log('🔍 Buscando categoria com slug:', slug);
    
    const category = findCategoryBySlug(slug);
    
    if (!category) {
      console.error('❌ Categoria não encontrada para slug:', slug);
      errorMsg.value = "Categoria não encontrada.";
      products.value = [];
      return;
    }
    
    console.log('✅ Categoria encontrada:', category);
    currentCategory.value = category;
    
    // Busca produtos da categoria usando o ID
    const rawProducts = await fetchProductsByCategory(category.id);
    console.log('📦 Produtos recebidos:', rawProducts.length);
    
    // Formata produtos usando o helper
    products.value = rawProducts.map(formatProduct);
    console.log('✅ Produtos formatados:', products.value.length);
    
    // Gera facetas
    const setBrands = new Set();
    const setMaterials = new Set();
    for (const p of products.value) {
      if (p.brand) setBrands.add(p.brand);
      if (p.material) setMaterials.add(p.material);
    }
    facets.brands = Array.from(setBrands).sort();
    facets.materials = Array.from(setMaterials).sort();
    
  } catch (e) {
    console.error('❌ Erro ao carregar produtos:', e);
    errorMsg.value = "Erro ao carregar produtos da categoria.";
  } finally {
    isLoading.value = false;
  }
}

// Aplica filtros
function onApplyFilters(payload) {
  filters.sort = payload.sort || null;
  filters.materials = payload.materials || [];
  filters.brands = payload.brands || [];
  filters.priceMin =
    payload.priceMin != null && payload.priceMin !== "" ? Number(payload.priceMin) : null;
  filters.priceMax =
    payload.priceMax != null && payload.priceMax !== "" ? Number(payload.priceMax) : null;
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
  if (chip.group === "materials")
    filters.materials = filters.materials.filter((m) => m !== chip.value);
  if (chip.group === "brands") filters.brands = filters.brands.filter((b) => b !== chip.value);
  if (chip.group === "priceMin") filters.priceMin = null;
  if (chip.group === "priceMax") filters.priceMax = null;
}

// Produtos filtrados
const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase();
  let list = [...products.value];

  if (q) {
    list = list.filter((p) => p.title?.toLowerCase().includes(q));
  }

  if (filters.brands.length) {
    list = list.filter((p) => p.brand && filters.brands.includes(p.brand));
  }
  if (filters.materials.length) {
    list = list.filter((p) => p.material && filters.materials.includes(p.material));
  }
  if (filters.priceMin != null) list = list.filter((p) => p.price >= Number(filters.priceMin));
  if (filters.priceMax != null) list = list.filter((p) => p.price <= Number(filters.priceMax));

  switch (filters.sort) {
    case "az":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      list.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "price_desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "price_asc":
      list.sort((a, b) => a.price - b.price);
      break;
  }
  return list;
});

// Debounce
watch(search, () => {
  if (searchDebounce) clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {}, 250);
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
      <div class="section-rule" aria-hidden="true"></div>
    </div>

    <div class="tools-row">
      <button class="filter-btn" @click="isFilterOpen = true">
        FILTRAR PRODUTOS
        <span class="filter-icon">☰</span>
      </button>

      <div class="search-box">
        <span class="search-icon">🔎</span>
        <input
          type="text"
          class="search-input"
          placeholder="Pesquisar Produto"
          v-model="search"
          aria-label="Pesquisar Produto"
        />
      </div>
    </div>

    <div v-if="chips.length" class="chips-row">
      <button
        v-for="c in chips"
        :key="c.key"
        class="chip"
        @click="removeChip(c)"
        :title="`Remover filtro ${c.label}`"
      >
        {{ c.label }}
        <span class="chip-x">×</span>
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

    <SidebarFilter
      :open="isFilterOpen"
      :facets="facets"
      :selected="filters"
      @close="isFilterOpen.value = false"
      @apply="onApplyFilters"
      @clear="onClearFilters"
    />
  </main>
</template>

<style scoped>
.category-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px 32px 24px;
}

.section-header {
  max-width: 1120px;
  margin: 24px auto 20px;
  text-align: left;
  padding: 0;
}

.section-title {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1.3;
  padding-bottom: 3px;
}

.section-rule {
  height: 1px;
  background: #000;
  width: 100%;
}

.tools-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #111;
  color: #fff;
  border: 0;
  border-radius: 6px;
  height: 40px;
  padding: 0 14px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s;
}

.filter-btn:hover {
  background: #333;
}

.filter-btn .filter-icon {
  opacity: 0.9;
}

.search-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 40px;
  min-width: 260px;
  flex: 1 1 280px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 12px 0 36px;
  background: #fff;
}

.search-icon {
  position: absolute;
  left: 10px;
  font-size: 14px;
  opacity: 0.7;
}

.search-input {
  flex: 1;
  border: 0;
  outline: none;
  font-size: 14px;
  background: transparent;
}

.chips-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f1f1f1;
  color: #111;
  border: 1px solid #e5e5e5;
  border-radius: 999px;
  height: 30px;
  padding: 0 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.chip:hover {
  background: #e5e5e5;
}

.chip .chip-x {
  opacity: 0.7;
}

.chip-clear {
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  border: 0;
  background: #eee;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.chip-clear:hover {
  background: #ddd;
}

.products-section {
  margin-top: 8px;
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
