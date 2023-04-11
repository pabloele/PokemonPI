const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//console.log(configuration);
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: "pokemon minion",
      n: 4,
      size: "512x512",
    });
    const imageUrl = response.data.data[0].url;

    // .data.data[0].url;
    // const response = await openai.createImage({
    //   prompt: "Polar bear on ice skates",
    //   n: 1,
    //   size: "512x512",
    // });

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

module.exports = { generateImage };
