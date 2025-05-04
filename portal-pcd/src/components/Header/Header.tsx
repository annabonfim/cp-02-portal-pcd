'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/')
  }

  const [temToken, setTemToken] = useState(false)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setTemToken(document.cookie.includes('token='))
    }
  }, [])

  const rotaPublica = pathname === '/login' || pathname === '/cad-user'

  return (
    <header className="bg-header text-white p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">Portal PCD</h1>
      <nav className="flex gap-6">
        {!rotaPublica ? (
          <Link href="/home" className="underline text-white cursor-pointer">Home</Link>
        ) : (
          <Link href="/" className="underline text-white cursor-pointer">Voltar à Página Inicial</Link>
        )}
        {temToken && (
          <Link href="/update" className="underline text-white cursor-pointer">Editar Perfil</Link>
        )}
        {!rotaPublica && (
          <button onClick={handleLogout} className="underline text-blue-950 hover:text-blue-950">
            Sair
          </button>
        )}
      </nav>
    </header>
  )
}