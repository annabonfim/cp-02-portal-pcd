'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getUsuarioAutenticado } from '@/lib/auth'
import { Usuario } from '@/types/Usuario'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function HomePage() {
  const router = useRouter()
  const [autenticado, setAutenticado] = useState<boolean>(false)

  useEffect(() => {
    const usuario = getUsuarioAutenticado()
    if (!usuario) {
      router.push('/login')
    } else {
      setAutenticado(true)
    }
  }, [router])

  if (!autenticado) return null

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6 text-center">
        <img
          src="banner-portal-pcd.png"
          alt="Ilustração inclusiva com pessoas diversas felizes"
         className="mx-auto mb-6 max-w-2xl rounded shadow"
        />
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Portal PCD</h1>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          O Portal PCD é uma iniciativa dedicada a apoiar pessoas com deficiência em diversas áreas da vida. Nosso objetivo é centralizar informações úteis, promover direitos, divulgar serviços acessíveis e fortalecer a inclusão social. Aqui você encontrará conteúdos sobre saúde, educação inclusiva, emprego, mobilidade, tecnologia assistiva, apoio psicológico e muito mais. Tudo em um só lugar, com acessibilidade, clareza e respeito à diversidade. Navegue, conheça seus direitos e encontre soluções que contribuem para mais autonomia, dignidade e bem-estar no dia a dia.
        </p>
        <button
          onClick={() => router.push('/listagem')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Ver serviços disponíveis
        </button>
      </main>
      <Footer />
    </div>
  )
}