const { Router } = require("express");

const status = Router();

status.get("/health", (req, res) => {
    res.status(200).render("200", {layout: "svStatus"});
});

const notFound = (req, res) => {
    res.status(404).render("404", { layout: "svStatus" });
};

const serverError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("500", { layout: "svStatus" });
};

module.exports = { status, notFound, serverError };