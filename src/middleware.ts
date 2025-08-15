import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Log básico para debug (remover em produção se necessário)
  console.log(`${request.method} ${request.url}`);

  // Headers de segurança básicos
  const response = NextResponse.next();

  // Adicionar headers de segurança
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Para sistema interno - permitir CORS se necessário
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    /*
     * Aplicar middleware em todas as rotas exceto:
     * - /api (rotas de API)
     * - /_next/static (arquivos estáticos)
     * - /_next/image (otimização de imagens)
     * - /favicon.ico
     * - arquivos estáticos (.png, .jpg, .css, .js, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};
