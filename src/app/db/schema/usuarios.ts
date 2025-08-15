import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core'

// USUARIOS - usando nomes em minúsculo
export const usuarios = pgTable('usuarios', {
  idUsuario: varchar('id_usuario', { length: 8 }).primaryKey(),
  idPass: varchar('id_pass', { length: 8 }).notNull(),
  txNome: varchar('tx_nome', { length: 55 }),
  txEmail: varchar('tx_email', { length: 60 }),
  csAcesso: integer('cs_acesso').default(1).notNull(),
  dtAtualizacao: timestamp('dt_atualizacao'),
})