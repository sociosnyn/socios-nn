export default function NuevoVehiculo() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 border-b border-red-900 px-4 py-4 flex items-center gap-3">
        <a href="/admin/dashboard" className="text-gray-400 hover:text-white text-sm">← Dashboard</a>
        <h1 className="text-lg font-bold">Nuevo <span className="text-red-500">Vehiculo</span></h1>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <form action="/api/vehiculos" method="POST" className="flex flex-col gap-6">

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <h2 className="text-amber-400 font-bold mb-4">Identificacion</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs text-gray-400 mb-1 block">Marca</label><input name="marca" required className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Modelo</label><input name="modelo" required className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Version / Trim</label><input name="version" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Año</label><input name="anio" type="number" min="1990" max="2026" required className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Placa</label><input name="placa" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Color</label><input name="color" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Kilometraje</label><input name="kilometraje" type="number" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Tipo</label>
                <select name="tipo" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500">
                  <option value="">Seleccionar</option>
                  <option>Sedan</option><option>SUV</option><option>Camioneta</option>
                  <option>Deportivo</option><option>Van</option><option>Pickup</option>
                  <option>Hatchback</option><option>Campero</option>
                </select>
              </div>
              <div><label className="text-xs text-gray-400 mb-1 block">Combustible</label>
                <select name="combustible" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500">
                  <option>Gasolina</option><option>Diesel</option><option>Hibrido</option><option>Electrico</option>
                </select>
              </div>
              <div><label className="text-xs text-gray-400 mb-1 block">Transmision</label>
                <select name="transmision" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500">
                  <option>Manual</option><option>Automatica</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <h2 className="text-amber-400 font-bold mb-4">Estado Legal</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs text-gray-400 mb-1 block">Unico dueno</label>
                <select name="unico_dueno" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500">
                  <option value="true">Si</option><option value="false">No</option>
                </select>
              </div>
              <div><label className="text-xs text-gray-400 mb-1 block">N° de duenos anteriores</label><input name="num_duenos" type="number" min="1" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">SOAT vigente hasta</label><input name="soat_vigente" type="date" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Tecno vigente hasta</label><input name="tecno_vigente" type="date" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Tiene prenda</label>
                <select name="tiene_prenda" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500">
                  <option value="false">No</option><option value="true">Si</option>
                </select>
              </div>
              <div><label className="text-xs text-gray-400 mb-1 block">Banco / Entidad prenda</label><input name="banco_prenda" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Tiene multas</label>
                <select name="tiene_multas" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500">
                  <option value="false">No</option><option value="true">Si</option>
                </select>
              </div>
              <div><label className="text-xs text-gray-400 mb-1 block">Valor multas</label><input name="valor_multas" type="number" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <h2 className="text-amber-400 font-bold mb-4">Precios y Costos</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs text-gray-400 mb-1 block">Precio de compra / Costo</label><input name="precio_costo" type="number" required className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Precio de publicacion</label><input name="precio_venta" type="number" required className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Precio minimo de venta</label><input name="precio_minimo" type="number" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Costo reparaciones</label><input name="costo_reparaciones" type="number" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <h2 className="text-amber-400 font-bold mb-4">Propietario (Vendedor)</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs text-gray-400 mb-1 block">Nombre completo</label><input name="nombre_propietario" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Cedula / NIT</label><input name="cedula_propietario" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Telefono / WhatsApp</label><input name="telefono_propietario" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Ciudad</label><input name="ciudad_propietario" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <h2 className="text-amber-400 font-bold mb-4">Fotos y Observaciones</h2>
            <div className="flex flex-col gap-4">
              <div><label className="text-xs text-gray-400 mb-1 block">Link de fotos (Google Drive o album)</label><input name="links_fotos" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" /></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Observaciones generales</label><textarea name="notas_internas" rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500 resize-none"></textarea></div>
              <div><label className="text-xs text-gray-400 mb-1 block">Asesor responsable</label>
                <select name="asesor" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500">
                  <option>Thomas Fernandez</option><option>Manuel Espinal</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl text-lg transition">
            Guardar Vehiculo
          </button>
        </form>
      </div>
    </main>
  )
}
