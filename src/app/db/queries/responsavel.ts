import { db } from '../config'
import { responsavel } from '../schema'
import { eq, like, asc } from 'drizzle-orm'

// Consulta básica: buscar todos os responsáveis
export async function getAllResponsaveis() {
  try {
    const result = await db
      .select()
      .from(responsavel)
      .orderBy(asc(responsavel.nmResponsavel))
    return result
  } catch (error) {
    console.error('Erro ao buscar responsáveis:', error)
    throw error
  }
}

// Consulta por ID
export async function getResponsavelById(id: string) {
  try {
    const result = await db
      .select()
      .from(responsavel)
      .where(eq(responsavel.idResponsavel, id))
      .limit(1)
    return result[0] || null
  } catch (error) {
    console.error('Erro ao buscar responsável por ID:', error)
    throw error
  }
}

// Consulta com filtro de texto
export async function searchResponsaveisByName(searchTerm: string) {
  try {
    const result = await db
      .select()
      .from(responsavel)
      .where(like(responsavel.nmResponsavel, `%${searchTerm}%`))
      .orderBy(asc(responsavel.nmResponsavel))
      .limit(10)
    return result
  } catch (error) {
    console.error('Erro ao pesquisar responsáveis:', error)
    throw error
  }
}
