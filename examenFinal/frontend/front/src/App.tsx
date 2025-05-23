
import React, { useEffect, useState } from "react";


interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

const API_URL = "http://localhost:8000/api/tareas/";

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nuevoTituloEdit, setNuevoTituloEdit] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setTareas)
      .catch(console.error);
  }, []);

  const toggleCompletada = async (tarea: Tarea) => {
    try {
      const res = await fetch(`${API_URL}${tarea.id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completada: !tarea.completada }),
      });
      if (res.ok) {
        setTareas((prev) =>
          prev.map((t) =>
            t.id === tarea.id ? { ...t, completada: !t.completada } : t
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const agregarTarea = async () => {
    if (!nuevoTitulo.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: nuevoTitulo, completada: false }),
      });
      if (res.ok) {
        const nueva = await res.json();
        setTareas((prev) => [...prev, nueva]);
        setNuevoTitulo("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarTarea = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTareas((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editarTarea = async (id: number) => {
    if (!nuevoTituloEdit.trim()) return;
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: nuevoTituloEdit }),
      });
      if (res.ok) {
        const tareaActualizada = await res.json();
        setTareas((prev) =>
          prev.map((t) => (t.id === id ? tareaActualizada : t))
        );
        setEditandoId(null);
        setNuevoTituloEdit("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const manejarEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") agregarTarea();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            🗂️ Mi Tablero de Tareas
          </h1>
          
          <div className="flex gap-3 mb-8">
            <input
              type="text"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
              onKeyDown={manejarEnter}
              placeholder="Escribe una nueva tarea..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <button 
              onClick={agregarTarea} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Agregar
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Lista de Pendientes */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                📋 Pendientes
              </h2>
              <div className="space-y-3">
                {tareas.filter(t => !t.completada).map(t => (
                  <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                    {editandoId === t.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={nuevoTituloEdit}
                          onChange={(e) => setNuevoTituloEdit(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") editarTarea(t.id);
                            if (e.key === "Escape") setEditandoId(null);
                          }}
                          autoFocus
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <button 
                          onClick={() => editarTarea(t.id)}
                          className="text-lg hover:bg-gray-100 p-2 rounded-md transition-colors"
                        >
                          💾
                        </button>
                        <button 
                          onClick={() => setEditandoId(null)}
                          className="text-lg hover:bg-gray-100 p-2 rounded-md transition-colors"
                        >
                          ❌
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span 
                          onDoubleClick={() => {
                            setEditandoId(t.id);
                            setNuevoTituloEdit(t.titulo);
                          }}
                          className="flex-1 cursor-pointer text-gray-700 hover:text-gray-900"
                        >
                          {t.titulo}
                        </span>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => toggleCompletada(t)}
                            className="text-lg hover:bg-green-100 p-2 rounded-md transition-colors"
                            title="Marcar como completada"
                          >
                            ✅
                          </button>
                          <button 
                            onClick={() => eliminarTarea(t.id)}
                            className="text-lg hover:bg-red-100 p-2 rounded-md transition-colors"
                            title="Eliminar tarea"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {tareas.filter(t => !t.completada).length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No hay tareas pendientes 🎉
                  </div>
                )}
              </div>
            </div>

            {/* Lista de Completadas */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                ✅ Completadas
              </h2>
              <div className="space-y-3">
                {tareas.filter(t => t.completada).map(t => (
                  <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow opacity-75">
                    {editandoId === t.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={nuevoTituloEdit}
                          onChange={(e) => setNuevoTituloEdit(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") editarTarea(t.id);
                            if (e.key === "Escape") setEditandoId(null);
                          }}
                          autoFocus
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
                        />
                        <button 
                          onClick={() => editarTarea(t.id)}
                          className="text-lg hover:bg-gray-100 p-2 rounded-md transition-colors"
                        >
                          💾
                        </button>
                        <button 
                          onClick={() => setEditandoId(null)}
                          className="text-lg hover:bg-gray-100 p-2 rounded-md transition-colors"
                        >
                          ❌
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span
                          className="flex-1 cursor-pointer line-through text-gray-600 hover:text-gray-800"
                          onDoubleClick={() => {
                            setEditandoId(t.id);
                            setNuevoTituloEdit(t.titulo);
                          }}
                        >
                          {t.titulo}
                        </span>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => toggleCompletada(t)}
                            className="text-lg hover:bg-blue-100 p-2 rounded-md transition-colors"
                            title="Marcar como pendiente"
                          >
                            ↩️
                          </button>
                          <button 
                            onClick={() => eliminarTarea(t.id)}
                            className="text-lg hover:bg-red-100 p-2 rounded-md transition-colors"
                            title="Eliminar tarea"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {tareas.filter(t => t.completada).length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No hay tareas completadas
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;