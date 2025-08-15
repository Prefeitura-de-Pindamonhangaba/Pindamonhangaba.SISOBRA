'use client'

import { useState, useEffect } from 'react'

interface Prefeitura {
  idPrefeitura: string
  nmPrefeitura: string | null
  nmEndereco: string | null
  nmBairro: string | null
  nmCidade: string | null
  csUf: string | null
  nuTelefone: string | null
  teEmail: string | null
}

export default function PrefeiturasPage() {
  const [prefeituras, setPrefeituras] = useState<Prefeitura[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const fetchPrefeituras = async (searchTerm = '') => {
    try {
      setLoading(true)
      const url = searchTerm 
        ? `/api/prefeituras?search=${encodeURIComponent(searchTerm)}`
        : '/api/prefeituras'
      
      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setPrefeituras(data.data)
        setError(null)
      } else {
        setError(data.error || 'Erro ao carregar dados')
      }
    } catch (err) {
      setError('Erro de conexão')
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrefeituras()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchPrefeituras(search)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Carregando prefeituras...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Erro:</strong> {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Prefeituras</h1>
        
        {/* Formulário de busca */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por nome da prefeitura..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              🔍 Buscar
            </button>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                fetchPrefeituras()
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Limpar
            </button>
          </div>
        </form>

        {/* Resultado */}
        <div className="text-sm text-gray-600 mb-4">
          {prefeituras.length} prefeitura(s) encontrada(s)
        </div>

        {/* Lista de prefeituras */}
        {prefeituras.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma prefeitura encontrada
          </div>
        ) : (
          <div className="grid gap-4">
            {prefeituras.map((pref) => (
              <div key={pref.idPrefeitura} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-blue-600">
                      {pref.nmPrefeitura || 'Nome não informado'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>ID:</strong> {pref.idPrefeitura}
                    </p>
                    {pref.nmEndereco && (
                      <p className="text-sm">
                        <strong>Endereço:</strong> {pref.nmEndereco}
                      </p>
                    )}
                    {pref.nmBairro && (
                      <p className="text-sm">
                        <strong>Bairro:</strong> {pref.nmBairro}
                      </p>
                    )}
                  </div>
                  <div>
                    {pref.nmCidade && (
                      <p className="text-sm">
                        <strong>Cidade:</strong> {pref.nmCidade} - {pref.csUf}
                      </p>
                    )}
                    {pref.nuTelefone && (
                      <p className="text-sm">
                        <strong>Telefone:</strong> {pref.nuTelefone}
                      </p>
                    )}
                    {pref.teEmail && (
                      <p className="text-sm">
                        <strong>Email:</strong> {pref.teEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}