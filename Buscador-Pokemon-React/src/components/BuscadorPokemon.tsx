import React, { useState } from 'react';
import { usePokemon, type PokemonTarjeta } from '../context/PokemonContext';
import '../styles/pokerosa.css';

export const BuscadorPokemon: React.FC = () => {
  const { entrenadorActivo, guardarPokemonMochila } = usePokemon();

  const [busqueda, setBusqueda] = useState('');
  const [pokemonActual, setPokemonActual] = useState<PokemonTarjeta | null>(null);
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const buscarPokemon = async (e: React.FormEvent) => {
    e.preventDefault();

    const query = busqueda.trim().toLowerCase();

    if (!query) return;

    setCargando(true);
    setMensajeError(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (!res.ok) throw new Error('Auxilio, Socorro, no hay Pokemon');

      const datos = await res.json();
      setPokemonActual({
        id: datos.id,
        name: datos.name.toUpperCase(),
        image: datos.sprites.front_default,
        type: datos.types[0].type.name,
        baseExperience: datos.base_experience,
        esFavorito: false,
      });
    } catch (error: any) {
      setPokemonActual(null);
      setMensajeError(error.message);
    } finally {
      setCargando(false);
    }
  };

  const clickGuardar = () => {
    if (!entrenadorActivo) {
      alert('Debes seleccionar o registrar un entrenador');
      return;
    }

    if (pokemonActual) {
      guardarPokemonMochila(pokemonActual);
      alert(`El Pokemon ${pokemonActual.name} es guardado en la mochila de ${entrenadorActivo.nombreCompleto}`);
    }
  };

  return (
    <div className="page-wrap card-surface">
      {entrenadorActivo ? (
        <p className="search-status">
          Mochila activa de: <strong>{entrenadorActivo.nombreCompleto}</strong>
        </p>
      ) : (
        <p className="search-status">
          No hay entrenador activo. Ve al formulario de registro para activarlo, socio.
        </p>
      )}

      <form onSubmit={buscarPokemon} className="field">
        <label htmlFor="busqueda">Buscar Pokémon</label>
        <input
          id="busqueda"
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej: pikachu"
        />
        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-block" disabled={cargando}>
            {cargando ? 'Escaneando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {mensajeError && <div className="alert alert-error">{mensajeError}</div>}

      {pokemonActual && (
        <div className="search-result">
          <div className="pokemon-card">
            <img className="pokemon-sprite" src={pokemonActual.image} alt={pokemonActual.name} />
            <div className="pokemon-name">{pokemonActual.name}</div>
            <div className="pokemon-types">
              <span className={`type-chip type-${pokemonActual.type}`}>
                {pokemonActual.type.toLocaleUpperCase()}
              </span>
            </div>
            <p className="card-index">
              Experiencia base: <strong>{pokemonActual.baseExperience}</strong>
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              onClick={clickGuardar}
              disabled={!entrenadorActivo}
            >
              Guardar en la mochila
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
