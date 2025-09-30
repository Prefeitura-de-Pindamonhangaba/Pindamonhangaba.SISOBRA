import { db } from '../config'
import { obra } from '../schema'
import { eq, like, asc, desc } from 'drizzle-orm'

// Consulta básica: buscar todas as obras
export async function getAllObras() {
  try {
    const result = await db
      .select()
      .from(obra)
      .orderBy(desc(obra.dtAlvara))
    return result
  } catch (error) {
    console.error('Erro ao buscar obras:', error)
    throw error
  }
}

// Consulta por ID
export async function getObraById(id: number) {
  try {
    const result = await db
      .select()
      .from(obra)
      .where(eq(obra.idObra, id))
      .limit(1)
    return result[0] || null
  } catch (error) {
    console.error('Erro ao buscar obra por ID:', error)
    throw error
  }
}

// Consulta com filtro de texto
export async function searchObrasByName(searchTerm: string) {
  try {
    const result = await db
      .select()
      .from(obra)
      .where(like(obra.nmObra, `%${searchTerm}%`))
      .orderBy(asc(obra.nmObra))
      .limit(10)
    return result
  } catch (error) {
    console.error('Erro ao pesquisar obras:', error)
    throw error
  }
}
