export function formatCPF(value) {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
}

export function formatDate(value) {
  const cleaned = value.replace(/\D/g, '');
  return cleaned
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
    .slice(0, 10);
}

export function formatPhone(value) {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

export function formatCEP(value) {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/(\d{5})(\d{0,3})/, '$1-$2').slice(0, 9);
}

export function formatCardNumber(value) {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, '$1 $2 $3 $4').trim().slice(0, 19);
}

export function formatCardExpiry(value) {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{0,2})/, '$1/$2').slice(0, 5);
}

export function formatCVV(value) {
  return value.replace(/\D/g, '').slice(0, 3);
}
