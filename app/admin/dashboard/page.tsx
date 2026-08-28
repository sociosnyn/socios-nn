export default async function Dashboard() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const headers = {
    apikey: supabaseKey,
    Authorization: 'Bearer ' + supabaseKey,
  }

  let vehiculos = [], ventas = [], leads = [], reclamaciones = []

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

  const disponibles = vehiculos.filter((v: any) => v.estado === 'disponible').length
  const totalVentas = ventas.reduce((a: number, v: any) => a + (v.precio_venta || 0), 0)
  const utilidadTotal = ventas.reduce((a: number, v: any) => a + (v.utilidad_bruta || 0), 0)
  const reservaEmpresa = ventas.reduce((a: number, v: any) => a + (v.reserva_empresa || 0), 0)
  const thomas = ventas.reduce((a: number, v: any) => a + (v.distribucion_thomas || 0), 0)
  const manuel = ventas.reduce((a: number, v: any) => a + (v.distribucion_manuel || 0), 0)
  const leadsActivos = leads.filter((l: any) => l.estado !== 'cerrado' && l.estado !== 'vendido').length
  const reclamacionesAbiertas = reclamaciones.filter((r: any) => r.estado === 'Abierto').length

  const fmt = (n: number) => '$' + n.toLocaleString('es-CO')

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Socios <span className="text-yellow-400">N&amp;N</span> <span className="text-gray-400 font-normal text-sm ml-2">Panel Admin</span></h1>
        <div className="flex gap-3">
          <a href="/admin/vehiculos/nuevo" className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-yellow-300 transition">+ Vehículo</a>
          <a href="/admin/ventas/nueva" className="bg-green-500 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-green-400 transition">+ Venta</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* KPIs principales */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Vehículos en Lote', value: vehiculos.length, sub: `${disponibles} disponibles`, color: 'border-yellow-400' },
            { label: 'Leads Activos', value: leadsActivos, sub: `${leads.length} total`, color: 'border-blue-400' },
            { label: 'Ventas del Período', value: ventas.length, sub: fmt(totalVentas), color: 'border-green-400' },
            { label: 'Reclamaciones', value: reclamacionesAbiertas, sub: 'abiertas', color: 'border-red-400' },
          ].map((kpi, i) => (
            <div key={i} className={`bg-gray-900 rounded-2xl p-5 border-l-4 ${kpi.color} border border-gray-800`}>
              <p className="text-gray-400 text-sm mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold mb-1">{kpi.value}</p>
              <p className="text-gray-500 text-xs">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Distribución de utilidades */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">💰 Distribución de Utilidades</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs mb-1">Utilidad Bruta Total</p>
              <p className="text-2xl font-bold text-white">{fmt(utilidadTotal)}</p>
            </div>
            <div className="bg-green-900 rounded-xl p-4 text-center border border-green-700">
              <p className="text-green-300 text-xs mb-1">Reserva Empresa (33.4%)</p>
              <p className="text-2xl font-bold text-green-400">{fmt(reservaEmpresa)}</p>
            </div>
            <div className="bg-blue-900 rounded-xl p-4 text-center border border-blue-700">
              <p className="text-blue-300 text-xs mb-1">Thomas Fernández (33.3%)</p>
              <p className="text-2xl font-bold text-blue-400">{fmt(thomas)}</p>
            </div>
            <div className="bg-purple-900 rounded-xl p-4 text-center border border-purple-700">
              <p className="text-purple-300 text-xs mb-1">Manuel Espinal (33.3%)</p>
              <p className="text-2xl font-bold text-purple-400">{fmt(manuel)}</p>
            </div>
          </div>
        </div>

        {/* Menú de secciones */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { href: '/admin/vehiculos', icon: '🚗', label: 'Inventario', desc: `${vehiculos.length} vehículos` },
            { href: '/admin/leads', icon: '👥', label: 'CRM / Leads', desc: `${leadsActivos} activos` },
            { href: '/admin/ventas', icon: '💰', label: 'Ventas', desc: `${ventas.length} registradas` },
            { href: '/admin/finanzas', icon: '📊', label: 'Finanzas', desc: 'P&L en tiempo real' },
            { href: '/admin/reclamaciones', icon: '⚠️', label: 'Reclamaciones', desc: `${reclamacionesAbiertas} abiertas` },
            { href: '/', icon: '🌐', label: 'Ver Página Web', desc: 'Vista pública' },
          ].map((item, i) => (
            <a key={i} href={item.href} className="bg-gray-900 rounded-2xl border border-gray-800 p-5 hover:border-yellow-400 transition flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="font-bold">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Últimos vehículos */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">🚗 Últimos Vehículos</h2>
            <a href="/admin/vehiculos/nuevo" className="text-yellow-400 text-sm hover:underline">+ Agregar</a>
          </div>
          {vehiculos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay vehículos registrados aún</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-800">
                    <th className="text-left py-2 pr-4">Vehículo</th>
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
                      <td className="py-3 pr-4 text-yellow-400 font-bold">${v.precio_venta?.toLocaleString('es-CO')}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${v.estado === 'disponible' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                          {v.estado}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">{v.kilometraje?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Últimos leads */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">👥 Últimos Leads</h2>
            <a href="/admin/leads" className="text-yellow-400 text-sm hover:underline">Ver todos</a>
          </div>
          {leads.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay leads registrados aún</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-800">
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
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-300">{l.estado}</span>
                      </td>
                      <td className="py-3 text-gray-400">{new Date(l.created_at).toLocaleDateString('es-CO')}</td>
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
