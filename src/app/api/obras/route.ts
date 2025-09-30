import { NextRequest, NextResponse } from 'next/server'
import { getAllObras, getObraById, searchObrasByName } from '../../db/queries/obra'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const id = searchParams.get('id')

    if (id) {
      const numericId = Number(id)
      if (Number.isNaN(numericId)) {
        return NextResponse.json({ success: false, error: 'id inválido' }, { status: 400 })
      }
      const obra = await getObraById(numericId)
      return NextResponse.json({ success: true, data: obra ? [obra] : [] })
    }

    let obras
    if (search) {
      obras = await searchObrasByName(search)
    } else {
      obras = await getAllObras()
    }

    return NextResponse.json({ success: true, total: obras.length, data: obras })
  } catch (error) {
    console.error('Erro na API de obras:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
