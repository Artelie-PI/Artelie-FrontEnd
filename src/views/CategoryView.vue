<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import apiClient from "@/axios";
import SidebarFilter from "@/components/SidebarFilter.vue";

// Estado principal
const route = useRoute();
const products = ref([]);
const isLoading = ref(false);
const errorMsg = ref("");

// Abertura da sidebar de filtros
const isFilterOpen = ref(false);

// Pesquisa (com debounce)
const search = ref("");
let searchDebounce = null;

// Filtros selecionados
const filters = reactive({
  sort: null, // 'az' | 'za' | 'new' | 'price_desc' | 'price_asc'
  materials: [], // array de strings
  brands: [], // array de strings
  priceMin: null, // number
  priceMax: null, // number
});

// Opções (facetas) derivadas dos produtos carregados
const facets = reactive({
  brands: [],
  materials: [],
});

// Chips para exibir abaixo do botão de filtro
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

// Nome da categoria (do slug)
const categoryTitle = computed(() => {
  const slug = route.params.slug || "";
  // Capitaliza e troca hifens por espaços
  return String(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
});

// Busca produtos da API (carrega todos da categoria; filtros aplicados no client)
async function loadProducts() {
  isLoading.value = true;
  errorMsg.value = "";
  try {
    const slug = route.params.slug;
    // Endpoint base do seu backend: /products
    // Primeiro tenta por slug; caso o backend use outro param, trocamos aqui depois
    const { data } = await apiClient.get("/products", { params: { category_slug: slug } });
    const list = Array.isArray(data) ? data : data?.results || [];
    products.value = list.map((p) => ({
      id: p.id,
      title: p.title || p.name || "Produto",
      price: Number(p.price || 0),
      brand: p.brand?.name || p.brand || null,
      material: p.material || p.attributes?.material || null,
      image: p.image || p.images?.[0] || p.thumbnail || "",
    }));
    // Gera facetas únicas
    const setBrands = new Set();
    const setMaterials = new Set();
    for (const p of products.value) {
      if (p.brand) setBrands.add(p.brand);
      if (p.material) setMaterials.add(p.material);
    }
    facets.brands = Array.from(setBrands).sort();
    facets.materials = Array.from(setMaterials).sort();
  } catch (e) {
    errorMsg.value = "Erro ao carregar produtos da categoria.";
  } finally {
    isLoading.value = false;
  }
}

// Aplica filtros vindos da Sidebar
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

// Limpa filtros via Sidebar
function onClearFilters() {
  filters.sort = null;
  filters.materials = [];
  filters.brands = [];
  filters.priceMin = null;
  filters.priceMax = null;
}

// Remover chip individual
function removeChip(chip) {
  if (chip.group === "sort") filters.sort = null;
  if (chip.group === "materials")
    filters.materials = filters.materials.filter((m) => m !== chip.value);
  if (chip.group === "brands") filters.brands = filters.brands.filter((b) => b !== chip.value);
  if (chip.group === "priceMin") filters.priceMin = null;
  if (chip.group === "priceMax") filters.priceMax = null;
}

// Produtos filtrados/ordenados/pesquisados
const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase();
  let list = [...products.value];

  // Pesquisa por nome
  if (q) {
    list = list.filter((p) => p.title?.toLowerCase().includes(q));
  }

  // Marca
  if (filters.brands.length) {
    list = list.filter((p) => p.brand && filters.brands.includes(p.brand));
  }
  // Material
  if (filters.materials.length) {
    list = list.filter((p) => p.material && filters.materials.includes(p.material));
  }
  // Preço
  if (filters.priceMin != null) list = list.filter((p) => p.price >= Number(filters.priceMin));
  if (filters.priceMax != null) list = list.filter((p) => p.price <= Number(filters.priceMax));

  // Ordenação
  switch (filters.sort) {
    case "az":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      list.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "new":
      // Se houver campo created_at no futuro, ordenar por data desc.
      // Por ora, mantém como veio.
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

// Debounce da pesquisa
watch(search, (v) => {
  if (searchDebounce) clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    // A computada já reage — nada extra necessário
  }, 250);
});

watch(
  () => route.params.slug,
  () => {
    // Troca de categoria
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
          <input type="text" class="search-input" placeholder="Pesquisar Produto" v-model="search"
            aria-label="Pesquisar Produto" />
        </div>
      </div>

      <!-- Chips de filtros aplicados -->
      <div v-if="chips.length" class="chips-row">
        <button v-for="c in chips" :key="c.key" class="chip" @click="removeChip(c)"
          :title="`Remover filtro ${c.label}`">
          {{ c.label }}
          <span class="chip-x">×</span>
        </button>
        <button class="chip-clear" @click="onClearFilters">Limpar filtros</button>
      </div>

    <!-- Lista / Grid de produtos -->
    <section class="products-section">
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <div v-if="isLoading" class="grid">
        <div v-for="i in 8" :key="i" class="card skeleton"></div>
      </div>

      <div v-else class="grid">
        <article v-for="p in filteredProducts" :key="p.id" class="card">
          <img :src="p.image" :alt="p.title" class="thumb" />
          <h3 class="title">{{ p.title }}</h3>
          <p class="price">R$ {{ p.price.toFixed(2).replace(".", ",") }}</p>
          <button class="add-btn">Adicionar à Sacola</button>
        </article>
      </div>
    </section>

    <!-- Sidebar de Filtro -->
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
}

.products-section {
  margin-top: 8px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 780px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: #fff;
}

.card .thumb {
  width: 100%;
  height: 170px;
  object-fit: contain;
  border-radius: 6px;
  background: #fafafa;
}

.card .title {
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  min-height: 36px;
}

.card .price {
  font-size: 15px;
  font-weight: 800;
  margin: 4px 0 8px 0;
}

.card .add-btn {
  width: 100%;
  height: 36px;
  border-radius: 6px;
  border: 0;
  font-weight: 800;
  background: #111;
  color: #fff;
  cursor: pointer;
}

.skeleton {
  background: linear-gradient(90deg, #f3f3f3 25%, #f7f7f7 37%, #f3f3f3 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
  height: 240px;
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.error {
  color: #d00;
  font-weight: 700;
}
</style>
