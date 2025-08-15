import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core'

// USUARIOS
export const usuarios = pgTable('USUARIOS', {
  idUsuario: varchar('ID_USUARIO', { length: 8 }).primaryKey(),
  idPass: varchar('ID_PASS', { length: 8 }).notNull(),
  txNome: varchar('TX_NOME', { length: 55 }),
  txEmail: varchar('TX_EMAIL', { length: 60 }),
  csAcesso: integer('CS_ACESSO').default(1).notNull(),
  dtAtualizacao: timestamp('DT_ATUALIZACAO'),
})