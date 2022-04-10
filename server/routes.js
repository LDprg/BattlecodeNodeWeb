const express = require('express');

exports = module.exports = function(app) {

    app.get('/', (req, res) => res.send('Hello World!'))
}
  