'use client'
'use client'
import { ReactNode } from 'react'
import { getUsuarioAutenticado } from '@/lib/auth'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const conteudos: Record<string, { titulo: string; descricao?: ReactNode }> = {
  saude: {
    titulo: 'Serviços de Saúde e Reabilitação',
    descricao: (
      <>
        <p className="mb-4">
          A área de saúde e reabilitação é essencial para garantir o bem-estar e a qualidade de vida das Pessoas com Deficiência. Este serviço oferece atendimentos médicos especializados em diversas áreas como neurologia, ortopedia, psiquiatria, entre outras, com estrutura acessível e comunicação adaptada (como Libras ou comunicação alternativa).
        </p>
        <p className="mb-4">
          A reabilitação física é realizada por meio de fisioterapia, terapia ocupacional e fonoaudiologia, contribuindo para o desenvolvimento motor, cognitivo e comunicativo. Já a reabilitação intelectual e psicossocial é apoiada por psicólogos, neuropsicólogos e assistentes sociais que promovem o fortalecimento emocional, autoestima e suporte familiar.
        </p>
        <p className="mb-4">
          Também é fundamental o uso de tecnologias assistivas, como cadeiras de rodas, órteses e próteses, além de programas especializados para cada tipo de deficiência, com atendimento multidisciplinar. A combinação desses recursos visa proporcionar maior autonomia, inclusão e participação social para a PcD.
        </p>
      </>
    ),
  },
  beneficios: {
    titulo: 'Benefícios e Direitos',
    descricao: (
      <>
        <p className="mb-4">
          Pessoas com Deficiência têm uma série de direitos assegurados por lei, como o Benefício de Prestação Continuada (BPC), que garante um salário mínimo mensal a quem não pode se sustentar. Há também modalidades de aposentadoria específicas, além de isenções de impostos como IPI, IPVA e ICMS na compra de veículos adaptados.
        </p>
        <p className="mb-4">
          O direito ao passe livre em transportes públicos, prioridade de atendimento e reserva de vagas em concursos e empregos são outros exemplos importantes. Além disso, PcDs têm direito à educação inclusiva, à moradia acessível, ao acesso à cultura e lazer, e à proteção contra discriminação.
        </p>
      </>
    ),
  },
  emprego: {
    titulo: 'Emprego e Profissionalização',
    descricao: (
      <>
        <p className="mb-4">
          A inclusão no mercado de trabalho é um direito das Pessoas com Deficiência. A Lei de Cotas obriga empresas com mais de 100 funcionários a reservarem um percentual de vagas para PcDs. Além disso, existem programas de reabilitação e capacitação profissional oferecidos por instituições públicas e privadas.
        </p>
        <p className="mb-4">
          A tecnologia assistiva facilita o desempenho de funções, e o empreendedorismo também é incentivado, com acesso a microcrédito e capacitação. O ambiente de trabalho deve ser acessível e livre de preconceito, garantindo igualdade de condições e respeito aos direitos trabalhistas.
        </p>
      </>
    ),
  },
  educacao: {
    titulo: 'Educação Inclusiva',
    descricao: (
      <>
        <p className="mb-4">
          A educação inclusiva garante que pessoas com deficiência possam estudar em escolas regulares, com os apoios e recursos necessários. Isso inclui adaptações curriculares, professores especializados, intérpretes de Libras, materiais em Braille e tecnologias assistivas.
        </p>
        <p className="mb-4">
          O Atendimento Educacional Especializado (AEE) complementa a aprendizagem, e a participação da família e de equipes multidisciplinares é fundamental. Também é importante preparar a transição para o ensino superior e o mercado de trabalho.
        </p>
      </>
    ),
  },
  mobilidade: {
    titulo: 'Acessibilidade Urbana e Mobilidade',
    descricao: (
      <>
        <p className="mb-4">
          A acessibilidade urbana é essencial para a autonomia das Pessoas com Deficiência. Isso inclui calçadas com piso tátil, rampas, semáforos sonoros, banheiros acessíveis e sinalizações adequadas. O transporte público deve contar com veículos adaptados e plataformas elevatórias.
        </p>
        <p className="mb-4">
          A legislação brasileira exige que espaços públicos e privados atendam às normas de acessibilidade. A tecnologia assistiva, como cadeiras motorizadas e scooters, também contribui para a mobilidade.
        </p>
      </>
    ),
  },
  psicologico: {
    titulo: 'Comunidades e Apoio Psicológico',
    descricao: (
      <>
        <p className="mb-4">
          O apoio psicológico e a conexão com comunidades são fundamentais para o bem-estar de Pessoas com Deficiência. Existem grupos presenciais e online que promovem o acolhimento, a troca de experiências e a escuta ativa.
        </p>
        <p className="mb-4">
          Psicólogos e terapeutas oferecem suporte individual ou em grupo, enquanto familiares e cuidadores também encontram orientação e apoio. Organizações sociais desempenham papel importante na criação desses espaços e na defesa dos direitos.
        </p>
      </>
    ),
  },
  tecnologia: {
    titulo: 'Produtos e Tecnologia Assistiva',
    descricao: (
      <>
        <p className="mb-4">
          A tecnologia assistiva inclui produtos e recursos que promovem independência e inclusão, como leitores de tela, softwares de voz, cadeiras de rodas motorizadas, aparelhos auditivos e sistemas de comunicação alternativa.
        </p>
        <p className="mb-4">
          Esses recursos devem ser avaliados e prescritos por profissionais, e há políticas públicas e programas de financiamento para garantir o acesso gratuito ou subsidiado a quem precisa.
        </p>
      </>
    ),
  },
  denuncias: {
    titulo: 'Denúncias e Reclamações',
    descricao: (
      <>
        <p className="mb-4">
          O Portal PCD oferece canais específicos para denúncias relacionadas à discriminação, falta de acessibilidade e violações de direitos. É possível relatar casos por e-mail ou chat, com a opção de se manter anônimo.
        </p>
        <p className="mb-4">
          As informações enviadas são analisadas com sigilo e seriedade, com o objetivo de encaminhar soluções e garantir o cumprimento da legislação. A sua voz é essencial para promover um ambiente mais justo e acessível para todos.
        </p>
      </>
    ),
  },
}

export default function ServicoPage() {
  const { servico } = useParams()
  const router = useRouter()

  useEffect(() => {
    const usuario = getUsuarioAutenticado()
    if (!usuario) {
      router.push('/login')
    }
  }, [router])

  const conteudo = conteudos[String(servico)]

  if (!conteudo) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Serviço não encontrado </h1>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{conteudo.titulo}</h1>
      <div className="text-gray-700">{conteudo.descricao}</div>
    </div>
  )
}