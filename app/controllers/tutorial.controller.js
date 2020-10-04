const db = require("../models");
const Tutorial = db.tutorials;

// create, save
exports.create = (req, res) => {
    // validate req
    if (!req.body.title) {
        res.status(400).send({ message: "Content is empty" });
        return;
    }

    // create
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    // save
    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "an error occurred while creating tutrial"
            });
        });
};

// get all tutorials
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" }} : {}

    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while retreving tutorials"
            });
        });
};

// get tutorial by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Not found: Tutorial with id of " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retreiving Tutorial with id of " + id });
        });
};

// update tutorial by id
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Empty data for update"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Unable to update Tutorial with id of ${id}.`
                });
            } else res.send({ message: "Successfully updated Tutorial." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while trying to update Tutorial with id of " + id
            });
        });
};

// delete tutorial by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Unable to delete Tutorial with id of ${id}.`
                });
            } else {
                res.send({
                    message: "Tutorial deleted successfully."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Unable to delete Tutorial with id of " + id
            });
        });
};

// delete all tutorials
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occurred while attempting to delete all Tutorials"
            });
        });
};

// get all published tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving published Tutorials"
            });
        });
};