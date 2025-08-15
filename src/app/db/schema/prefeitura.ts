import { pgTable, varchar, char } from 'drizzle-orm/pg-core'

// PREFEITURA
export const prefeitura = pgTable('PREFEITURA', {
  idPrefeitura: varchar('ID_PREFEITURA', { length: 14 }).primaryKey(),
  codigo: varchar('CODIGO', { length: 14 }),
  nmPrefeitura: varchar('NM_PREFEITURA', { length: 55 }),
  nmEndereco: varchar('NM_ENDERECO', { length: 55 }),
  nuEndereco: varchar('NU_ENDERECO', { length: 10 }).default(''),
  complEndereco: varchar('COMPL_ENDERECO', { length: 10 }).default(''),
  nmBairro: varchar('NM_BAIRRO', { length: 20 }),
  nuCep: varchar('NU_CEP', { length: 8 }),
  idMunicipio: varchar('ID_MUNICIPIO', { length: 6 }),
  nmCidade: varchar('NM_CIDADE', { length: 30 }),
  csUf: char('CS_UF', { length: 2 }),
  nuTelefone: varchar('NU_TELEFONE', { length: 14 }),
  teEmail: varchar('TE_EMAIL', { length: 60 }),
  idDepartamento: varchar('ID_DEPARTAMENTO', { length: 55 }),
  csSeqAlvara: varchar('CS_SEQ_ALVARA', { length: 1 }).default('F'),
  csSeqHabitese: varchar('CS_SEQ_HABITESE', { length: 1 }).default('F'),
})