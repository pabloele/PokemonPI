import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import style from "./Form.module.css";
import { getPokes } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/authContext";
import { saveAs } from "file-saver";

const Form = () => {
  const { user } = useUserAuth();
  const { uploadFile } = useUserAuth();
  const [iaPrompt, setIaPrompt] = useState();
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
    tipo2: "fighting",
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
        if (
          formAValidar[key].match(ExpRegUrl) != null ||
          form.imagen.indexOf(
            "https://firebasestorage.googleapis.com/v0/b/pokemon-app-fcd34.appspot.com"
          ) !== -1
        ) {
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
    let result;

    const formToBeSubmitted = {
      nombre: form.nombre,
      imagen: result ? result : form.imagen,
      tipos_str: `${form.tipo1},${form.tipo2}`,
      vida: form.vida,
      ataque: form.ataque,
      defensa: form.defensa,
      velocidad: form.velocidad,
      altura: form.altura,
      peso: form.peso,
      UserUid: user.uid,
      //String(user.uid),
    };
    console.log("//////////////////", formToBeSubmitted);
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
      // await dispatch(getPokes());
      alert("Pokemon creado exitosamente!");
    }
  };

  const handleTypesSelector = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // const handleIaCreator = async (e) => {
  //   try {
  //     const IaImage = await axios.post(
  //       `http://localhost:3001/openai?description=${iaPrompt}`
  //     );
  //     console.log("IA AAAAAAA:", IaImage.data.data);
  //     setForm({
  //       ...form,
  //       image: IaImage.data.data,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const handleIaCreator = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3001/openai?description=${iaPrompt}`
  //     );
  //     console.log("IA AAAAAAA:", response.data.data);

  //     const downloadImage = await saveAs(response.data.data, "image.jpg");

  //     console.log("BLOB:            ", downloadImage);
  //     const e = {
  //       target: {
  //         files: response,
  //       },
  //     };
  //     await handleUpload(e);
  //   } catch (error) {
  //     console.error(error);
  //     await handleIaCreator();
  //   }
  // };
  const handleIaCreator = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/openai?description=${iaPrompt}`
      );

      // Crear un objeto Blob a partir de la respuesta
      const blob = new Blob([response.data], { type: "image/png" });

      // Guardar el archivo con file-saver
      saveAs(blob, "image.png");

      // Enviar la imagen a Firebase con handleUpload
      const e = {
        target: {
          files: blob,
        },
      };
      await handleUpload(e);
    } catch (error) {
      console.error(error);
      // await handleIaCreator();
    }
  };
  const handleUpload = async (e) => {
    // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee", e);
    try {
      const result = await uploadFile(e.target.files[0]);
      console.log("URL:", result);

      setForm({
        ...form,
        imagen: result,
      });
      setErrores({
        ...errores,
        imagen: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  let imagenSubida;
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
                name="nombre"></input>
            </div>

            <div>
              <label>Vida: </label>
              {errores.vida && <span>{errores.vida}</span>}
              <input
                type="number"
                value={form.vida}
                onChange={changeHandler}
                name="vida"></input>
            </div>
            <div>
              <label>Ataque: </label>
              {errores.ataque && <span>{errores.ataque}</span>}
              <input
                type="number"
                value={form.ataque}
                onChange={changeHandler}
                name="ataque"></input>
            </div>
            <div>
              <label>Defensa: </label>
              {errores.defensa && <span>{errores.defensa}</span>}
              <input
                type="number"
                value={form.defensa}
                onChange={changeHandler}
                name="defensa"></input>
            </div>
            <div>
              <label>Velocidad: </label>
              {errores.velocidad && <span>{errores.velocidad}</span>}
              <input
                type="number"
                value={form.velocidad}
                onChange={changeHandler}
                name="velocidad"></input>
            </div>
            <div>
              <label>Altura: </label>
              {errores.altura && <span>{errores.altura}</span>}
              <input
                type="number"
                value={form.altura}
                onChange={changeHandler}
                name="altura"></input>
            </div>
            <div>
              <label>Peso: </label>
              {errores.peso && <span>{errores.peso}</span>}
              <input
                type="number"
                value={form.peso}
                onChange={changeHandler}
                name="peso"></input>
            </div>
            <div className={style.tiposSelectorsContainer}>
              <div>
                <label>Tipo 1:</label>
                <select
                  name="tipo1"
                  onChange={handleTypesSelector}
                  value={form.tipo1}>
                  {Tipos &&
                    Tipos.map((e) => <option value={e}>`Tipo {e}`</option>)}
                </select>
              </div>
              <div>
                <label>Tipo 2:</label>
                <select
                  name="tipo2"
                  onChange={handleTypesSelector}
                  value={form.tipo2}>
                  {Tipos &&
                    Tipos.map((e) =>
                      e !== form.tipo1 ? (
                        <option value={e}>`Tipo {e}`</option>
                      ) : null
                    )}
                </select>
              </div>
            </div>
            <div>
              <label>Imágen: </label>
              {
                (imagenSubida =
                  form.imagen.indexOf(
                    "https://firebasestorage.googleapis.com/v0/b/pokemon-app-fcd34.appspot.com"
                  ) !== -1)
              }
              {errores.imagen && !imagenSubida && <span>{errores.imagen}</span>}
              <div
                style={{
                  display: imagenSubida ? "none" : "block",
                }}>
                <input
                  type="text"
                  value={form.imagen}
                  onChange={changeHandler}
                  name="imagen"
                  placeholder="url"
                  // disabled={imagenSubida}
                />
              </div>

              <div className={style.imgItemsContainer}>
                <div className={style.imgPreviewContainer}>
                  {imagenSubida && <img src={form.imagen} alt="" />}
                </div>

                <div className={style.imgBtnContainer}>
                  <div>
                    <input
                      type="file"
                      name="archivo"
                      id=""
                      onChange={handleUpload}
                    />
                  </div>
                  <input
                    type="text"
                    value={iaPrompt}
                    name="iaInput"
                    onChange={(e) => setIaPrompt(e.target.value)}
                  />
                  <div className={style.iaBtn} onClick={handleIaCreator}>
                    Generate with IA!!
                  </div>
                </div>

                <div className={style.cajaBotonSubmit}>
                  <div>
                    <Link to="/home" className={style.link}>
                      <button className={style.btnBack}>Volver</button>
                    </Link>
                  </div>
                  <div>
                    <button className={style.submit} onClick={handleSubmit}>
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* </div> */}

        <div className={style.right}> </div>
      </div>
    </div>
  );
};

export default Form;
