<script setup>
import { computed, reactive, watch } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  facets: { type: Object, default: () => ({ brands: [], materials: [] }) },
  selected: {
    type: Object,
    default: () => ({ sort: null, materials: [], brands: [], priceMin: null, priceMax: null }),
  },
});
const emit = defineEmits(["close", "apply", "clear"]);

const local = reactive({ sort: null, materials: [], brands: [], priceMin: "", priceMax: "" });

watch(
  () => props.selected,
  (v) => {
    local.sort = v?.sort || null;
    local.materials = [...(v?.materials || [])];
    local.brands = [...(v?.brands || [])];
    local.priceMin = v?.priceMin ?? "";
    local.priceMax = v?.priceMax ?? "";
  },
  { immediate: true, deep: true }
);

// Seções (true = aberta)
const openSection = reactive({ order: true, material: true, price: true, brand: true });

function toggle(sectionKey) {
  openSection[sectionKey] = !openSection[sectionKey];
}

function onApply() {
  emit("apply", {
    sort: local.sort,
    materials: [...local.materials],
    brands: [...local.brands],
    priceMin: local.priceMin,
    priceMax: local.priceMax,
  });
}
function onClear() {
  local.sort = null;
  local.materials = [];
  local.brands = [];
  local.priceMin = "";
  local.priceMax = "";
  emit("clear");
}
const hasFilters = computed(
  () =>
    !!local.sort ||
    local.materials.length > 0 ||
    local.brands.length > 0 ||
    (local.priceMin !== "" && local.priceMin != null) ||
    (local.priceMax !== "" && local.priceMax != null)
);
</script>

<template>
  <!-- Mesmo padrão de transição -->
  <transition name="sidebar-filter">
    <div v-if="open" class="overlay" @click.self="emit('close')">
      <aside class="panel">
        <header class="sidebar-head">
          <img src="/src/assets/images/Cancel.png" class="close-btn" alt="Fechar" @click="emit('close')" />
          <h2 class="head-title">FILTRAR</h2>
        </header>
        <div class="head-sep" aria-hidden="true"></div>

        <!-- Conteúdo rolável -->
        <div class="content">
          <!-- Ordenar -->
          <section class="sec">
            <button class="sec-head" @click="toggle('order')">
              <span>Ordenar</span>
              <img src="/src/assets/images/Seta.png" alt="" class="arrow" :class="{ open: openSection.order }" />
            </button>
            <div v-show="openSection.order" class="sec-body">
              <label class="opt"><input type="radio" name="sort" value="az" v-model="local.sort" /> A-Z</label>
              <label class="opt"><input type="radio" name="sort" value="za" v-model="local.sort" /> Z-A</label>
              <label class="opt"><input type="radio" name="sort" value="new" v-model="local.sort" /> Novidades</label>
              <label class="opt"><input type="radio" name="sort" value="price_desc" v-model="local.sort" /> Maior
                Preço</label>
              <label class="opt"><input type="radio" name="sort" value="price_asc" v-model="local.sort" /> Menor
                Preço</label>
            </div>
          </section>

          <!-- Material -->
          <section class="sec">
            <button class="sec-head" @click="toggle('material')">
              <span>Linha do Material</span>
              <img src="/src/assets/images/Seta.png" alt="" class="arrow" :class="{ open: openSection.material }" />
            </button>
            <div v-show="openSection.material" class="sec-body">
              <label v-for="m in facets.materials" :key="m" class="opt">
                <input type="checkbox" :value="m" v-model="local.materials" /> {{ m }}
              </label>
              <p v-if="!facets.materials?.length" class="muted">
                Nenhum material disponível nesta categoria.
              </p>
            </div>
          </section>

          <!-- Preço -->
          <section class="sec">
            <button class="sec-head" @click="toggle('price')">
              <span>Preço</span>
              <img src="/src/assets/images/Seta.png" alt="" class="arrow" :class="{ open: openSection.price }" />
            </button>
            <div v-show="openSection.price" class="sec-body">
              <div class="price-row">
                <label>De: R$
                  <input type="number" min="0" step="0.01" v-model="local.priceMin" placeholder="0,00" />
                </label>
                <label>Para: R$
                  <input type="number" min="0" step="0.01" v-model="local.priceMax" placeholder="0,00" />
                </label>
              </div>
            </div>
          </section>

          <!-- Marca -->
          <section class="sec">
            <button class="sec-head" @click="toggle('brand')">
              <span>Marca</span>
              <img src="/src/assets/images/Seta.png" alt="" class="arrow" :class="{ open: openSection.brand }" />
            </button>
            <div v-show="openSection.brand" class="sec-body">
              <label v-for="b in facets.brands" :key="b" class="opt">
                <input type="checkbox" :value="b" v-model="local.brands" /> {{ b }}
              </label>
              <p v-if="!facets.brands?.length" class="muted">
                Nenhuma marca disponível nesta categoria.
              </p>
            </div>
          </section>
        </div>

        <div class="footer">
          <button class="buttonClear" :disabled="!hasFilters" @click="onClear">LIMPAR</button>
          <button class="buttonApply" @click="onApply">APLICAR</button>
        </div>
      </aside>
    </div>
  </transition>
</template>

<style scoped>
/* Transição no mesmo estilo da SidebarSacola */
.sidebar-filter-enter-active,
.sidebar-filter-leave-active {
  transition: opacity 0.25s ease;
}

.sidebar-filter-enter-from,
.sidebar-filter-leave-to {
  opacity: 0;
}

.sidebar-filter-enter-active .panel,
.sidebar-filter-leave-active .panel {
  transition: transform 0.4s ease;
}

.sidebar-filter-enter-from .panel,
.sidebar-filter-leave-to .panel {
  transform: translateX(100%);
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}

/* Painel lateral */
.panel {
  width: 420px;
  max-width: 100vw;
  height: 100vh;
  background: #fff;
  position: relative;
  box-shadow: -6px 0 32px rgba(23, 23, 23, 0.09);
  display: grid;
  grid-template-rows: auto 1px 1fr auto;
  --arrow-closed: 0deg;
  --arrow-open: 180deg;
}

/* Header (mantido do seu CSS) */
.close-btn {
  width: 16px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.sidebar-head {
  padding: 20px 24px 14px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.head-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 45px auto 40px auto;
}

.head-sep {
  height: 1px;
  background: #000;
  opacity: 0.12;
}

/* Conteúdo rolável */
.content {
  min-height: 0;
  overflow: auto;
  padding: 8px 24px 16px 24px;
}

.sec {
  border-bottom: 1px solid #f0f0f0;
}

.sec:last-child {
  border-bottom: 0;
}

.sec-head {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 14px 0;
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 0.01em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.arrow {
  width: 14px;
  height: 14px;
  object-fit: contain;
  transition: transform .3s ease;
  transform: rotate(var(--arrow-closed));
}

.arrow.open {
  transform: rotate(var(--arrow-open));
}

.sec-body {
  padding: 0 0 14px 0;
  display: grid;
  gap: 8px;
}

.opt {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-weight: 600;
}

.muted {
  color: #888;
  font-size: 13px;
}

.price-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.price-row input {
  width: 100%;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #ddd;
  padding: 0 10px;
}

/* Footer (mantido) */
.footer {
  padding: 50px 24px;
  background: #fff;
  position: sticky;
  border-top: 1px solid #f0f0f0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.buttonClear {
  height: 44px;
  background: #fff;
  color: #000787;
  border: 2px solid #000787;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
}

.buttonClear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.buttonApply {
  height: 44px;
  background: #000787;
  color: #fff;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
}

/* Responsivo */
@media (max-width: 420px) {
  .panel {
    width: 100vw;
  }

  .head-title {
    font-size: 24px;
  }
}
</style>
