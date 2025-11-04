import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

export const PRODUCT_IMAGE_MAP = {
  6: "media/images/9c528cb9-366b-41e6-ac0e-8000549f49e8_xrimtg",
  7: "media/images/194e2962-bde3-4b6b-b897-988fff9a0997_kdlvg9",
  8: "media/images/bb9732ca-9d41-48ec-b35a-13f2cf4a673a_y9him3",
  9: "media/images/ff2b73ca-850d-4374-981f-e9e4fa80c8ea_frr7rv",
  10: "media/images/72e89ac8-c38f-49d6-a6d9-1ef04505839b_ulfmsl",
  11: "media/images/226c3410-6112-4f95-b8a9-b7751d19e8cb_l63pva",
  12: "media/images/fa3c4a21-2e10-4077-b73a-001d9fcf655d_xmapcr",
  13: "media/images/98b59d20-fb7c-440d-a146-c81e6536ebec_z6loro",
  14: "media/images/344674fa-7050-4367-b811-e0a88e38d1d4_jmg4fp",
  15: "media/images/d6f10886-65a7-4029-8f7d-2c889f81e3e7_vnzqqa",
  16: "media/images/0678fbee-86a9-4392-bf75-e5b44ac7dea5_njhd2c",
  17: "media/images/4f0e6101-4f5a-4def-bf6f-5178df300105_ymn0v0",
  18: "media/images/971595a4-9f37-4b42-b380-3887867988e3_rchnbo",
  19: "media/images/9cab52e5-e28e-44fb-9676-be65df734722_xg1hzy",
  20: "media/images/8caa5dca-b228-40a3-b7bb-877280f0d2da_yvhknk",
  21: "media/images/9c73a8d1-9675-427e-9771-d738c5f8ee62_tpwbsm",
  22: "media/images/aec6852a-76c7-41f2-925c-e13a07dcc267_zczdct",
  23: "media/images/a2d65390-90ce-4b71-9e65-30a3aa1d9af9_vqxavy",
  24: "media/images/dac2417a-2d43-4844-b876-f731a75999e9_m88zuy",
  25: "media/images/a4850691-86e7-4a98-b585-971508de1c97_vda8by",
  26: "media/images/9e85b2f7-07d0-40a1-8b30-239bc6ba1094_ebwjxj",
  27: "media/images/afa5a27a-c1ef-4e6e-8071-31867f75e2c3_u0aqzp",
  28: "media/images/49cbb712-a284-4def-9861-2b64b0c2fd71_d5xeuv",
  29: "media/images/0eee0846-44ac-45ea-aa06-91c299625cd0_uburwm",
  30: "media/images/83e11034-228f-4c3d-b77d-a08f75d9d021_he5dj0",
  31: "media/images/0722248e-17df-4934-814c-ceafbec4c832_i2ks32",
  32: "media/images/98c93e85-cc37-49ee-b65a-260b201cc596_gl0rcc",
  33: "media/images/7bb4659e-8d44-4d6d-86d6-63b10f04ed5c_yaneop",
  34: "media/images/15da0f91-3960-4af5-8bfa-ec7df0a02327_q3kt5a",
  35: "media/images/1787fcdb-a60a-49f3-a012-437640f43589_qvv6rv",
  36: "media/images/213e942c-819e-4f15-9c53-ef4826c975a3_fnjk9w",
  37: "media/images/b305a666-7db6-4b3a-b941-e8fba0d6ddaa_q2hkn7",
  38: "media/images/ee8852c2-0c09-4147-85e7-fbd93e03c779_jqqrgz",
  39: "media/images/ef23911f-a8cd-421f-91e9-2e2405976ee2_xvybth",
  40: "media/images/ef23911f-a8cd-421f-91e9-2e2405976ee2_xvybth",
  41: "media/images/a0b176a1-f344-400a-a5b1-ce0033e2f337_nym0kp",
  42: "media/images/8352bdcc-8c54-43b8-a992-4f550555312f_i6ovll",
  43: "media/images/090c3c74-1e7c-4bbb-9316-cd792246657b_ccklri",
  44: "media/images/a28640af-75e3-4bc6-ae65-84be7eca5622_oxmfak",
  45: "media/images/45141002-95ee-4377-81e8-ebd3abadcc43_stmjjl",
  46: "media/images/d4188cc6-4391-4b9a-bb22-ce2b3728b395_btgzfe",
  47: "media/images/340d8a8e-03e7-41ad-8344-48e59e601d0e_jeybhk",
  48: "media/images/745c6f64-73ee-47ad-be43-df2d24916bc5_isq8cr",
  49: "media/images/b6dff24b-55dc-4bcd-baf7-62d431df9a4f_vvaajd",
  50: "media/images/6b286fb6-a085-4d95-ac55-ce44c93706b8_zjptfl",
  51: "media/images/c2cc1094-cea5-4582-9ae4-7fe716892c01_y8kki5",
  52: "media/images/d0d0753b-a276-47a5-8ace-ff82ce80ce34_uqjtnq",
  53:  "media/images/06a1fcf4-5217-4a92-9e50-f626b49da1c6_cqbazs",

};

const cld = new Cloudinary({
  cloud: {
    cloudName: "dmuylscso",
  },
});

/**

 * @param {number} productId 
 * @param {number} width 
 * @param {number} height 
 * @returns {string|null} 
 */
export function getProductImageUrl(productId, width = 300, height = 300) {
  const publicId = PRODUCT_IMAGE_MAP[productId];

  if (!publicId) {
    console.warn(`Imagem não encontrada para produto ID ${productId}`);
    return null;
  }

  try {
    const img = cld.image(publicId);
    img.resize(fill().width(width).height(height));
    return img.toURL();
  } catch (error) {
    console.error(`Erro ao gerar URL da imagem para produto ${productId}:`, error);
    return null;
  }
}

/**
 * @param {Object} product
 * @returns {Object}
 */
export function enrichProductWithImage(product) {
  return {
    ...product,
    image: getProductImageUrl(product.id),
  };
}

/**

 * @param {Array} products 
 * @returns {Array} 
 */
export function enrichProductsWithImages(products) {
  return products.map(enrichProductWithImage);
}
