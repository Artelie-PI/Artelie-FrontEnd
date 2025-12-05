import { ref } from "vue";
import { useRouter } from "vue-router";

const isOpen = ref(false);

export function useSidebarCart() {
  const router = useRouter();

  function open() {
    if (router.currentRoute.value.name === 'cart') {
      return;
    }
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  return { isOpen, open, close };
}
