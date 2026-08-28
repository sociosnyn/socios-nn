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
      <div className="bg-gray-900 border-b border-red-900 px-4 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-bold">
            Socios <span className="text-red-500">N</span><span className="text-amber-400">&amp;</span><span className="text-red-500">N</span>
          </h1>
          <p className="text-gray-500 text-xs">Panel Administrativo</p>
        </div>
        <div className="flex gap-2">
          <a href="/admin/vehiculos/nuevo" className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-2 rounded-xl text-sm transition">+ Vehículo</a>
          <a href="/admin/ventas/nueva" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-3 py-2 rounded-xl text-sm transition">+ Venta</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'En Lote', value: vehiculos.length, sub: `${disponibles} disponibles`, border: 'border-red-600' },
            { label: 'Leads Activos', value: leadsActivos, sub: `${leads.length} total`, border: 'border-amber-500' },
            { label: 'Ventas', value: ventas.length, sub: fmt(totalVentas), border: 'border-green-500' },
            { label: 'Reclamaciones', value: reclamacionesAbiertas, sub: 'abiertas', border: 'border-orange-500' },
          ].map((kpi, i) => (
            <div key={i} className={`bg-gray-900 rounded-2xl p-4 border-l-4 ${kpi.border} border border-gray-800`}>
              <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold">{kpi.value}</p>
              <p className="text-gray-500 text-xs mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Distribución utilidades */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 mb-6">
          <h2 className="text-base font-bold mb-4 text-amber-400">💰 Distribución de Utilidades</h2>
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

        {/* Menú secciones */}
