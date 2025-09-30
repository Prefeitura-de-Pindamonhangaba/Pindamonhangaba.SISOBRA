'use client'

import { useState, useEffect } from 'react'

// helper para ler propriedade que pode estar em camelCase ou snake_case
function getField<T = any>(obj: any, ...keys: string[]): T | undefined {
  for (const k of keys) {
    if (obj == null) continue
    if (k in obj && obj[k] !== undefined) return obj[k]
  }
  return undefined
}

interface Obra {
  id?: number | string
  nome?: string
  endereco?: string
  bairro?: string
  cidade?: string
  uf?: string
  telefone?: string
}

export default function ObrasPage() {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const fetchObras = async (searchTerm = '') => {
    try {
      setLoading(true)
      const url = searchTerm ? `/api/obras?search=${encodeURIComponent(searchTerm)}` : '/api/obras'
      const res = await fetch(url)
      const data = await res.json()
      if (data.success) {
        // normalizar campos tentando várias chaves possíveis
        const normalized = data.data.map((row: any) => ({
          id: getField(row, 'idObra', 'id_obra', 'id'),
          nome: getField(row, 'nmObra', 'nm_obra', 'nome', 'nm_obra'),
          endereco: getField(row, 'nmEndereco', 'nm_endereco', 'endereco'),
          bairro: getField(row, 'nmBairro', 'nm_bairro', 'bairro'),
          cidade: getField(row, 'nmCidade', 'nm_cidade', 'cidade'),
          uf: getField(row, 'csUf', 'cs_uf', 'uf'),
        }))
        setObras(normalized)
        setError(null)
      } else {
        setError(data.error || 'Erro ao carregar obras')
      }
    } catch (err) {
      setError('Erro de conexão')
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchObras()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchObras(search)
  }

  if (loading) return <div className="flex justify-center items-center min-h-64"><div className="text-lg">Carregando obras...</div></div>
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"><strong>Erro:</strong> {error}</div>

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Obras</h1>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por nome, endereço..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">🔍 Buscar</button>
            <button type="button" onClick={() => { setSearch(''); fetchObras() }} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Limpar</button>
          </div>
        </form>

        <div className="text-sm text-gray-600 mb-4">{obras.length} obra(s) encontrada(s)</div>

        {obras.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhuma obra encontrada</div>
        ) : (
          <div className="grid gap-4">
            {obras.map((o) => (
              <div key={String(o.id)} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-blue-600">{o.nome || 'Nome não informado'}</h3>
                    <p className="text-sm text-gray-600"><strong>ID:</strong> {String(o.id)}</p>
                    {o.endereco && <p className="text-sm"><strong>Endereço:</strong> {o.endereco}</p>}
                    {o.bairro && <p className="text-sm"><strong>Bairro:</strong> {o.bairro}</p>}
                  </div>
                  <div>
                    {o.cidade && <p className="text-sm"><strong>Cidade:</strong> {o.cidade} - {o.uf}</p>}
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
