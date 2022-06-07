require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const root = require("./routes/root");
const spotify = require("./routes/spotify");
const wakatime = require("./routes/wakatime");

app.use("/", root);
app.use("/spotify", spotify);
app.use("/wakatime", wakatime);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
