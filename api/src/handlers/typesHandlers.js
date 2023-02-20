
const axios = require('axios')
const { getAllTypes, typesToDb } = require('../controllers/typesControllers')


const getTypesHandler = async (req, res) => {
    
    let typesNames

    try {
        typesNames = await getAllTypes();
        await typesToDb(typesNames);
        //res.status(201).json({tipos_importados:typesNames})
    } catch (error) {
        res.status(400).json({error:error})
    }
    
    //console.log(typesNames)
    //const typesNames = getAllTypes()
    //typesToDb()

   

    
    res.status(200).json(typesNames)

    //console.log(typesArray);


}

module.exports = {
    getTypesHandler
}