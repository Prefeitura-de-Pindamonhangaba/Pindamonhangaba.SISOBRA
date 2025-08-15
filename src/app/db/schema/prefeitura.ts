import { pgTable, varchar, char } from 'drizzle-orm/pg-core'

// PREFEITURA - usando nomes em minúsculo como no banco
export const prefeitura = pgTable('prefeitura', {
  idPrefeitura: varchar('id_prefeitura', { length: 14 }).primaryKey(),
  codigo: varchar('codigo', { length: 14 }),
  nmPrefeitura: varchar('nm_prefeitura', { length: 55 }),
  nmEndereco: varchar('nm_endereco', { length: 55 }),
  nuEndereco: varchar('nu_endereco', { length: 10 }).default(''),
  complEndereco: varchar('compl_endereco', { length: 10 }).default(''),
  nmBairro: varchar('nm_bairro', { length: 20 }),
  nuCep: varchar('nu_cep', { length: 8 }),
  idMunicipio: varchar('id_municipio', { length: 6 }),
  nmCidade: varchar('nm_cidade', { length: 30 }),
  csUf: char('cs_uf', { length: 2 }),
  nuTelefone: varchar('nu_telefone', { length: 14 }),
  teEmail: varchar('te_email', { length: 60 }),
  idDepartamento: varchar('id_departamento', { length: 55 }),
  csSeqAlvara: varchar('cs_seq_alvara', { length: 1 }).default('F'),
  csSeqHabitese: varchar('cs_seq_habitese', { length: 1 }).default('F'),
})