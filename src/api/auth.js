import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://artelie-backend.onrender.com',
  withCredentials: false,
});

function normalizeAxiosError(err, fallbackMsg = 'Erro inesperado. Tente novamente.') {
  if (err?.response) {
    const data = err.response.data;
    if (typeof data === 'string') return data;
    if (data?.detail) return data.detail;
    if (data?.error) return data.error;
    if (data?.message) return data.message;
    return `${fallbackMsg} (HTTP ${err.response.status})`;
  }
  if (err?.request) return 'Sem resposta do servidor. Verifique sua conexão.';
  return err?.message || fallbackMsg;
}

export async function login({ email, username, password }) {
  const id = email || username;

  // No seu urls.py o token está em /token/
  try {
    const resp = await api.post('/token/', { username: id, password });
    const { access, refresh } = resp.data || {};
    if (!access) throw new Error('Token de acesso não retornado.');

    api.defaults.headers.common.Authorization = `Bearer ${access}`;

    // Buscar usuário atual: tenta /api/users/me/; se não existir, usa /profile/
    try {
      const meResp = await api.get('/api/users/me/');
      return { user: meResp.data, tokens: { access, refresh } };
    } catch (e1) {
      const status = e1?.response?.status;
      if (status && ![404, 405].includes(status)) {
        throw new Error(normalizeAxiosError(e1, 'Não foi possível carregar o usuário atual.'));
      }
      const prof = await api.get('/profile/');
      return { user: prof.data, tokens: { access, refresh } };
    }
  } catch (err) {
    throw new Error(normalizeAxiosError(err, 'Não foi possível fazer login.'));
  }
}

export async function register({ email, username, password }) {
  // No seu urls.py a rota é /register/
  try {
    const resp = await api.post('/register/', { email, username, password });
    return resp.data;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 500) {
      throw new Error('Cadastro indisponível no momento. O servidor retornou um erro interno.');
    }
    throw new Error(normalizeAxiosError(err, 'Não foi possível realizar o cadastro.'));
  }
}

export async function getCurrentUser() {
  try {
    const resp = await api.get('/api/users/me/');
    return resp.data;
  } catch (err) {
    throw new Error(normalizeAxiosError(err, 'Não foi possível carregar o usuário atual.'));
  }
}

export function logout() {
  delete api.defaults.headers.common.Authorization;
}
