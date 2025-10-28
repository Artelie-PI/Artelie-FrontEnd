<script setup>
import { computed, reactive, watch } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  facets: {
    type: Object,
    default: () => ({ brands: [], materials: [] }),
  },
  selected: {
    type: Object,
    default: () => ({
      sort: null,
      materials: [],
      brands: [],
      priceMin: null,
      priceMax: null,
    }),
  },
});

const emit = defineEmits(["close", "apply", "clear"]);

// Estado local editável
const local = reactive({
  sort: null,
  materials: [],
  brands: [],
  priceMin: "",
  priceMax: "",
});

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

// Seções dobráveis
const openSection = reactive({
  order: true,
  material: true,
  price: true,
  brand: true,
});

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
  <transition name="sfade">
    <div v-if="open" class="overlay" @click.self="emit('close')">
      <aside class="panel">
        <!-- Header (mesmo padrão da sacola) -->
        <header class="sidebar-head">
          <h2 class="head-title">FILTRAR</h2>
          <img
            src="/src/assets/images/Cancel.png"
            class="close-btn"
            alt="Fechar"
            @click="emit('close')"
          />
        </header>
        <div class="head-sep" aria-hidden="true"></div>

        <!-- Conteúdo rolável -->
        <div class="content">
          <!-- Ordenar -->
          <section class="sec">
            <button class="sec-head" @click="openSection.order = !openSection.order">
              <span>Ordenar</span>
              <span class="chev">{{ openSection.order ? "▾" : "▸" }}</span>
            </button>
            <div v-show="openSection.order" class="sec-body">
              <label class="opt"
                ><input type="radio" name="sort" value="az" v-model="local.sort" /> A-Z</label
              >
              <label class="opt"
                ><input type="radio" name="sort" value="za" v-model="local.sort" /> Z-A</label
              >
              <label class="opt"
                ><input type="radio" name="sort" value="new" v-model="local.sort" />
                Novidades</label
              >
              <label class="opt"
                ><input type="radio" name="sort" value="price_desc" v-model="local.sort" /> Maior
                Preço</label
              >
              <label class="opt"
                ><input type="radio" name="sort" value="price_asc" v-model="local.sort" /> Menor
                Preço</label
              >
            </div>
          </section>

          <!-- Material -->
          <section class="sec">
            <button class="sec-head" @click="openSection.material = !openSection.material">
              <span>Linha do Material</span>
              <span class="chev">{{ openSection.material ? "▾" : "▸" }}</span>
            </button>
            <div v-show="openSection.material" class="sec-body">
              <label class="opt" v-for="m in facets.materials" :key="m">
                <input type="checkbox" :value="m" v-model="local.materials" /> {{ m }}
              </label>
              <p v-if="!facets.materials?.length" class="muted">
                Nenhum material disponível nesta categoria.
              </p>
            </div>
          </section>

          <!-- Preço -->
          <section class="sec">
            <button class="sec-head" @click="openSection.price = !openSection.price">
              <span>Preço</span>
              <span class="chev">{{ openSection.price ? "▾" : "▸" }}</span>
            </button>
            <div v-show="openSection.price" class="sec-body">
              <div class="price-row">
                <label
                  >De: R$
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    v-model="local.priceMin"
                    placeholder="0,00"
                  />
                </label>
                <label
                  >Para: R$
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    v-model="local.priceMax"
                    placeholder="0,00"
                  />
                </label>
              </div>
            </div>
          </section>

          <!-- Marca -->
          <section class="sec">
            <button class="sec-head" @click="openSection.brand = !openSection.brand">
              <span>Marca</span>
              <span class="chev">{{ openSection.brand ? "▾" : "▸" }}</span>
            </button>
            <div v-show="openSection.brand" class="sec-body">
              <label class="opt" v-for="b in facets.brands" :key="b">
                <input type="checkbox" :value="b" v-model="local.brands" /> {{ b }}
              </label>
              <p v-if="!facets.brands?.length" class="muted">
                Nenhuma marca disponível nesta categoria.
              </p>
            </div>
          </section>
        </div>

        <!-- Footer fixo -->
        <div class="footer">
          <button class="btn ghost" :disabled="!hasFilters" @click="onClear">LIMPAR</button>
          <button class="btn solid" @click="onApply">APLICAR</button>
        </div>
      </aside>
    </div>
  </transition>
</template>

<style scoped>
/* Overlay e animação */
.sfade-enter-active,
.sfade-leave-active {
  transition: opacity 0.25s ease;
}
.sfade-enter-from,
.sfade-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: 100; /* acima do conteúdo, abaixo da sacola se necessário */
  display: flex;
  justify-content: flex-end;
}

/* Painel lateral (padrão da sacola) */
.panel {
  width: 420px;
  max-width: 100vw;
  height: 100vh;
  background: #fff;
  position: relative;
  box-shadow: -6px 0 32px rgba(23, 23, 23, 0.09);
  display: grid;
  grid-template-rows: auto 1px 1fr auto;
}

/* Header */
.sidebar-head {
  padding: 20px 24px 14px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.head-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.02em;
  margin: 0;
}
.close-btn {
  width: 16px;
  height: 16px;
  margin-left: auto;
  cursor: pointer;
  opacity: 0.85;
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
  border: 0;
  padding: 14px 0;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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

/* Footer fixo com botões */
.footer {
  padding: 12px 24px 20px 24px;
  background: #fff;
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.btn {
  height: 44px;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
}
.btn.ghost {
  background: #fff;
  color: #111;
  border: 2px solid #111;
}
.btn.ghost:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn.solid {
  background: #111;
  color: #fff;
  border: 0;
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
