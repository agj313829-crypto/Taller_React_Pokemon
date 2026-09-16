import React, { useState } from 'react';
import { usePokemon, type PokemonTarjeta } from '../context/PokemonContext';

export const BuscadorPokemon: React.FC = () => {
  const { entrenadorActivo, guardarPokemonMochila } = usePokemon();

  const [busqueda, setBusqueda] = useState('');
  const [pokemonActual, setPokemonActual] = useState<PokemonTarjeta | null>(null);
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const buscarPokemon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = busqueda.trim().toLowerCase();
    if (!query) return;

    setCargando(true);
    setMensajeError(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (!res.ok) throw new Error('Auxilio, socorro, no hay Pokémon.');

      const datos = await res.json();
      const pokemonEncontrado: PokemonTarjeta = {
        id: datos.id,
        name: datos.name.toUpperCase(),
        image: datos.sprites?.front_default ?? '',
        type: datos.types?.[0]?.type?.name ?? 'Desconocido',
        baseExperience: datos.base_experience,
        esFavorito: false,
      };

      setPokemonActual(pokemonEncontrado);

      if (!entrenadorActivo) {
        setMensajeError('Debes registrar y activar un entrenador antes de guardar un Pokémon.');
        return;
      }

      guardarPokemonMochila(pokemonEncontrado);
      alert(`El Pokémon ${pokemonEncontrado.name} fue agregado a la mochila de ${entrenadorActivo.nombreCompleto}`);
    } catch (error: any) {
      setPokemonActual(null);
      setMensajeError(error.message ?? 'No se pudo buscar el Pokémon.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <div>
        {entrenadorActivo ? (
          <p>
            Mochila Activa de: <strong>{entrenadorActivo.nombreCompleto}</strong>
          </p>
        ) : (
          <p>No hay entrenador activo. Ve al formulario de Registro para activarlo.</p>
        )}
      </div>

      <form onSubmit={buscarPokemon}>
        <div>
          <label htmlFor="pokemon-busqueda">Buscar Pokémon</label>
          <input
            id="pokemon-busqueda"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej: Pikachu, charmander"
          />
        </div>
        <button type="submit" disabled={cargando}>
          {cargando ? 'Escaneando...' : 'Buscar'}
        </button>
      </form>

      {mensajeError && <p role="alert">{mensajeError}</p>}

      {pokemonActual && (
        <div>
          <h3>{pokemonActual.name}</h3>
          {pokemonActual.image && <img src={pokemonActual.image} alt={pokemonActual.name} />}
        </div>
      )}
    </div>
  );
};