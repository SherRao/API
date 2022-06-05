const express = require("express");
const app = express();
const port = 3000;

const spotify = require("./routes/spotify");
const wakatime = require("./routes/wakatime");

app.get("/", (request, response) => {
    response.send("Hello World!");
});

app.get("/spotify", (request, response) => {
    spotify(request, response);
});

app.get("/wakatime", (request, response) => {
    wakatime(request, response);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
