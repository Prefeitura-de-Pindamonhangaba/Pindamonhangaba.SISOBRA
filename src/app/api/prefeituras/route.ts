import { NextRequest, NextResponse } from 'next/server'
import { getAllPrefeituras, searchPrefeiturasByName } from '../../db/queries/prefeitura'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    let prefeituras

    if (search) {
      // Se há parâmetro de busca, fazer pesquisa
      prefeituras = await searchPrefeiturasByName(search)
    } else {
      // Senão, buscar todas
      prefeituras = await getAllPrefeituras()
    }

    return NextResponse.json({
      success: true,
      data: prefeituras,
      total: prefeituras.length
    })

  } catch (error) {
    console.error('Erro na API de prefeituras:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}