const jwt = require("jsonwebtoken");
const axios = require("axios");
const createAccessToken = require("./utils/accesTokenRequest");
require("dotenv").config();

const private_key = process.env.DOCUSIGN_PRIVATE_KEY;

// Définir les informations du jeton (payload)
const payload = {
  iss: "b51cc32a-8fde-4611-99dd-f5d4f6c50c75", // Clé d'intégration DocuSign
  sub: "5469a366-a907-4faa-b2fe-6ab38089e6c7", // Identifiant de l'utilisateur de DocuSign
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 6000,
  aud: "account-d.docusign.com",
  scope: "signature impersonation",
};
console.log("payload:", payload);

// Générer le token JWT
const token = jwt.sign(payload, private_key, { algorithm: "RS256" });

console.log(token);

createAccessToken(token);
