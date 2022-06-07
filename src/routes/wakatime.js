const WakaTimeClientPackage = require("wakatime-client");
const { WakaTimeClient } = WakaTimeClientPackage;
const { RANGE } = WakaTimeClientPackage;

const process = require("node:process");
const express = require("express");
const router = express.Router();

const client = new WakaTimeClient(process.env.WAKATIME_API_KEY);

router.use((request, response, next) => {
    console.log("Time: ", Date.now());
    next();
});

router.get("/", async (request, response) => {
    const userDetails = await client.getMyStats({ range: RANGE.LAST_7_DAYS });
    console.log(userDetails);
    response.send(userDetails);
});

router.get("/commits", async (request, response) => {
    const userDetails = await client.getMyCommits({ projectName: "LaurierHawkHacks/Landing" });
    console.log(userDetails);
    response.send(userDetails);
});

router.get("/languages", async (request, response) => {
    const userDetails = await client.getMyStats({ range: RANGE.LAST_7_DAYS });
    console.log(userDetails);
    response.send(userDetails);
});

router.get("/projects", async (request, response) => {
    const userDetails = await client.getMyProjects();
    console.log(userDetails);
    response.send(userDetails);
});

router.get("/history", async (request, response) => {
    const userDetails = await client.getMyStats({ range: RANGE.LAST_7_DAYS });
    console.log(userDetails);
    response.send(userDetails);
});

module.exports = router;
