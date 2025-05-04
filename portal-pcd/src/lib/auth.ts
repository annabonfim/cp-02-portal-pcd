export function getTokenFromCookies(): string | null {
    const cookies = document.cookie.split(';').map(c => c.trim())
    const token = cookies.find(c => c.startsWith('token='))?.split('=')[1]
    return token || null
  }
  
  export function getUsuarioAutenticado(): any | null {
    const token = getTokenFromCookies()
    const dados = localStorage.getItem('usuarios')
    const lista = dados ? JSON.parse(dados) : []
  
    return lista.find((u: any) => u.token === token) || null
  }
  
  export function logout() {
    // Remove o token do cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
  