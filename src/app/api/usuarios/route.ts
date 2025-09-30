import { NextRequest, NextResponse } from 'next/server'
import { getAllUsuarios, getUsuarioById, searchUsuariosByName } from '../../db/queries/usuarios'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const id = searchParams.get('id')

    if (id) {
      const usuario = await getUsuarioById(id)
      return NextResponse.json({ success: true, data: usuario ? [usuario] : [] })
    }

    let usuarios
    if (search) {
      usuarios = await searchUsuariosByName(search)
    } else {
      usuarios = await getAllUsuarios()
    }

    return NextResponse.json({ success: true, total: usuarios.length, data: usuarios })
  } catch (error) {
    console.error('Erro na API de usuários:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
