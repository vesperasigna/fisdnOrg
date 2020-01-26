const express = require('express');
const archiveRouter = express.Router();
const path = require('path');

archiveRouter.use('/assets', express.static(path.resolve('public')));


archiveRouter.get('/', (req, res) => {
    res.sendFile(path.resolve("views/archive.html"));
});


module.exports = archiveRouter;