// backend/models/services.js
const { client } = require('../config/db');

const getServicesCollection = () => {
  const db = client.db("test"); // change db name if needed
  return db.collection("Services");
};

module.exports = { getServicesCollection };
