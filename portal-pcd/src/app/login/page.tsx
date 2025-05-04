'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Usuario } from '@/types/Usuario'
import Header from '@/components/Header/Header'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    const dados = localStorage.getItem('usuarios')
    const listaUsuarios: Usuario[] = dados ? JSON.parse(dados) : []

    const usuarioIndex = listaUsuarios.findIndex(
      (u) => u.email === email && u.senha === senha
    )

    if (usuarioIndex !== -1) {
      const novoToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
      listaUsuarios[usuarioIndex].token = novoToken
      localStorage.setItem('usuarios', JSON.stringify(listaUsuarios))
      document.cookie = `token=${novoToken}; path=/; max-age=86400`
      router.push('/home')
    } else {
      alert('Usuário e/ou senha não encontrados!')
    }
  }

  return (
    <>
      <Header />
      <div className="page-centered">
        <div className="p-4 max-w-sm w-full">
          <div className="flex justify-center mb-6">
            <img
              src="/pessoa-acenando.png"
              alt="Pessoa PCD acenando"
              className="w-48 rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
          <input className="border p-2 w-full mb-2 rounded" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input className="border p-2 w-full mb-4 rounded" type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
          <button className="bg-blue-600 text-white p-2 rounded w-full" onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </>
  )
}