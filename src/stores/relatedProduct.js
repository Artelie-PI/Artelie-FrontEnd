// stores/product.js
import { ref } from "vue";
import { defineStore } from "pinia";

// importa imagens
import Estojo1 from "@/assets/images/EstojoDeLápisExemplo.jpg";
import Estojo2 from "@/assets/images/EstojoDeLápisExemplo2.webp";
import Estojo3 from "@/assets/images/EstojoDeLápisExemplo3.webp";
import Estojo4 from "@/assets/images/EstojoDeLápisExemplo4.webp";


// define a store

export const useProductStore = defineStore("product", () => {
  // imagens
  const images = [Estojo1, Estojo2, Estojo3, Estojo4];
  const selectedImage = ref(images[0]);

  // quantidade
  const quantity = ref(1);
  const increaseQuantity = () => quantity.value++;
  const decreaseQuantity = () => {
    if (quantity.value > 1) quantity.value--;
  };

  // produtos relacionados
  const relatedProducts = [
    {
      name: "Estojo 24 Peças",
      price: "R$ 279,90",
      image: Estojo1,
    },
    {
      name: "Estojo 36 Peças",
      price: "R$ 299,90",
      image: Estojo2,
    },
    {
      name: "Estojo 12 Peças",
      price: "R$ 129,90",
      image: Estojo3,
    },
    {
      name: "Estojo 72 Peças",
      price: "R$ 799,90",
      image: Estojo4,
    },
  ];

  return {
    images,
    selectedImage,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    relatedProducts,
  };
});
