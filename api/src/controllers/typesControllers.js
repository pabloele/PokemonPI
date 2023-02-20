const {Tipo} = require('../db')
const axios = require('axios')

//TRAE TODOS LOS TIPOS DE LA API --> DEVUELVE UN ARRAY

const getAllTypes = async () => {
   
   const typesArray = (await axios.get('https://pokeapi.co/api/v2/type')).data;
   const typesNames = typesArray.results.map( e => e.name )
   
   return typesNames;
}

//GUARDA LOS TIPOS EN LA TABLA 'Tipo' DE LA DB <-- RECIBE ARRAY DE TIPOS

const typesToDb =  (typesNames) => {
   
   typesNames.map(async e => {
    const type = await Tipo.create({
            nombre: e
        })

   })
   
    
}

//OBTIENE EL ID DEL TIPO A PARTIR DEL NAME

const idTypeByNombre = async (nombreTipo) => {
      //console.log(nombreTipo)
      const registro = await Tipo.findOne({
        where: {
          nombre: nombreTipo,
        },
      });
    
      if (!registro) {
        return null;
      }
    
      return registro.id;
    
}

module.exports = {
    getAllTypes,
    typesToDb,
    idTypeByNombre
}