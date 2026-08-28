export default async function Dashboard() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const headers = { apikey: supabaseKey, Authorization: 'Bearer ' + supabaseKey }
  let vehiculos: any[] = [], ventas: any[] = [], leads: any[] = [], reclamaciones: any[] = []
  try {
    const [rv, rvt, rl, rr] = await Promise.all([
      fetch(supabaseUrl + '/rest/v1/vehiculos?select=*&order=created_at.desc', { headers, cache: 'no-store' }),
      fetch(supabaseUrl + '/rest/v1/ventas?select=*&order=created_at.desc', { headers, cache: 'no-store' }),
      fetch(supabaseUrl + '/rest/v1/leads?select=*&order=created_at.desc', { headers, cache: 'no-store' }),
      fetch(supabaseUrl + '/rest/v1/reclamaciones?select=*&order=created_at.desc', { headers, cache: 'no-store' }),
    ])
    if (rv.ok) vehiculos = await rv.json()
    if (rvt.ok) ventas = await rvt.json()
    if (rl.ok) leads = await rl.json()
    if (rr.ok) reclamaciones = await rr.json()
  } catch (e) {}
  const disponibles = vehiculos.filter(v => v.estado === 'disponible').length
  const totalVentas = ventas.reduce((a, v) => a + (v.precio_venta || 0), 0)
  const utilidadTotal = ventas.reduce((a, v) => a + (v.utilidad_bruta || 0), 0)
  const reservaEmpresa = ventas.reduce((a, v) => a + (v.reserva_empresa || 0), 0)
  const thomas = ventas.reduce((a, v) => a + (v.distribucion_thomas || 0), 0)
  const manuel = ventas.reduce((a, v) => a + (v.distribucion_manuel || 0), 0)
  const leadsActivos = leads.filter(l => l.estado !== 'cerrado' && l.estado !== 'vendido').length
  const reclamacionesAbiertas = reclamaciones.filter(r => r.estado === 'Abierto').length
  const fmt = (n: number) => '$' + n.toLocaleString('es-CO')
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 border-b border-red-900 px-4 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-bold">Socios <span className="text-red-500">N</span><span className="text-amber-400">&amp;</span><span className="text-red-500">N</span></h1>
          <p className="text-gray-500 text-xs">Panel Administrativo</p>
        </div>
        <div className="flex gap-2">
          <a href="/admin/vehiculos/nuevo" className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-2 rounded-xl text-sm transition">+ Vehiculo</a>
          <a href="/admin/ventas/nueva" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-3 py-2 rounded-xl text-sm transition">+ Venta</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-gray-900 rounded-2xl p-4 border-l-4 border-red-600 border border-gray-800">
            <p className="text-gray-400 text-xs mb-1">En Lote</p>
            <p className="text-3xl font-bold">{vehiculos.length}</p>
            <p className="text-gray-500 text-xs mt-1">{disponibles} disponibles</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 border-l-4 border-amber-500 border border-gray-800">
            <p className="text-gray-400 text-xs mb-1">Leads Activos</p>
            <p className="text-3xl font-bold">{leadsActivos}</p>
            <p className="text-gray-500 text-xs mt-1">{leads.length} total</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 border-l-4 border-green-500 border border-gray-800">
            <p className="text-gray-400 text-xs mb-1">Ventas</p>
            <p className="text-3xl font-bold">{ventas.length}</p>
            <p className="text-gray-500 text-xs mt-1">{fmt(totalVentas)}</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 border-l-4 border-orange-500 border border-gray-800">
            <p className="text-gray-400 text-xs mb-1">Reclamaciones</p>
            <p className="text-3xl font-bold">{reclamacionesAbiertas}</p>
            <p className="text-gray-500 text-xs mt-1">abiertas</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 mb-6">
          <h2 className="text-base font-bold mb-4 text-amber-400">Distribucion de Utilidades</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs mb-1">Utilidad Bruta</p>
              <p className="text-xl font-bold text-white">{fmt(utilidadTotal)}</p>
            </div>
            <div className="bg-red-950 rounded-xl p-4 text-center border border-red-800">
              <p className="text-red-300 text-xs mb-1">Empresa (33.4%)</p>
              <p className="text-xl font-bold text-red-400">{fmt(reservaEmpresa)}</p>
            </div>
            <div className="bg-amber-950 rounded-xl p-4 text-center border border-amber-800">
              <p className="text-amber-300 text-xs mb-1">Thomas F. (33.3%)</p>
              <p className="text-xl font-bold text-amber-400">{fmt(thomas)}</p>
            </div>
            <div className="bg-orange-950 rounded-xl p-4 text-center border border-orange-800">
              <p className="text-orange-300 text-xs mb-1">Manuel E. (33.3%)</p>
              <p className="text-xl font-bold text-orange-400">{fmt(manuel)}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <a href="/admin/vehiculos" className="bg-gray-900 rounded-2xl border border-gray-800 p-4 hover:border-red-600 transition flex items-center gap-3">
            <span className="text-2xl">🚗</span>
            <div><p className="font-bold text-sm">Inventario</p><p className="text-gray-400 text-xs">{vehiculos.length} vehiculos</p></div>
          </a>
          <a href="/admin/leads" className="bg-gray-900 rounded-2xl border border-gray-800 p-4 hover:border-red-600 transition flex items-center gap-3">
            <span className="text-2xl">👥</span>
            <div><p className="font-bold text-sm">CRM / Leads</p><p className="text-gray-400 text-xs">{leadsActivos} activos</p></div>
          </a>
          <a href="/admin/ventas" className="bg-gray-900 rounded-2xl border border-gray-800 p-4 hover:border-red-600 transition flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <div><p className="font-bold text-sm">Ventas</p><p className="text-gray-400 text-xs">{ventas.length} registradas</p></div>
          </a>
          <a href="/admin/finanzas" className="bg-gray-900 rounded-2xl border border-gray-800 p-4 hover:border-red-600 transition flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div><p className="font-bold text-sm">Finanzas</p><p className="text-gray-400 text-xs">P&amp;L en tiempo real</p></div>
          </a>
          <a href="/admin/reclamaciones" className="bg-gray-900 rounded-2xl border border-gray-800 p-4 hover:border-red-600 transition flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div><p className="font-bold text-sm">Reclamaciones</p><p className="text-gray-400 text-xs">{reclamacionesAbiertas} abiertas</p></div>
          </a>
          <a href="/" className="bg-gray-900 rounded-2xl border border-gray-800 p-4 hover:border-red-600 transition flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <div><p className="font-bold text-sm">Pagina Web</p><p className="text-gray-400 text-xs">Vista publica</p></div>
          </a>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-red-400">Inventario Reciente</h2>
            <a href="/admin/vehiculos/nuevo" className="text-amber-400 text-sm hover:underline">+ Agregar</a>
          </div>
          {vehiculos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-3">No hay vehiculos registrados</p>
              <a href="/admin/vehiculos/nuevo" className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-500 transition">Agregar primer vehiculo</a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-800 text-xs">
                    <th className="text-left py-2 pr-4">Vehiculo</th>
                    <th className="text-left py-2 pr-4">Placa</th>
                    <th className="text-left py-2 pr-4">Precio</th>
                    <th className="text-left py-2 pr-4">Estado</th>
                    <th className="text-left py-2">Km</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculos.slice(0, 8).map((v: any) => (
                    <tr key={v.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                      <td className="py-3 pr-4 font-medium">{v.marca} {v.modelo} {v.anio}</td>
                      <td className="py-3 pr-4 text-gray-400">{v.placa || '-'}</td>
                      <td className="py-3 pr-4 text-amber-400 font-bold">${v.precio_venta?.toLocaleString('es-CO')}</td>
                      <td className="py-3 pr-4">
                        <span className={'px-2 py-1 rounded-full text-xs font-bold ' + (v.estado === 'disponible' ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-400')}>{v.estado}</span>
                      </td>
                      <td className="py-3 text-gray-400">{v.kilometraje?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-amber-400">Leads Recientes</h2>
            <a href="/admin/leads" className="text-amber-400 text-sm hover:underline">Ver todos</a>
          </div>
          {leads.length === 0 ? (
            <p className="text-gray-500 text-center py-6 text-sm">Los leads de WhatsApp apareceran aqui automaticamente</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-800 text-xs">
                    <th className="text-left py-2 pr-4">Canal</th>
                    <th className="text-left py-2 pr-4">Estado</th>
                    <th className="text-left py-2">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 5).map((l: any) => (
                    <tr key={l.id} className="border-b border-gray-800">
                      <td className="py-3 pr-4 text-gray-300">{l.canal}</td>
                      <td className="py-3 pr-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-950 text-red-300">{l.estado}</span>
                      </td>
                      <td className="py-3 text-gray-400 text-xs">{new Date(l.created_at).toLocaleDateString('es-CO')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
