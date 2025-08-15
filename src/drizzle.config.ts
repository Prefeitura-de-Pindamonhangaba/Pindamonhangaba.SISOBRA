import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' })

// Validação das variáveis obrigatórias
const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD']
const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
  throw new Error(
    `❌ Variáveis de ambiente obrigatórias não definidas: ${missingVars.join(', ')}\n` +
    `Verifique se o arquivo .env.local existe e contém todas as variáveis necessárias.`
  )
}

// Configuração do Drizzle Kit
export default {
  schema: './src/app/db/schema/index.ts',
  out: './src/app/db/migrations',
  dialect: 'postgresql', // Novo formato (substitui 'driver')
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
  },
  // Configurações adicionais
  verbose: true, // Logs detalhados
  strict: true,  // Validações rigorosas
  // Configuração para migração
  migrations: {
    prefix: 'timestamp', // Prefixo das migrações
    schema: 'public'     // Schema padrão
  }
} satisfies Config