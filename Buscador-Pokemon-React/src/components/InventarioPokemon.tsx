import React from 'react';
import { usePokemon } from '../context/PokemonContext';

export const InventarioPokemon: React.FC = () => {
  const { entrenadorActivo, mochilaActual, actualizarFavorito, eliminarPokemon } = usePokemon();

  return (
    <div>
      <h2>Inventario Pokémon</h2>

      {!entrenadorActivo ? (
        <p>Registra un entrenador para ver su inventario.</p>
      ) : mochilaActual.length === 0 ? (
        <p>Tu inventario está vacío. Busca un Pokémon para guardarlo.</p>
      ) : (
        <div>
          {mochilaActual.map((pokemon) => (
            <article key={pokemon.id}>
              {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
              <h3>{pokemon.name}</h3>
              <p>Tipo: {pokemon.type}</p>
              <p>Experiencia base: {pokemon.baseExperience}</p>
              <button type="button" onClick={() => actualizarFavorito(pokemon.id)}>
                {pokemon.esFavorito ? 'Quitar favorito' : 'Marcar favorito'}
              </button>
              <button type="button" onClick={() => eliminarPokemon(pokemon.id)}>
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

