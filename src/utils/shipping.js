// src/utils/shipping.js
import axios from 'axios'

/**
 * Busca endereço pelo CEP via ViaCEP
 */
export async function fetchAddressByCep(cep) {
  try {
    const cleanCep = cep.replace(/\D/g, '')
    
    if (cleanCep.length !== 8) {
      throw new Error('CEP inválido')
    }
    
    const { data } = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`)
    
    if (data.erro) {
      throw new Error('CEP não encontrado')
    }
    
    return {
      cep: data.cep,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    throw error
  }
}

/**
 * Calcula o frete baseado no CEP
 * (Simulação - em produção, integrar com Correios/Melhor Envio)
 */
export function calculateShipping(cep, cartTotal) {
  const cleanCep = cep.replace(/\D/g, '')
  
  // Simulação de cálculo de frete
  // Em produção, integrar com API dos Correios ou Melhor Envio
  
  const firstDigit = parseInt(cleanCep[0])
  
  // Simula frete por região (primeiro dígito do CEP)
  const baseShipping = {
    0: 15,  // São Paulo
    1: 18,  // São Paulo interior
    2: 22,  // Rio de Janeiro
    3: 25,  // Minas Gerais
    4: 28,  // Nordeste
    5: 30,  // Nordeste
    6: 32,  // Norte
    7: 35,  // Centro-Oeste
    8: 38,  // Sul
    9: 40   // Sul
  }
  
  let shipping = baseShipping[firstDigit] || 32
  
  // Frete grátis acima de R$ 200
  if (cartTotal >= 200) {
    shipping = 0
  }
  
  return {
    value: shipping,
    isFree: shipping === 0,
    estimatedDays: shipping === 0 ? 5 : Math.floor(Math.random() * 5) + 3 // 3-7 dias
  }
}
