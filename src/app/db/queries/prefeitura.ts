import { db } from '../config'
import { prefeitura } from '../schema'
import { eq, like, asc } from 'drizzle-orm'

// Consulta básica: buscar todas as prefeituras
export async function getAllPrefeituras() {
  try {
    const result = await db
      .select()
      .from(prefeitura)
      .orderBy(asc(prefeitura.nmPrefeitura))
    
    return result
  } catch (error) {
    console.error('Erro ao buscar prefeituras:', error)
    throw error
  }
}

// Consulta por ID (exemplo de filtro)
export async function getPrefeituraById(id: string) {
  try {
    const result = await db
      .select()
      .from(prefeitura)
      .where(eq(prefeitura.idPrefeitura, id))
      .limit(1)
    
    return result[0] || null
  } catch (error) {
    console.error('Erro ao buscar prefeitura por ID:', error)
    throw error
  }
}

// Consulta com filtro de texto (exemplo de busca)
export async function searchPrefeiturasByName(searchTerm: string) {
  try {
    const result = await db
      .select()
      .from(prefeitura)
      .where(like(prefeitura.nmPrefeitura, `%${searchTerm}%`))
      .orderBy(asc(prefeitura.nmPrefeitura))
      .limit(10)
    
    return result
  } catch (error) {
    console.error('Erro ao pesquisar prefeituras:', error)
    throw error
  }
}