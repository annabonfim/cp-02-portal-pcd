'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PaginaInicial() {
  const router = useRouter()
  const [mostrarTela, setMostrarTela] = useState(false)

  useEffect(() => {
    const cookies = document.cookie.split(';').map(c => c.trim())
    const token = cookies.find(c => c.startsWith('token='))?.split('=')[1]

    console.log('TOKEN NO COOKIE:', token)

    const usuarios = localStorage.getItem('usuarios')
    const lista = usuarios ? JSON.parse(usuarios) : []

    console.log('USUÁRIOS NO LOCALSTORAGE:', lista)

    const usuarioValido = lista.find((u: any) => u.token === token)

    if (usuarioValido) {
      console.log('Usuário autenticado, redirecionando...')
      router.push('/home')
    } else {
      console.log('Nenhum usuário autenticado encontrado.')
      setMostrarTela(true)
    }
  }, [router])

  if (!mostrarTela) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white">
      <img src="/boas-vindas.png" alt="Logo" className="w-70 h-70 mb-6 rounded-full" />
      <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Portal PCD</h1>
      <p className="text-gray-600 mb-6">Informação, inclusão e acessibilidade para todos!</p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/cad-user')}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Cadastre-se
        </button>
      </div>
    </div>
  )
}
