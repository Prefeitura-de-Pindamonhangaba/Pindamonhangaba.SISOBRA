import { pgTable, varchar, integer, char, timestamp } from 'drizzle-orm/pg-core'

// TAB_COD_DIV - Tabela de códigos diversos
export const tabCodDiv = pgTable('TAB_COD_DIV', {
  csTab: varchar('CS_TAB', { length: 2 }).notNull(),
  csElem: varchar('CS_ELEM', { length: 9 }).notNull(),
  nmElem: varchar('NM_ELEM', { length: 70 }),
  ctOcorr: integer('CT_OCORR'),
}, (table) => ({
  pk: {
    name: 'PK_TAB_COD_DIV',
    columns: [table.csTab, table.csElem]
  }
}))

// TAB_MUNI - Tabela de municípios
export const tabMuni = pgTable('TAB_MUNI', {
  idMunic: varchar('ID_MUNIC', { length: 6 }).primaryKey(),
  nmMunic: varchar('NM_MUNIC', { length: 30 }),
  idRegiao: varchar('ID_REGIAO', { length: 2 }),
})

// TAB_SAT - Tabela SAT
export const tabSat = pgTable('TAB_SAT', {
  csSat: varchar('CS_SAT', { length: 7 }).primaryKey(),
  nmSat: varchar('NM_SAT', { length: 70 }),
})

// TAB_CEP - Tabela de CEPs
export const tabCep = pgTable('TAB_CEP', {
  nuCep: varchar('NU_CEP', { length: 8 }).primaryKey(),
  idTipoLogr: varchar('ID_TIPO_LOGR', { length: 10 }),
  teDescricaoCep: varchar('TE_DESCRICAO_CEP', { length: 70 }),
  nmBairro: varchar('NM_BAIRRO', { length: 60 }),
  sgUf: varchar('SG_UF', { length: 2 }),
  idMuniPrev: varchar('ID_MUNI_PREV', { length: 5 }),
})

// TAB_UO_INSS - Tabela UO INSS
export const tabUoInss = pgTable('TAB_UO_INSS', {
  idUoInss: varchar('ID_UO_INSS', { length: 8 }).primaryKey(),
  nmGraf: varchar('NM_GRAF', { length: 30 }),
  nmLgrdGr: varchar('NM_LGRD_GR', { length: 55 }),
  nmBairGr: varchar('NM_BAIR_GR', { length: 20 }),
  nmCidGr: varchar('NM_CID_GR', { length: 30 }),
  csUfGr: varchar('CS_UF_GR', { length: 2 }),
  nuCepGr: varchar('NU_CEP_GR', { length: 8 }),
  nuTelGr: varchar('NU_TEL_GR', { length: 14 }),
  nuFaxGr: varchar('NU_FAX_GR', { length: 14 }),
  nmGerente: varchar('NM_GERENTE', { length: 40 }),
  inativa: varchar('INATIVA', { length: 1 }),
  interna: varchar('INTERNA', { length: 1 }),
  idGraf: varchar('ID_GRAF', { length: 5 }),
  idPaf: varchar('ID_PAF', { length: 3 }),
  idUoAnt: varchar('ID_UO_ANT', { length: 8 }),
})

// SISOBRA_INI - Configurações do sistema
export const sisobraIni = pgTable('SISOBRA_INI', {
  idItem: varchar('ID_ITEM', { length: 20 }),
  txDescricao: varchar('TX_DESCRICAO', { length: 80 }),
})