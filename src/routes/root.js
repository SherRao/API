import express from "express";

const router = express.Router();

// middleware that is specific to this router
router.use((request, response, next) => {
    console.log("Time: ", Date.now());
    next();
});

// define the home page route
router.get("/", (request, response) => {
    response.send("Birds home page");
});

export default router;
