'use client'

import { useState } from 'react'

export default function RelatoriosPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runSimpleReport = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/obras')
      const data = await res.json()
      if (data.success) {
        setResult({ totalObras: data.total })
      } else {
        setError('Falha ao gerar relatório')
      }
    } catch (err) {
      console.error(err)
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Relatórios</h1>

        <p className="mb-4">Relatórios simples para visualização.</p>

        <div className="flex gap-2 mb-4">
          <button onClick={runSimpleReport} className="px-4 py-2 bg-blue-600 text-white rounded-md">Gerar Relatório Rápido</button>
        </div>

        {loading && <div>Gerando relatório...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {result && (
          <div className="mt-4">
            <p><strong>Total de obras:</strong> {result.totalObras}</p>
          </div>
        )}
      </div>
    </div>
  )
}
