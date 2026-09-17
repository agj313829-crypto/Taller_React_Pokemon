import React from 'react';
import {usePokemon } from '../context/PokemonContext'

export const InventarioPokemon: React.FC = () =>{

    const { entrenadorActivo, eliminarPokemon, actualizarFavorito, mochilaActual } = usePokemon();


        if(!entrenadorActivo){
          return(
            <div>
              <h3> No Hay Entrenador </h3>
              <p>Por favor asigne <strong>entrenador activo</strong> o <strong>registre un entrenador</strong></p>
            </div>
          );}
  


return(
<div className=" banner-seccion"> 
    <header>
      <h2> mochila de {entrenadorActivo.nombreCompleto}</h2>
    </header>
    <div className="grid-mochila">
      {mochilaActual.length >0 ? (
        mochilaActual.map((poke, index) => (
          <div key={poke.id} className={`tarjeta-item ${poke.esFavorito? 'tarjeta-favorita' : ''}`}>
            <span>
              #{index +1} de {mochilaActual.length}
            </span>
            <img src={poke.image}/>
            <h4>{poke.name}</h4>
            <p>{poke.type}</p>
            <div className="panel-botones">
              <button className={`btn-favorito ${poke.esFavorito ? 'fav-activo' : ''}`}
                onClick={() => actualizarFavorito(poke.id)}>
                {poke.esFavorito ? '🌟⭐Favorito' : '🌟Marcar'}
              </button>
              <button type="button" className="btn-eliminar" 
              onClick={() => eliminarPokemon(poke.id)}>
                liberar o soltar
              </button>
            </div>
          </div>
        ))
        ) : (
          <div>
            <p> Tu moochila esta vacia actualmente.</p>
            <p>vaya y capture pokemon , sokunocio</p>
          </div>
        )
      }
    </div>

    
</div>
);
};