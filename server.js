<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Afiliado AI</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: auto;
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
    }

    input {
      width: 100%;
      padding: 14px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin: 15px 0;
    }

    button {
      width: 100%;
      padding: 14px;
      border: 0;
      border-radius: 8px;
      background: #111;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.6;
    }

    #resultado {
      margin-top: 20px;
      white-space: pre-wrap;
      line-height: 1.5;
    }
  </style>
</head>

<body>

  <div class="container">

    <h1>🤖 Afiliado AI</h1>

    <p>Coloque o link do produto:</p>

    <input
      id="link"
      type="url"
      placeholder="Cole aqui o link do Mercado Livre"
    >

    <button id="botao" onclick="gerarAnuncio()">
      🚀 Gerar anúncio
    </button>

    <div id="resultado"></div>

  </div>

  <script>
    async function gerarAnuncio() {

      const link = document.getElementById("link").value;
      const resultado = document.getElementById("resultado");
      const botao = document.getElementById("botao");

      if (!link) {
        resultado.innerText = "⚠️ Cole o link de um produto primeiro.";
        return;
      }

      botao.disabled = true;
      botao.innerText = "🤖 Gerando...";
      resultado.innerText = "A IA está preparando seu anúncio...";

      try {

        const resposta = await fetch(
          "https://ia-afiliada.onrender.com/gerar-anuncio",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              link: link
            })
          }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(dados.erro || "Erro ao gerar anúncio.");
        }

        resultado.innerText = dados.anuncio;

      } catch (erro) {

        resultado.innerText =
          "❌ Erro: " + erro.message;

      } finally {

        botao.disabled = false;
        botao.innerText = "🚀 Gerar anúncio";

      }
    }
  </script>

</body>
</html>
