import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SISOBRA - Sistema de Visualização
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acesso aos dados históricos do sistema legado SISOBRA de Pindamonhangaba
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Bem-vindo ao SISOBRA</h2>
            <p className="text-gray-600">
              Este sistema permite visualizar dados históricos do sistema legado SISOBRA.
              Selecione uma das opções abaixo para começar a explorar os dados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
