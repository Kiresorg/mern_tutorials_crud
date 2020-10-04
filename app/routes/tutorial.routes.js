module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    // create tutorial
    router.post("/", tutorials.create);

    // get all Tutorials
    router.get("/", tutorials.findAll);

    // get all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // get Tutorial by id
    router.get("/:id", tutorials.findOne);

    // update Tutorial by id
    router.put("/:id", tutorials.update);

    // delete Tutorial by id
    router.delete("/:id", tutorials.delete);

    // delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};