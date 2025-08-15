import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Configuração do pool de conexões
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'sisobra',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Instância do Drizzle
export const db = drizzle(pool)

// Função para testar conexão
export async function testConnection(): Promise<boolean> {
  try {
    await db.execute('SELECT NOW()')
    console.log('✅ Conexão com PostgreSQL (Drizzle) estabelecida com sucesso')
    return true
  } catch (error) {
    console.error('❌ Erro ao conectar com PostgreSQL:', error)
    return false
  }
}

export { pool }