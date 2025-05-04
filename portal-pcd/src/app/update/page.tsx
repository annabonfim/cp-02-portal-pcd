'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUsuarioAutenticado } from '@/lib/auth'
import { Usuario } from '@/types/Usuario'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function UpdatePage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [indice, setIndice] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const usuario = getUsuarioAutenticado()
    if (!usuario) {
      router.push('/login')
      return
    }

    const dadosSalvos = localStorage.getItem('usuarios')
    const listaUsuarios: Usuario[] = dadosSalvos ? JSON.parse(dadosSalvos) : []

    const index = listaUsuarios.findIndex(u => u.token === usuario.token)

    if (index !== -1) {
      setUsuario(listaUsuarios[index])
      setIndice(index)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleSalvar = () => {
    if (!usuario || indice === null) return

    const dadosSalvos = localStorage.getItem('usuarios')
    const listaUsuarios: Usuario[] = dadosSalvos ? JSON.parse(dadosSalvos) : []

    listaUsuarios[indice] = usuario
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios))
    alert('Dados atualizados com sucesso!')
  }

  if (!usuario) {
    return <p className="p-6">Carregando usuário...</p>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6 max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-4">Atualizar Dados</h1>
        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Nome"
          value={usuario.nome}
          onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Email"
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-4 rounded"
          type="password"
          placeholder="Senha"
          value={usuario.senha}
          onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
        />
        <button className="bg-blue-600 text-white p-2 w-full" onClick={handleSalvar}>
          Salvar Alterações
        </button>
      </main>
      <Footer />
    </div>
  )
}