'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Usuario } from '@/types/Usuario'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'


export default function CadastroPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const gerarToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  const handleCadastro = () => {
    const novoUsuario: Usuario = {
      nome,
      email,
      senha,
      token: gerarToken(),
    }

    const dadosSalvos = localStorage.getItem('usuarios')
    const listaUsuarios: Usuario[] = dadosSalvos ? JSON.parse(dadosSalvos) : []

    const jaExiste = listaUsuarios.some(u => u.email === email)
    if (jaExiste) {
      alert('Este e-mail já está cadastrado.')
      return
    }

    listaUsuarios.push(novoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios))

    alert('Cadastro realizado com sucesso!')
    router.push('/login')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <div className="p-6 w-full max-w-sm">
          <div className="flex justify-center mb-4">
            <img
              src="/joinha.png"
              alt="Imagem de uma mulher cega sorrindo e fazendo joinha"
              className="w-48 rounded-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">Cadastro de Usuário</h1>
          <input className="border p-2 w-full mb-2 rounded" placeholder="Nome" onChange={e => setNome(e.target.value)} />
          <input className="border p-2 w-full mb-2 rounded" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input className="border p-2 w-full mb-4 rounded" type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
          <button className="bg-green-600 text-white p-2 w-full rounded" onClick={handleCadastro}>Cadastrar</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}