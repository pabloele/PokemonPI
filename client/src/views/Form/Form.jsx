import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import style from "./Form.module.css";
import { getPokes } from "../../redux/actions";
import { Link } from "react-router-dom";

const Form = () => {
  const ExpRegSoloLetras = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
  const ExpRegUrl = "^https?://[w-]+(.[w-]+)+[/#?]?.*$";
  const { Tipos } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [errores, setErrores] = useState({
    nombre: "",
    imagen: "",
    tipos_str: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
  });

  const [form, setForm] = useState({
    nombre: "",
    imagen: "",
    tipo1: "normal",
    tipo2: "normal",
    vida: 0,
    ataque: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
  });

  const validate = (formAValidar) => {
    const newErrors = {};

    for (const key in formAValidar) {
      //valida campos numéricos
      if (!isNaN(formAValidar[key])) {
        formAValidar[key] >= 0 && formAValidar[key] <= 100
          ? (newErrors[key] = "")
          : (newErrors[key] = `${key} debe ser un valor entre 0 y 100`);
      }

      //valida nombre
      if (key === "nombre") {
        if (
          formAValidar.nombre.match(ExpRegSoloLetras) != null &&
          formAValidar.nombre !== ""
        ) {
          newErrors[key] = "";
        } else {
          newErrors[key] = "nombre no valido (no puede estar vacío)  ";
        }
      }

      if (key === "tipos_str") {
      }

      if (key === "imagen") {
        if (formAValidar[key].match(ExpRegUrl) != null) {
          newErrors[key] = "";
        } else {
          newErrors[key] = "url no válida";
        }
      }
    }

    setErrores({
      ...errores,
      ...newErrors,
    });
  };

  const changeHandler = (event) => {
    let propiedad = event.target.name;
    let valor = event.target.value;

    validate({
      ...form,
      [propiedad]: valor,
    });

    setForm({
      ...form,
      [propiedad]: valor,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formToBeSubmitted = {
      nombre: form.nombre,
      imagen: form.imagen,
      tipos_str: `${form.tipo1},${form.tipo2}`,
      vida: form.vida,
      ataque: form.ataque,
      defensa: form.defensa,
      velocidad: form.velocidad,
      altura: form.altura,
      peso: form.peso,
    };

    let creado;
    if (
      errores.nombre === "" &&
      errores.imagen === "" &&
      errores.vida === "" &&
      errores.ataque === "" &&
      errores.defensa === "" &&
      errores.velocidad === "" &&
      errores.altura === "" &&
      errores.peso === ""
    ) {
      try {
        await axios.post("http://localhost:3001/pokemons/", formToBeSubmitted);
        creado = true;
      } catch (error) {
        alert("El pokemon no ha podido crearse");
      }
    } else {
      alert("Faltan datos o hay errores");
    }
    if (creado) {
      await dispatch(getPokes());
      alert("Pokemon creado exitosamente!");
    }
  };

  const handleTypesSelector = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style.containerPrincipal}>
      <div className={style.left}></div>
      <div className={style.FormContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Nombre: </label>
              {errores.nombre && <span>{errores.nombre}</span>}
              <input
                type="text"
                value={form.nombre}
                onChange={changeHandler}
                name="nombre"
              ></input>
            </div>
            <div>
              <label>Imágen: </label>
              {errores.imagen && <span>{errores.imagen}</span>}
              <input
                type="text"
                value={form.imagen}
                onChange={changeHandler}
                name="imagen"
              ></input>
            </div>

            <div>
              <label>Vida: </label>
              {errores.vida && <span>{errores.vida}</span>}
              <input
                type="number"
                value={form.vida}
                onChange={changeHandler}
                name="vida"
              ></input>
            </div>
            <div>
              <label>Ataque: </label>
              {errores.ataque && <span>{errores.ataque}</span>}
              <input
                type="number"
                value={form.ataque}
                onChange={changeHandler}
                name="ataque"
              ></input>
            </div>
            <div>
              <label>Defensa: </label>
              {errores.defensa && <span>{errores.defensa}</span>}
              <input
                type="number"
                value={form.defensa}
                onChange={changeHandler}
                name="defensa"
              ></input>
            </div>
            <div>
              <label>Velocidad: </label>
              {errores.velocidad && <span>{errores.velocidad}</span>}
              <input
                type="number"
                value={form.velocidad}
                onChange={changeHandler}
                name="velocidad"
              ></input>
            </div>
            <div>
              <label>Altura: </label>
              {errores.altura && <span>{errores.altura}</span>}
              <input
                type="number"
                value={form.altura}
                onChange={changeHandler}
                name="altura"
              ></input>
            </div>
            <div>
              <label>Peso: </label>
              {errores.peso && <span>{errores.peso}</span>}
              <input
                type="number"
                value={form.peso}
                onChange={changeHandler}
                name="peso"
              ></input>
            </div>
            <div className={style.cajaTiposYSubmitBtn}>
              <div className={style.tiposSelectorsContainer}>
                <div>
                  <label>Tipo 1:</label>
                  <select
                    name="tipo1"
                    onChange={handleTypesSelector}
                    value={form.tipo1}
                  >
                    {Tipos &&
                      Tipos.map((e) => <option value={e}>`Tipo {e}`</option>)}
                  </select>
                </div>
                <div>
                  <label>Tipo 2:</label>
                  <select
                    name="tipo2"
                    onChange={handleTypesSelector}
                    value={form.tipo2}
                  >
                    {Tipos &&
                      Tipos.map((e) => <option value={e}>`Tipo {e}`</option>)}
                  </select>
                </div>
              </div>
              <div className={style.cajaBotonSubmit}>
                <Link to="/home" className={style.btnBack}>
                  <button className={style.btnBack}>Volver</button>
                </Link>
                <button className={style.submit} type="submit">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={style.right}></div>
    </div>
  );
};

export default Form;
