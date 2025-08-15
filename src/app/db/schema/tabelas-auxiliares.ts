import { pgTable, varchar, integer, char, timestamp } from 'drizzle-orm/pg-core'

// Todas as tabelas auxiliares em minúsculo
export const tabCodDiv = pgTable('tab_cod_div', {
  csTab: varchar('cs_tab', { length: 2 }).notNull(),
  csElem: varchar('cs_elem', { length: 9 }).notNull(),
  nmElem: varchar('nm_elem', { length: 70 }),
  ctOcorr: integer('ct_ocorr'),
}, (table) => ({
  pk: {
    name: 'PK_TAB_COD_DIV',
    columns: [table.csTab, table.csElem]
  }
}))

export const tabMuni = pgTable('tab_muni', {
  idMunic: varchar('id_munic', { length: 6 }).primaryKey(),
  nmMunic: varchar('nm_munic', { length: 30 }),
  idRegiao: varchar('id_regiao', { length: 2 }),
})

export const tabSat = pgTable('tab_sat', {
  csSat: varchar('cs_sat', { length: 7 }).primaryKey(),
  nmSat: varchar('nm_sat', { length: 70 }),
})

export const tabCep = pgTable('tab_cep', {
  nuCep: varchar('nu_cep', { length: 8 }).primaryKey(),
  idTipoLogr: varchar('id_tipo_logr', { length: 10 }),
  teDescricaoCep: varchar('te_descricao_cep', { length: 70 }),
  nmBairro: varchar('nm_bairro', { length: 60 }),
  sgUf: varchar('sg_uf', { length: 2 }),
  idMuniPrev: varchar('id_muni_prev', { length: 5 }),
})

export const tabUoInss = pgTable('tab_uo_inss', {
  idUoInss: varchar('id_uo_inss', { length: 8 }).primaryKey(),
  nmGraf: varchar('nm_graf', { length: 30 }),
  nmLgrdGr: varchar('nm_lgrd_gr', { length: 55 }),
  nmBairGr: varchar('nm_bair_gr', { length: 20 }),
  nmCidGr: varchar('nm_cid_gr', { length: 30 }),
  csUfGr: varchar('cs_uf_gr', { length: 2 }),
  nuCepGr: varchar('nu_cep_gr', { length: 8 }),
  nuTelGr: varchar('nu_tel_gr', { length: 14 }),
  nuFaxGr: varchar('nu_fax_gr', { length: 14 }),
  nmGerente: varchar('nm_gerente', { length: 40 }),
  inativa: varchar('inativa', { length: 1 }),
  interna: varchar('interna', { length: 1 }),
  idGraf: varchar('id_graf', { length: 5 }),
  idPaf: varchar('id_paf', { length: 3 }),
  idUoAnt: varchar('id_uo_ant', { length: 8 }),
})

export const sisobraIni = pgTable('sisobra_ini', {
  idItem: varchar('id_item', { length: 20 }),
  txDescricao: varchar('tx_descricao', { length: 80 }),
})