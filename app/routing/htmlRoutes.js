const path = require("path");

module.exports = (app, express) => {

    app.use(express.static(path.join(__dirname, '../public')));

};
