import React, { useState } from 'react';
import { usePokemon, type PokemonTarjeta } from '../context/PokemonContext';

export const BuscadorPokemon: React.FC = () => {
  const { entrenadorActivo, guardarPokemonMochila } = usePokemon();
  const [busqueda, setBusqueda] = useState('');
  const [pokemon, setPokemon] = useState<PokemonTarjeta | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [guardado, setGuardado] = useState(false);

  const buscarPokemon = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nombre = busqueda.trim().toLowerCase();

    if (!nombre) return;

    setCargando(true);
    setError('');
    setPokemon(null);
    setGuardado(false);

    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      if (!respuesta.ok) throw new Error('No se encontró el Pokémon.');

      const datos = await respuesta.json();
      setPokemon({
        id: datos.id,
        name: datos.name,
        image: datos.sprites.front_default ?? '',
        type: datos.types[0]?.type.name ?? 'Desconocido',
        baseExperience: String(datos.base_experience ?? 0),
        esFavorito: false,
      });
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : 'No se pudo realizar la búsqueda.');
    } finally {
      setCargando(false);
    }
  };

  const guardarPokemon = () => {
    if (!pokemon || !entrenadorActivo) return;
    guardarPokemonMochila(pokemon);
    setGuardado(true);
  };

  return (
    <div>
      <h2>Buscar Pokémon</h2>
      <form onSubmit={buscarPokemon}>
        <label htmlFor="busqueda">Nombre o número:</label>
        <input id="busqueda" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Ej: pikachu" />
        <button type="submit" disabled={cargando}>{cargando ? 'Buscando...' : 'Buscar'}</button>
      </form>

      {error && <p>{error}</p>}
      {pokemon && (
        <article>
          {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
          <h3>{pokemon.name}</h3>
          <p>Tipo: {pokemon.type}</p>
          <p>Experiencia base: {pokemon.baseExperience}</p>
          <button type="button" onClick={guardarPokemon} disabled={!entrenadorActivo || guardado}>
            {guardado ? 'Guardado' : entrenadorActivo ? 'Guardar en inventario' : 'Registra un entrenador primero'}
          </button>
        </article>
      )}
    </div>
  );
};

