const contactos = require('./contactos.json');
const tareas = require('./tareas.json');

module.exports = () => ({
  tareas: tareas,
  contactos: contactos
});