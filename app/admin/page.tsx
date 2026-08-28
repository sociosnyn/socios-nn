export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          Socios <span className="text-yellow-400">N&amp;N</span>
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Panel Administrativo</p>

        <form action="/api/login" method="POST" className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              placeholder="tucorreo@gmail.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl mt-2 hover:bg-yellow-300 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
