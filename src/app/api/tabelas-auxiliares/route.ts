import { NextRequest, NextResponse } from 'next/server'
import {
  getAllTabCodDiv,
  getAllTabMuni,
  getAllTabSat,
  getAllTabCep,
  getAllTabUoInss,
  getAllSisobraIni,
} from '../../db/queries/tabelas-auxiliares'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const table = searchParams.get('table') // optional: specify which auxiliary table

    if (table) {
      switch (table.toLowerCase()) {
        case 'tab_cod_div':
        case 'cod_div':
          return NextResponse.json({ success: true, data: await getAllTabCodDiv() })
        case 'tab_muni':
        case 'muni':
          return NextResponse.json({ success: true, data: await getAllTabMuni() })
        case 'tab_sat':
        case 'sat':
          return NextResponse.json({ success: true, data: await getAllTabSat() })
        case 'tab_cep':
        case 'cep':
          return NextResponse.json({ success: true, data: await getAllTabCep() })
        case 'tab_uo_inss':
        case 'uo_inss':
          return NextResponse.json({ success: true, data: await getAllTabUoInss() })
        case 'sisobra_ini':
        case 'ini':
          return NextResponse.json({ success: true, data: await getAllSisobraIni() })
        default:
          return NextResponse.json({ success: false, error: 'nome de tabela auxiliar desconhecido' }, { status: 400 })
      }
    }

    // If no specific table requested, return a combined object
    const [codDiv, muni, sat, cep, uoInss, ini] = await Promise.all([
      getAllTabCodDiv(),
      getAllTabMuni(),
      getAllTabSat(),
      getAllTabCep(),
      getAllTabUoInss(),
      getAllSisobraIni(),
    ])

    return NextResponse.json({
      success: true,
      data: {
        tab_cod_div: codDiv,
        tab_muni: muni,
        tab_sat: sat,
        tab_cep: cep,
        tab_uo_inss: uoInss,
        sisobra_ini: ini,
      },
    })
  } catch (error) {
    console.error('Erro nas tabelas auxiliares:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
