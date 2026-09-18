import {BrowserRouter, Routes, Route, NavLink, Navigate} from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import {RegistroUsuario} from './components/RegistroUsuario';
import {BuscadorPokemon} from './components/BuscadorPokemon';
import {InventarioPokemon} from './components/InventarioPokemon';

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <header className="topbar">
          <h1>Registro de entrenadores y pokemon en React</h1>
        </header>
        <nav className="tabs">
          <NavLink to="/registro" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
            Registro
          </NavLink>
          <NavLink to="/buscador" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
            Buscador
          </NavLink>
          <NavLink to="/inventario" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
            Inventario
          </NavLink>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/registro" replace />} />
            <Route path="/registro" element={<RegistroUsuario />} />
            <Route path="/buscador" element={<BuscadorPokemon />} />
            <Route path="/inventario" element={<InventarioPokemon />} />
          </Routes>
        </main>


      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
