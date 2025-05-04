'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getUsuarioAutenticado } from '@/lib/auth'
import { Servico } from '@/types/Servico'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const servicos: Servico[] = [
  { id: 'saude', titulo: 'Serviços de Saúde e Reabilitação' },
  { id: 'beneficios', titulo: 'Benefícios e Direitos' },
  { id: 'emprego', titulo: 'Emprego e Profissionalização' },
  { id: 'educacao', titulo: 'Educação Inclusiva' },
  { id: 'mobilidade', titulo: 'Acessibilidade Urbana e Mobilidade' },
  { id: 'psicologico', titulo: 'Comunidades e Apoio Psicológico' },
  { id: 'tecnologia', titulo: 'Produtos e Tecnologia Assistiva' },
  { id: 'denuncias', titulo: 'Denúncias e Reclamações' },
]

export default function ListagemPage() {
  const router = useRouter()

  useEffect(() => {
    const usuario = getUsuarioAutenticado()
    if (!usuario) {
      router.push('/login')
    }
  }, [router])

  const handleClick = (id: string) => {
    router.push(`/listagem/${id}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Serviços para o público PCD</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {servicos.map(servico => (
            <div
              key={servico.id}
              onClick={() => handleClick(servico.id)}
              className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
            >
              <h2 className="text-lg font-semibold">{servico.titulo}</h2>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}