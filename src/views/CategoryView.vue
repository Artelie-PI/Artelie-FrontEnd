<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchProductsByCategoryAll, fetchCategories } from "@/api/category";
import { getBrandMap } from "@/api/brands";
import { formatProduct, getProductImage } from "@/utils/productHelper";
import CardProducts from "@/components/CardProducts.vue";
import SidebarFilter from "@/components/SidebarFilter.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const route = useRoute();
const products = ref([]);
const categories = ref([]);
const currentCategory = ref(null);
const isLoading = ref(false);
const errorMsg = ref("");
const titleSkeleton = ref(true);

const currentPage = ref(1);
const itemsPerPage = 12;

const isFilterOpen = ref(false);

const search = ref("");
const searchInput = ref(null);
let searchDebounce = null;

const filters = reactive({
 sort: null,
 materials: [],
 brands: [],
 priceMin: null,
 priceMax: null,
});

const facets = reactive({
 brands: [],
 materials: [],
});

const chips = computed(() => {
<<<<<<< HEAD
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

=======
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
>>>>>>> origin/dev
const categoryTitle = computed(() => currentCategory.value?.name || "Categoria");

function findCategoryBySlug(slug) {
 const normalizedSlug = slug.toLowerCase().trim();
 const slugToId = {
   'papeis': 3, 'papéis': 3,
   'pintura': 5,
   'lapis-canetas': 2, 'lápis-canetas': 2, 'lapis-e-canetas': 2, 'lápis-e-canetas': 2,
   'livros-gibis': 4, 'livros-e-gibis': 4, 'livros-gibis': 4
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

<<<<<<< HEAD
=======
// Resolve um parâmetro de rota que pode ser `id` (numérico) ou `slug`.
// Prioriza buscar por ID via API; se não encontrar, tenta casar por slug
// entre as `categories` já carregadas.
async function resolveCategoryParam(param) {
  if (param == null) return null
  return findCategoryBySlug(param)
}

>>>>>>> origin/dev
async function loadProducts() {
 isLoading.value = true;
 titleSkeleton.value = true;
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
   titleSkeleton.value = false;

<<<<<<< HEAD
   const brandMap = await getBrandMap();
   const rawProducts = await fetchProductsByCategoryAll(category.id);
   products.value = rawProducts.map(p => formatProduct(p, brandMap));
=======
  try {
    if (categories.value.length === 0) {
      categories.value = await fetchCategories();
    }
>>>>>>> origin/dev

   products.value = products.value.map(p => {
     if (!p.image) {
       const raw = rawProducts.find(r => r.id === p.id);
       const maybe = raw ? getProductImage(raw) : null;
       return maybe ? { ...p, image: maybe } : p;
     }
     return p;
   });

<<<<<<< HEAD
   const setBrands = new Set();
   const setMaterials = new Set();
   for (const p of products.value) {
     if (p.brand) setBrands.add(String(p.brand));
     if (p.material) setMaterials.add(String(p.material));
   }
   facets.brands = Array.from(setBrands).sort();
   facets.materials = Array.from(setMaterials).sort();
 } catch (e) {
   console.error('Erro ao carregar produtos:', e);
   errorMsg.value = "Erro ao carregar produtos da categoria.";
   titleSkeleton.value = false;
 } finally {
   isLoading.value = false;
 }
=======
    const category = await resolveCategoryParam(param);

    if (!category) {
      console.error('❌ Categoria não encontrada para param:', param);
      errorMsg.value = "Categoria não encontrada.";
      products.value = [];
      return;
    }

    console.log('✅ Categoria encontrada:', category);
    currentCategory.value = category;

    // Busca categoria completa (inclui array de produtos via serializer)
    const fullCategory = await findCategoryById(category.id)
    const rawProducts = Array.isArray(fullCategory?.products) ? fullCategory.products : []
    console.log('📦 Produtos recebidos (embedded):', rawProducts.length)
    products.value = rawProducts.map(formatProduct)
    console.log('✅ Produtos formatados:', products.value.length)

    // Gera facetas
    const setBrands = new Set();
    const setMaterials = new Set();
    for (const p of products.value) {
      if (p.brand) setBrands.add(String(p.brand));
      if (p.material) setMaterials.add(String(p.material));
    }
    facets.brands = Array.from(setBrands).sort();
    facets.materials = Array.from(setMaterials).sort();

  } catch (e) {
    console.error('Erro ao carregar produtos:', e);
    errorMsg.value = "Erro ao carregar produtos da categoria.";
  } finally {
    isLoading.value = false;
  }
>>>>>>> origin/dev
}

function onApplyFilters(payload) {
<<<<<<< HEAD
 filters.sort = payload.sort || null;
 filters.materials = Array.isArray(payload.materials) ? payload.materials.map(String) : [];
 filters.brands = Array.isArray(payload.brands) ? payload.brands.map(String) : [];
 filters.priceMin = payload.priceMin != null && payload.priceMin !== "" ? Number(payload.priceMin) : null;
 filters.priceMax = payload.priceMax != null && payload.priceMax !== "" ? Number(payload.priceMax) : null;
 isFilterOpen.value = false;
 currentPage.value = 1;
=======
  filters.sort = payload.sort || null;
  filters.materials = Array.isArray(payload.materials) ? payload.materials.map(String) : [];
  filters.brands = Array.isArray(payload.brands) ? payload.brands.map(String) : [];
  filters.priceMin = payload.priceMin != null && payload.priceMin !== "" ? Number(payload.priceMin) : null;
  filters.priceMax = payload.priceMax != null && payload.priceMax !== "" ? Number(payload.priceMax) : null;
  isFilterOpen.value = false;
>>>>>>> origin/dev
}

function onClearFilters() {
 filters.sort = null;
 filters.materials = [];
 filters.brands = [];
 filters.priceMin = null;
 filters.priceMax = null;
 currentPage.value = 1;
}

function removeChip(chip) {
<<<<<<< HEAD
 if (chip.group === "sort") filters.sort = null;
 if (chip.group === "materials") filters.materials = filters.materials.filter((m) => m !== chip.value);
 if (chip.group === "brands") filters.brands = filters.brands.filter((b) => b !== chip.value);
 if (chip.group === "priceMin") filters.priceMin = null;
 if (chip.group === "priceMax") filters.priceMax = null;
 currentPage.value = 1;
=======
  if (chip.group === "sort") filters.sort = null;
  if (chip.group === "materials") filters.materials = filters.materials.filter((m) => m !== chip.value);
  if (chip.group === "brands") filters.brands = filters.brands.filter((b) => b !== chip.value);
  if (chip.group === "priceMin") filters.priceMin = null;
  if (chip.group === "priceMax") filters.priceMax = null;
>>>>>>> origin/dev
}

const filteredProducts = computed(() => {
 const q = search.value.trim().toLowerCase();
 let list = [...products.value];

<<<<<<< HEAD
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
=======
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
>>>>>>> origin/dev
});

const paginatedProducts = computed(() => {
 const start = (currentPage.value - 1) * itemsPerPage;
 const end = start + itemsPerPage;
 return filteredProducts.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const visiblePages = computed(() => {
 const total = totalPages.value;
 const current = currentPage.value;
 const isMobile = window.innerWidth < 640;
 const maxVisible = isMobile ? 4 : 6;

 if (total <= maxVisible) {
   return Array.from({ length: total }, (_, i) => i + 1);
 }

 const pages = [];
 let start = Math.max(1, current - Math.floor(maxVisible / 2));
 let end = Math.min(total, start + maxVisible - 1);

 if (end - start < maxVisible - 1) {
   start = Math.max(1, end - maxVisible + 1);
 }

 for (let i = start; i <= end; i++) {
   pages.push(i);
 }
 return pages;
});

function goToPage(page) {
 if (page >= 1 && page <= totalPages.value) {
   currentPage.value = page;
   window.scrollTo({ top: 0, behavior: 'smooth' });
 }
}

watch(search, () => {
<<<<<<< HEAD
 if (searchDebounce) clearTimeout(searchDebounce);
 searchDebounce = setTimeout(() => {
   currentPage.value = 1;
 }, 250);
=======
  if (searchDebounce) clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => { }, 250);
>>>>>>> origin/dev
});

watch(
 () => route.params.slug,
 () => {
   search.value = "";
   onClearFilters();
   titleSkeleton.value = true;
   loadProducts();
 }
);

onMounted(loadProducts);
</script>

<template>
 <main class="category-page">
   <div class="section-header">
     <h2 v-if="!titleSkeleton" class="section-title">{{ categoryTitle }}</h2>
     <div v-else class="title-skeleton">
       <div class="skeleton-line skeleton-line-1"></div>
     </div>
   </div>

   <div class="tools-row">
     <button class="filter-btn" @click="isFilterOpen = true">
       FILTRAR PRODUTOS
       <img src="/src/assets/images/ConfigIcon.png" class="filter-icon">
     </button>

<<<<<<< HEAD
     <div class="search-box" @click="searchInput?.focus()">
       <img src="/src/assets/images/lupa.png" class="search-icon">
       <input ref="searchInput" type="text" class="search-input" placeholder="Pesquisar Produto" v-model="search"
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
=======
      <div class="search-box">
        <span class="search-icon">🔎</span>
        <input type="text" class="search-input" placeholder="Pesquisar Produto" v-model="search" aria-label="Pesquisar Produto" />
      </div>
    </div>

    <div v-if="chips.length" class="chips-row">
      <button v-for="c in chips" :key="c.key" class="chip" @click="removeChip(c)" :title="`Remover filtro ${c.label}`">
        {{ c.label }}
        <span class="chip-x">×</span>
      </button>
      <button class="chip-clear" @click="onClearFilters">Limpar filtros</button>
    </div>
>>>>>>> origin/dev

   <section class="products-section">
     <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

     <div v-if="isLoading" class="loading-message">
       <LoadingSpinner size="large"/>
     </div>

     <div v-else-if="filteredProducts.length === 0 && !errorMsg" class="empty-message">
       <p>Nenhum produto encontrado nesta categoria.</p>
     </div>

     <template v-else>
       <CardProducts :products="paginatedProducts" />

<<<<<<< HEAD
       <nav v-if="totalPages > 1" class="pagination" aria-label="Navegação de páginas">
         <button class="pagination-btn pagination-arrow" @click="goToPage(currentPage - 1)"
           :disabled="currentPage === 1" aria-label="Página anterior">
           <img src="/src/assets/images/Seta.png" alt="" class="arrow-left">
         </button>

         <button v-for="page in visiblePages" :key="page" class="pagination-btn pagination-number"
           :class="{ active: page === currentPage }" @click="goToPage(page)" :aria-label="`Página ${page}`"
           :aria-current="page === currentPage ? 'page' : undefined">
           {{ page }}
         </button>

         <button class="pagination-btn pagination-arrow" @click="goToPage(currentPage + 1)"
           :disabled="currentPage === totalPages" aria-label="Próxima página">
           <img src="/src/assets/images/Seta.png" alt="" class="arrow-right">
         </button>
       </nav>
     </template>
   </section>

   <SidebarFilter :open="isFilterOpen" :facets="facets" :selected="filters" @close="isFilterOpen = false"
     @apply="onApplyFilters" @clear="onClearFilters" />
 </main>
=======
    <SidebarFilter
      :open="isFilterOpen"
      :facets="facets"
      :selected="filters"
      @close="isFilterOpen = false"
      @apply="onApplyFilters"
      @clear="onClearFilters"
    />
  </main>
>>>>>>> origin/dev
</template>

<style scoped>
.category-page {
 max-width: 1280px;
 margin: 0 auto;
}
.section-header {
 margin: 80px auto 20px auto;
 border: none;
 position: relative;
}

.section-title {
 margin: 0 auto;
 display: inline-block;
 font-size: 2rem;
 font-weight: 600;
 color: #000;
 text-decoration: underline;
 text-underline-offset: 4px;
 text-decoration-thickness: 3px;
}

.title-skeleton {
 margin: 0 auto;
 display: inline-block;
 width: 300px;
 position: relative;
}

.skeleton-line {
 background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
 background-size: 200% 100%;
 animation: shimmer 1.5s infinite;
 border-radius: 4px;
 height: 3rem;
}

.skeleton-line-1 {
 width: 100%;
}

.skeleton-line-2 {
 width: 85%;
 margin-left: 15px;
}

.skeleton-line-3 {
 width: 70%;
 margin-left: 30px;
}

@keyframes shimmer {
 0% {
   background-position: 200% 0;
 }
 100% {
   background-position: -200% 0;
 }
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

<<<<<<< HEAD
.filter-btn:hover {
 background: #333;
 transition: 0.3s;
}

.filter-icon {
 width: 20px;
}
=======
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
>>>>>>> origin/dev

.search-box {
 min-width: 50%;
 position: relative;
 margin-left: auto;
 display: flex;
 align-items: center;
 border: 1px solid #000;
 font-size: 1rem;
 border-radius: 8px;
 padding: 8px 10px;
 gap: 8px;
 background: #fff;
 cursor: text;
}

.search-icon {
 width: 22px;
 flex-shrink: 0;
 pointer-events: none;
}

.search-input {
 flex: 1;
 width: 100%;
 font-weight: 500;
 border: none;
 background: transparent;
 outline: none;
}

.search-input::placeholder {
 font-size: 1rem;
 font-weight: 500;
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
 font-size: 0.85rem;
}

<<<<<<< HEAD
.chip:hover {
 color: #000be0;
 border-color: #000be0;
}

.chip .chip-x {
 width: 8px;
}
=======
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
>>>>>>> origin/dev

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
 font-size: 0.85rem;
}

<<<<<<< HEAD
.chip-clear:hover {
 color: #000be0;
 border-color: #000be0;
}
=======
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
>>>>>>> origin/dev

.products-section {
 margin-top: 50px;
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
 font-weight: 600;
 text-align: center;
 padding: 20px;
}

.pagination {
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 8px;
 margin-top: 30px;
 padding: 24px 0;
}

.pagination-btn {
 min-width: 35px;
 height: 35px;
 display: flex;
 align-items: center;
 justify-content: center;
 background: #fff;
 border: 2px solid #ddd;
 font-size: 0.9rem;
 font-weight: 500;
 color: #000;
 cursor: pointer;
 transition: all 0.2s;
}

.pagination-number:hover:not(.active) {
 border-color: #000;
}

.pagination-number.active {
 color: #000;
 border-color: #000;
}

.pagination-arrow {
 border: none;
 background: none;
}

.pagination-arrow:disabled {
 opacity: 0.2;
 cursor: not-allowed;
}

.pagination-arrow img {
 width: 14px;
 height: 14px;
 display: block;
}

.arrow-left {
 transform: rotate(-90deg);
}

.arrow-right {
 transform: 90deg;
}

@media (max-width: 768px) {
 .category-page {
   padding: 12px 16px 24px 16px;
 }

 .section-header {
   margin: 20px auto 16px;
 }

 .section-title {
   font-size: 1.5rem;
 }

 .title-skeleton {
   width: 250px;
 }

 .skeleton-line {
   height: 28px;
 }

 .tools-row {
   flex-direction: column;
   gap: 10px;
 }

 .filter-btn {
   width: 100%;
   justify-content: center;
   font-size: 0.95rem;
   padding: 10px 16px;
 }

 .search-box {
   width: 100%;
   min-width: 100%;
   margin-left: 0;
 }

 .search-input::placeholder {
   font-size: 0.9rem;
 }

 .chips-row {
   gap: 8px;
 }

 .chip,
 .chip-clear {
   font-size: 0.75rem;
   padding: 4px 8px;
 }

 .products-section {
   margin-top: 30px;
 }

 .pagination {
   gap: 6px;
 }

 .pagination-btn {
   min-width: 32px;
   height: 32px;
   font-size: 0.85rem;
 }

 .pagination-arrow img {
   width: 12px;
   height: 12px;
 }
}

@media (max-width: 480px) {
 .category-page {
   padding: 8px 12px 20px 12px;
 }

 .section-header {
   margin: 16px auto 12px;
 }

 .section-title {
   font-size: 1.3rem;
 }

 .title-skeleton {
   width: 200px;
 }

 .skeleton-line {
   height: 24px;
 }

 .filter-btn {
   font-size: 0.85rem;
   padding: 8px 12px;
 }

 .filter-icon {
   width: 16px;
 }

 .search-icon {
   width: 18px;
 }

 .search-input::placeholder {
   font-size: 0.85rem;
 }

 .chips-row {
   gap: 6px;
 }

 .chip,
 .chip-clear {
   font-size: 0.7rem;
   padding: 3px 6px;
 }

 .chip .chip-x {
   width: 6px;
 }

 .pagination {
   gap: 4px;
   padding: 16px 0;
 }

 .pagination-btn {
   min-width: 30px;
   height: 30px;
   font-size: 0.8rem;
 }

 .pagination-arrow img {
   width: 10px;
   height: 10px;
 }

 .loading-message,
 .empty-message {
   padding: 40px 16px;
   font-size: 14px;
 }

 .error {
   font-size: 14px;
 }
}
</style>
