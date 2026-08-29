const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/gerar-anuncio", async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({
        erro: "Link não informado."
      });
    }

    const resposta = await client.responses.create({
      model: "gpt-5.6",
      input: `
Você é um especialista em marketing de afiliados.

Crie um anúncio para TikTok baseado neste link de produto:

${link}

Retorne:

1. Um gancho curto e chamativo.
2. Um roteiro de vídeo de 20 a 30 segundos.
3. Uma legenda para TikTok.
4. 5 hashtags relevantes.

Não invente preço, desconto ou características que não estejam disponíveis.
`
    });

    res.json({
      sucesso: true,
      anuncio: resposta.output_text
    });

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Não foi possível gerar o anúncio."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
