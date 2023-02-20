import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getQuery, saveFilters } from "../../redux/actions";

const CardsContainer = () => {
  //DESTRUCTURING DE DE LOS ESTADOS GLOBALES DE REDUX
  const {
    Pokemones: Pokemons,
    FiltrosYOrden,
    Tipos: Types,
    Query,
  } = useSelector((state) => state);

  //MANEJADOR DE CAMBIOS DE ESTADO
  const handleChange = (e) => {
    let filtrosActualizados = {
      ...FiltrosYOrden,
      [e.target.name]: e.target.value,
    };

    if (e.target.name !== "currentPage") {
      filtrosActualizados = {
        ...filtrosActualizados,
        currentPage: 1,
      };
    }

    dispatch(
      saveFilters(
        filtrosActualizados.currentPage,
        filtrosActualizados.sortDirection,
        filtrosActualizados.selectedType,
        filtrosActualizados.orderBy,
        filtrosActualizados.source
      )
    );
  };
  //MANEJADOR DE CAMBIO DE ESTADO DEL QUERY BY NOMBRE
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // DEFINO ESTADOS PARA SEARCHBAR Y SU BOTON
  const [searchQuery, setSearchQuery] = useState();
  const [searchButton, setSearchButton] = useState();

  // DEFINO CONSTANTES PARA EL PAGINADO
  const pokesPorPagina = 12;
  const indexUltimoPoke = FiltrosYOrden.currentPage * pokesPorPagina;
  const indexPrimerPoke = indexUltimoPoke - pokesPorPagina;
  // DEFINO DISPATCH
  const dispatch = useDispatch();

  //CICLO DE VIDA DEL COMPONENTE
  useEffect(() => {}, [
    FiltrosYOrden.currentPage,
    FiltrosYOrden.sortDirection,
    FiltrosYOrden.selectedType,
    FiltrosYOrden.orderBy,
    FiltrosYOrden.dispatch,
  ]);
  //

  //ORDENA LOS POKEMONES > sortedPokemons
  //

  const ordenar = (entrada) => {
    let salida;
    if (FiltrosYOrden.orderBy === "name") {
      // ordena por nombre dependiendo de sortDirection
      salida = entrada.sort((a, b) => {
        //por nombre
        if (FiltrosYOrden.sortDirection === "asc") {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return b.nombre.localeCompare(a.nombre);
        }
      });
    } else {
      salida = entrada.sort((a, b) => {
        //por ataque
        if (FiltrosYOrden.sortDirection === "asc") {
          return a.ataque - b.ataque;
        } else {
          return b.ataque - a.ataque;
        }
      });
    }
    return salida;
  };

  let sortedPokemons = ordenar(Pokemons);

  //FILTRA LOS POKEMONES ORDENADOS > filteredPokemons
  let filteredPokemons = [...sortedPokemons];

  //DEFINO FUNCIÓN QUE FILTRA POR TIPO
  const filtrarPorTipo = (entrada) => {
    let salida = [...entrada];

    if (FiltrosYOrden.selectedType) {
      salida = entrada.filter((p) =>
        p.tipo.includes(FiltrosYOrden.selectedType)
      );
    }

    return salida;
  };
  //DEFINO FUNCIÓN QUE FILTRA POR CREADO-EXISTENTE
  const filtrarPorSource = (entrada) => {
    return FiltrosYOrden.source === "creado"
      ? entrada.filter((item) => isNaN(item.id))
      : FiltrosYOrden.source === "existente"
      ? entrada.filter((item) => !isNaN(item.id))
      : entrada;
  };
  //APLICO TODOS LOS FILTROS

  filteredPokemons = filtrarPorSource(filtrarPorTipo(filteredPokemons));

  console.log("pokesfiltrados", filteredPokemons);
  //PAGINA LOS POKEMONS FILTRADOS > currentPokemons
  let currentPokemons = filteredPokemons.slice(
    indexPrimerPoke,
    indexUltimoPoke
  );

  //EN CASO DE QUE HAYA UNA BÚSQUEDA POR NOMBRE SE PISA EL RESULTADO Y SE MUESTRA UNICAMENTE ESE RESULTADO
  const pisarSiHayQuery = async () => {
    if (searchButton === "Buscando...") {
      let current = [Query];
      currentPokemons = current;
      console.log("hola", [Query]);
    }
  };

  pisarSiHayQuery();

  //INICIALIZA EN CASO DE SER NECESARIO EL ESTADO Y HACE EL DISPATCH DE LA QUERY SI EL BOTON ESTÁ EN EL ESTADO "Buscando..."
  if (!searchButton) setSearchButton("Buscar");
  else if (searchButton === "Buscando...") dispatch(getQuery(searchQuery));

  // RENDER
  return (
    <div className={style.mainContainer}>
      {/* FILTERS */}
      <div className={style.filterContainer}>
        {/* //SELECT DE TIPOS */}
        <div className={style.cajaFiltros}>
          {/* <button
            onClick={() => {
              dispatch(getPokes());
            }}
          >
            TRAER TODOS LOS POKEMONES
          </button> */}
          <select
            name="selectedType"
            onChange={(e) => handleChange(e)}
            className={style.selector}
          >
            <option value="">Todos los tipos</option>
            {Types && Types.map((e) => <option value={e}>`Tipo {e}`</option>)}
          </select>
          {/* SORT DIRECTION */}
          <button
            className={style.buttonFilters}
            name="sortDirection"
            onClick={(e) => {
              let dato = { target: { name: "sortDirection", value: "" } };
              FiltrosYOrden.sortDirection === "asc"
                ? (dato.target.value = "desc")
                : (dato.target.value = "asc");
              handleChange(dato);
            }}
          >
            Orden:{" "}
            {FiltrosYOrden.sortDirection === "desc"
              ? "descendente"
              : "ascendente"}
          </button>
          {/* SOURCE */}
          <select
            name="source"
            value={FiltrosYOrden.source}
            onChange={handleChange}
          >
            <option value="todos">Todos</option>
            <option value="creado">Creado</option>
            <option value="existente">Existente</option>
          </select>
          {/* SELECTOR ORDERBY */}
          <select name="orderBy" onChange={(e) => handleChange(e)}>
            <option value="name">Ordenado por Nombre</option>
            <option value="ataque">Ordenado por Ataque</option>
          </select>
        </div>
        {/* QUERY */}
        <div className={style.searchBar}>
          {/* INPUT DEL QUERY */}
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Ingrese el nombre del Pokemon a buscar..."
            value={searchQuery}
            className={style.input}
            disabled={searchButton === "Buscando..." ? true : false}
          />
          {/* BOTON PARA EL QUERY */}
          <button
            name="searchBtn"
            onClick={() => {
              searchButton === "Buscar"
                ? setSearchButton("Buscando...")
                : setSearchButton("Buscar");
            }}
            className={style.buttonSearch}
          >
            {searchButton}
          </button>
        </div>
      </div>

      {/* PAGINATION */}
      <div className={style.pagination}>
        <button
          onClick={() => {
            let dato = { target: { value: "", name: "" } };
            dato.target.value = FiltrosYOrden.currentPage - 1;
            dato.target.name = "currentPage";
            handleChange(dato);
          }}
          disabled={FiltrosYOrden.currentPage === 1}
        >
          Anterior
        </button>

        <span>Página {FiltrosYOrden.currentPage}</span>

        <button
          onClick={() => {
            let dato = { target: { value: "", name: "" } };

            dato.target.value = FiltrosYOrden.currentPage + 1;

            dato.target.name = "currentPage";

            handleChange(dato);
          }}
          disabled={
            FiltrosYOrden.currentPage ===
            Math.ceil(filteredPokemons.length / pokesPorPagina)
          }
        >
          Siguiente
        </button>
      </div>
      {/* CARDS CONTAINER */}
      <div className={style.container}>
        {currentPokemons.map((e) => {
          return (
            <div className={style.card}>
              <Card
                id={e.id}
                nombre={e.nombre}
                imagen={e.imagen}
                Tipos={e.tipo}
                key={e.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardsContainer;
