import {BrowserRouter, Routes, Route, NavLink, Navigate} from 'react-router-dom';
import {pokemonProvider} from './context/PokemonContext';
import {RegistroUsuario} from './components/RegistroUsuario';
import {BuscadorPokemon} from './components/BuscadorPokemon';
import {InventarioPokemon} from './components/InventarioPokemon';

function App() {
  return (
    <pokemonProvider>
      <BrowserRouter>
      <header>
        <h1> Registro de entrenadores y pokemon en React</h1>
      </header>
        <nav 
        <NavLink to="/Registro" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Registro
          <NavLink to="/Buscador" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Buscador
          <NavLink to="/Inventario" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Inventario
        </nav>
        </header>
        <main>
          <Routes>
            Route path="/elemento={<Navigate to="/registro">replace />} />
            <Route path="/registro" element={<RegistroUsuario />} />
            <Route path="/buscador" element={<BuscadorPokemon />} />
            <Route path="/inventario" element={<InventarioPokemon />} />
          </Routes>
        </main>


      </BrowserRouter>
      </pokemonProvider>
  );
