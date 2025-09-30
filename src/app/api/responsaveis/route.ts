import { NextRequest, NextResponse } from 'next/server'
import { getAllResponsaveis, getResponsavelById, searchResponsaveisByName } from '../../db/queries/responsavel'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const id = searchParams.get('id')

    if (id) {
      const responsavel = await getResponsavelById(id)
      return NextResponse.json({ success: true, data: responsavel ? [responsavel] : [] })
    }

    let responsaveis
    if (search) {
      responsaveis = await searchResponsaveisByName(search)
    } else {
      responsaveis = await getAllResponsaveis()
    }

    return NextResponse.json({ success: true, total: responsaveis.length, data: responsaveis })
  } catch (error) {
    console.error('Erro na API de responsáveis:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
