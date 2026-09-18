import React, { useState } from 'react';
import { usePokemon, type Usuario } from '../context/PokemonContext';
import '../styles/pokerosa.css';

export const RegistroUsuario: React.FC = () => {
  const { entrenadores, entrenadorActivo, seleccionarEntrenador, resgistrarEntrenador } = usePokemon();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    tipoDoc: '',
    dni: '',
    fechaNacimiento: '',
    correo: '',
    pais: '',
    ciudad: '',
    aceptaPolitica: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.aceptaPolitica) {
      alert('Debes aceptar la política de tratamiento de datos.');
      return;
    }

    const nuevoUsuario: Usuario = {
      id: Date.now(),
      nombreCompleto: `${formData.nombre} ${formData.apellido}`.trim(),
      documento: {
        tipo: formData.tipoDoc,
        numero: formData.dni,
      },
      fechaNacimiento: formData.fechaNacimiento,
      correo: formData.correo,
      datosPersonales: formData.aceptaPolitica,
      fechaRegistro: new Date().toLocaleDateString(),
    };

    resgistrarEntrenador(nuevoUsuario);
    alert('Entrenador registrado correctamente.');
    setFormData({
      nombre: '',
      apellido: '',
      tipoDoc: '',
      dni: '',
      fechaNacimiento: '',
      correo: '',
      pais: '',
      ciudad: '',
      aceptaPolitica: false,
    });
  };

  return (
    <div className="page-wrap card-surface">
      <header>
        <h2>Registro de entrenadores</h2>
      </header>

      <div className="register-layout">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Joseph"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="apellido">Apellido</label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ej: Martinez"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="tipoDoc">Tipo de identificación</label>
            <select id="tipoDoc" name="tipoDoc" value={formData.tipoDoc} onChange={handleChange} required>
              <option value="">Seleccione una opción</option>
              <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
              <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
              <option value="Registro Civil">Registro Civil</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="dni">Número de identificación</label>
            <input
              id="dni"
              name="dni"
              type="text"
              value={formData.dni}
              onChange={handleChange}
              placeholder="Ej: 1020304050"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              id="fechaNacimiento"
              name="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pais">País</label>
            <select id="pais" name="pais" value={formData.pais} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="Colombia">Colombia</option>
              <option value="Chile">Chile</option>
              <option value="Argentina">Argentina</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="ciudad">Ciudad</label>
            <select id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required>
              <option value="">Seleccione una opción</option>
              <option value="Bogotá">Bogotá</option>
              <option value="Medellín">Medellín</option>
              <option value="Cali">Cali</option>
              <option value="Santiago">Santiago</option>
              <option value="Buenos Aires">Buenos Aires</option>
            </select>
          </div>

          <label className="checkbox-field">
            <input
              type="checkbox"
              name="aceptaPolitica"
              checked={formData.aceptaPolitica}
              onChange={handleChange}
              required
            />
            Acepto la política de tratamiento de datos.
          </label>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-block">
              Enviar
            </button>
          </div>
        </form>

        {entrenadores.length > 0 && (
          <aside className="card-surface">
            <h3>Cambiar entrenador</h3>
            <div className="trainer-switch">
              {entrenadores.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => seleccionarEntrenador(user)}
                  className={`btn btn-sm ${entrenadorActivo?.id === user.id ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {user.nombreCompleto}
                </button>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
