const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const createAccessToken = require("./utils/accesTokenRequest");
require("dotenv").config();

const private_key = process.env.DOCUSIGN_PRIVATE_KEY;

const app = express();
app.use(express.json());

app.post("/accesstoken", async (req, res) => {
  const user_id = req.body.user_id;
  // Définir les informations du jeton (payload)
  console.log("user_id :", user_id);
  const payload = {
    iss: "b51cc32a-8fde-4611-99dd-f5d4f6c50c75", // Clé d'intégration DocuSign
    sub: user_id, // Identifiant de l'utilisateur de DocuSign "5469a366-a907-4faa-b2fe-6ab38089e6c7"
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 6000,
    aud: "account-d.docusign.com",
    scope: "signature impersonation",
  };
  console.log("payload:", payload);

  // Générer le token JWT
  const token = jwt.sign(payload, private_key, { algorithm: "RS256" });

  try {
    const response = await createAccessToken(token);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
