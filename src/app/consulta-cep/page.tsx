'use client'

import { useState } from 'react'

function getField(obj: any, ...keys: string[]) {
  for (const k of keys) if (obj && k in obj) return obj[k]
  return undefined
}

interface CepResult {
  cep?: string
  logradouro?: string
  bairro?: string
  cidade?: string
  uf?: string
}

export default function ConsultaCepPage() {
  const [cep, setCep] = useState('')
  const [result, setResult] = useState<CepResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCep = async () => {
    const cleaned = cep.replace(/\D/g, '')
    if (!cleaned) return setError('Informe um CEP válido')
    try {
      setLoading(true)
      setError(null)
      // Tenta a tabela interna primeiro
      const res = await fetch(`/api/tabelas-auxiliares?table=tab_cep`)
      const data = await res.json()
      if (data.success) {
        const found = data.data.find((r: any) => {
          const v = getField(r, 'nuCep', 'nu_cep', 'cep')
          return v && v.replace(/\D/g, '') === cleaned
        })
        if (found) {
          setResult({
            cep: getField(found, 'nuCep', 'nu_cep', 'cep'),
            logradouro: getField(found, 'teDescricaoCep', 'te_descricao_cep', 'logradouro'),
            bairro: getField(found, 'nmBairro', 'nm_bairro', 'bairro'),
            cidade: getField(found, 'nmCidade', 'nm_cidade', 'cidade'),
            uf: getField(found, 'sgUf', 'sg_uf', 'uf'),
          })
          return
        }
      }

      // fallback: usar ViaCEP se não achar
      const via = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`)
      const viaJson = await via.json()
      if (viaJson.erro) {
        setResult(null)
        setError('CEP não encontrado')
      } else {
        setResult({
          cep: viaJson.cep,
          logradouro: viaJson.logradouro,
          bairro: viaJson.bairro,
          cidade: viaJson.localidade,
          uf: viaJson.uf,
        })
      }

    } catch (err) {
      console.error(err)
      setError('Erro ao buscar CEP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Consulta CEP</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">CEP</label>
          <div className="flex gap-2 mt-1">
            <input value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite o CEP" className="flex-1 px-3 py-2 border rounded" />
            <button onClick={fetchCep} className="px-4 py-2 bg-blue-600 text-white rounded-md">Buscar</button>
          </div>
        </div>

        {loading && <div>Buscando...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {result && (
          <div className="mt-4">
            <p><strong>CEP:</strong> {result.cep}</p>
            <p><strong>Logradouro:</strong> {result.logradouro}</p>
            <p><strong>Bairro:</strong> {result.bairro}</p>
            <p><strong>Cidade:</strong> {result.cidade}</p>
            <p><strong>UF:</strong> {result.uf}</p>
          </div>
        )}
      </div>
    </div>
  )
}
