import "dotenv/config";
import express from "express";

import root from "./routes/root.js";
import spotify from "./routes/spotify.js";
import wakatime from "./routes/wakatime.js";

const app = express();
const port = 3000;

app.use("/", root);
app.use("/spotify", spotify);
app.use("/wakatime", wakatime);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
