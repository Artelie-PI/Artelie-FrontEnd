<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiClient from "@/axios";

const route = useRoute();
const router = useRouter();
const message = ref("Verificando token...");
const error = ref("");

onMounted(async () => {
  const { token } = route.params;
  try {
    const { data } = await apiClient.get(`/verify-email/${token}/`);
    message.value = data.message || "Email verificado com sucesso! Agora realize o login.";
    setTimeout(() => { router.push('/login') }, 2500)
  } catch (err) {
    error.value = err?.response?.data?.error || "Token inválido ou expirado.";
    message.value = "";
  }
});
</script>

<template>
  <div class="verify-container">
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.verify-container {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.success { color: green; font-size: 1.5rem; }
.error { color: red; font-size: 1.2rem; }
</style>
