export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const res = await fetch(
    supabaseUrl + '/rest/v1/vehiculos?estado=eq.disponible&order=destacado.desc,created_at.desc&limit=6',
    {
      headers: {
        apikey: supabaseKey,
        Authorization: 'Bearer ' + supabaseKey,
      },
      cache: 'no-store',
    }
  )

  const vehiculos = await res.json()

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="bg-gray-900 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Socios <span className="text-yellow-400">N&amp;N</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8">
          Los mejores vehiculos usados de Medellin
        </p>
        
          href="https://wa.me/573207519504?text=Hola%20quiero%20informacion"
          target="_blank"
          className="inline-block bg-green-500 text-white font-bold px-8 py-4 rounded-full text-lg">
          Hablar con un asesor
        </a>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Vehiculos disponibles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehiculos.map((v: any) => (
            <div key={v.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
              <div className="h-52 bg-gray-800 flex items-center justify-center">
                {v.foto_principal
                  ? <img src={v.foto_principal} alt={v.marca} className="w-full h-full object-cover" />
                  : <span className="text-gray-600 text-sm">Sin foto</span>
                }
              </div>
              <div className="p-4">
                {v.destacado && (
                  <span className="text-xs bg-yellow-400 text-black font-bold px-2 py-1 rounded-full mb-2 inline-block">
                    Destacado
                  </span>
                )}
                <h3 className="text-lg font-bold">{v.marca} {v.modelo} {v.anio}</h3>
                <p className="text-gray-400 text-sm mb-3">{v.kilometraje?.toLocaleString()} km · {v.transmision}</p>
                <p className="text-yellow-400 text-xl font-bold mb-4">
                  ${v.precio_venta?.toLocaleString('es-CO')}
                </p>
                
                  href={'https://wa.me/573207519504?text=Me%20interesa%20el%20' + v.marca + '%20' + v.modelo}
                  target="_blank"
                  className="block text-center bg-green-500 text-white font-bold py-2 rounded-xl"
                >
                  Me interesa
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-600 py-8 text-sm">
        2025 Socios N&amp;N - Medellin, Colombia
      </footer>

      
        href="https://wa.me/573207519504?text=Hola%20quiero%20informacion"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.993l6.306-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.366l-.359-.214-3.724.976.999-3.648-.234-.374A9.818 9.818 0 1112 21.818z"/>
        </svg>
      </a>
    </main>
  )
}
