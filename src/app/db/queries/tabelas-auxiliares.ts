import { db } from '../config'
import { tabCodDiv, tabMuni, tabSat, tabCep, tabUoInss, sisobraIni } from '../schema'
import { eq, like, asc } from 'drizzle-orm'

// Consulta básica: buscar todos os códigos diversos
export async function getAllTabCodDiv() {
  try {
    const result = await db.select().from(tabCodDiv).orderBy(asc(tabCodDiv.nmElem))
    return result
  } catch (error) {
    console.error('Erro ao buscar TAB_COD_DIV:', error)
    throw error
  }
}

// Consulta básica: buscar todos os municípios
export async function getAllTabMuni() {
  try {
    const result = await db.select().from(tabMuni).orderBy(asc(tabMuni.nmMunic))
    return result
  } catch (error) {
    console.error('Erro ao buscar TAB_MUNI:', error)
    throw error
  }
}

// Consulta básica: buscar todos os SATs
export async function getAllTabSat() {
  try {
    const result = await db.select().from(tabSat).orderBy(asc(tabSat.nmSat))
    return result
  } catch (error) {
    console.error('Erro ao buscar TAB_SAT:', error)
    throw error
  }
}

// Consulta básica: buscar todos os CEPs
export async function getAllTabCep() {
  try {
    const result = await db.select().from(tabCep).orderBy(asc(tabCep.nuCep))
    return result
  } catch (error) {
    console.error('Erro ao buscar TAB_CEP:', error)
    throw error
  }
}

// Consulta básica: buscar todas as UO INSS
export async function getAllTabUoInss() {
  try {
    const result = await db.select().from(tabUoInss).orderBy(asc(tabUoInss.nmGraf))
    return result
  } catch (error) {
    console.error('Erro ao buscar TAB_UO_INSS:', error)
    throw error
  }
}

// Consulta básica: buscar todas as configurações do sistema
export async function getAllSisobraIni() {
  try {
    const result = await db.select().from(sisobraIni).orderBy(asc(sisobraIni.idItem))
    return result
  } catch (error) {
    console.error('Erro ao buscar SISOBRA_INI:', error)
    throw error
  }
}
