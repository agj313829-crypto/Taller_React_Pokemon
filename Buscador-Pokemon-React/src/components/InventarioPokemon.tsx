import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import '../styles/pokerosa.css';

export const InventarioPokemon: React.FC = () => {
  const { entrenadorActivo, eliminarPokemon, actualizarFavorito, mochilaActual } = usePokemon();

  if (!entrenadorActivo) {
    return (
      <div className="notice-box">
        <h3>No hay entrenador</h3>
        <p>
          Por favor asigna un <strong>entrenador activo</strong> o <strong>registra un entrenador</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="page-wrap card-surface">
      <header>
        <h2>Mochila de {entrenadorActivo.nombreCompleto}</h2>
      </header>

      <div className="pokemon-grid">
        {mochilaActual.length > 0 ? (
          mochilaActual.map((poke, index) => (
            <div key={poke.id} className={`pokemon-card ${poke.esFavorito ? 'is-favorite' : ''}`}>
              <span className="card-index">
                #{index + 1} de {mochilaActual.length}
              </span>
              <img className="pokemon-sprite" src={poke.image} alt={poke.name} />
              <div className="pokemon-name">{poke.name}</div>
              <div className="pokemon-types">
                <span className={`type-chip type-${poke.type}`}>{poke.type}</span>
              </div>
              <div className="panel-botones">
                <button
                  type="button"
                  className={`btn btn-sm ${poke.esFavorito ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => actualizarFavorito(poke.id)}
                >
                  {poke.esFavorito ? '⭐ Favorito' : '☆ Marcar'}
                </button>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => eliminarPokemon(poke.id)}>
                  Liberar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Tu mochila está vacía por ahora.</p>
            <p>Ve a "Buscar Pokémon" y captura alguno.</p>
          </div>
        )}
      </div>
    </div>
  );
};
