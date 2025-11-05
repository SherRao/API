import express from "express";
import process from "node:process";
import WakaTimeClientPackage, { WakaTimeClient, RANGE } from "wakatime-client";


const client = new WakaTimeClient(process.env.WAKATIME_API_KEY);
const router = express.Router();
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

export default router;
