import { GET_POKEMONES, GET_TIPOS, GET_QUERY, SAVE_FILTERS } from "./actions";

const initialState = {
  Pokemones: [],
  Tipos: [],
  FiltrosYOrden: {},
};

const rootReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case GET_POKEMONES:
      return { ...state, Pokemones: action.payload };
    case GET_TIPOS:
      return { ...state, Tipos: action.payload };
    case GET_QUERY:
      return { ...state, Query: action.payload };
    case SAVE_FILTERS:
      return {
        ...state,
        FiltrosYOrden: {
          currentPage: action.payload.currentPage,
          sortDirection: action.payload.sortDirection,
          selectedType: action.payload.selectedType,
          orderBy: action.payload.orderBy,
          source: action.payload.source,
        },
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
