const axios = require("axios");

const accessToken = async (jwt) => {
  const requestBody = {
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: jwt,
  };

  const requestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const endPointUrl = "https://account-d.docusign.com/oauth/token";

  try {
    const response = await axios.post(endPointUrl, requestBody, {
      headers: requestHeaders,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = accessToken;
