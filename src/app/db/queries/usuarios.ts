import { db } from '../config'
import { usuarios } from '../schema'
import { eq, like, asc } from 'drizzle-orm'

// Consulta básica: buscar todos os usuários
export async function getAllUsuarios() {
  try {
    const result = await db
      .select()
      .from(usuarios)
      .orderBy(asc(usuarios.txNome))
    return result
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

// Consulta por ID
export async function getUsuarioById(id: string) {
  try {
    const result = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.idUsuario, id))
      .limit(1)
    return result[0] || null
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error)
    throw error
  }
}

// Consulta com filtro de texto
export async function searchUsuariosByName(searchTerm: string) {
  try {
    const result = await db
      .select()
      .from(usuarios)
      .where(like(usuarios.txNome, `%${searchTerm}%`))
      .orderBy(asc(usuarios.txNome))
      .limit(10)
    return result
  } catch (error) {
    console.error('Erro ao pesquisar usuários:', error)
    throw error
  }
}
