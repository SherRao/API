import express from "express";
import SpotifyWebApi from "spotify-web-api-node";

// middleware that is specific to this router
// router.use((request, response, next) => {
    //     console.log("Time: ", Date.now());
    //     next();
    // });

const api = new SpotifyWebApi({
    clientId: "dd0105d05d87478193762d32e7109345",
    clientSecret: "1755edc33f2a479dacb7e477820b6854",
    redirectUri: "http://localhost:3000/spotify"
});

const refreshApi = async () => {
    return api.clientCredentialsGrant().then(
        function(data) {
            console.log("The access token expires in " + data.body["expires_in"]);
            console.log("The access token is " + data.body["access_token"]);

            // Save the access token so that it's used in future calls
            api.setAccessToken(data.body["access_token"]);

        }, function(err) {
            console.error("Something went wrong when retrieving an access token", err);
        }
    );
};

const getImplicitGrantFlowURL = () => {
    return "https://accounts.spotify.com/authorize?client_id=dd0105d05d87478193762d32e7109345&response_type=token&redirect_uri=http://localhost:3000/spotify?&state=bigN&scope=user-read-email user-read-private user-read-recently-played user-read-playback-state user-top-read user-read-currently-playing user-follow-read user-read-playback-position playlist-read-private user-library-read playlist-read-collaborative"
    const scopes = ['user-read-private', 'user-read-email'],
    state = 'test',
    showDialog = true,
    responseType = 'token';

    const authorizeURL = api.createAuthorizeURL(
        scopes,
        state,
        showDialog,
        responseType
        );

        return authorizeURL;
    }

const router = express.Router();
router.get("/", async (request, response) => {
    console.debug("URL:", `${request.protocol}://${request.get('host')}${request.originalUrl}`)

    const hasAccessToken = api.getAccessToken();
    if(!hasAccessToken) {
        const queries = Object.keys(request.query).length;
        console.debug("QUERIES", queries, request.query);
        if(queries <= 0) {
            response.redirect(getImplicitGrantFlowURL());
            return;
        }

        const token = request.query.access_token;
        api.setAccessToken(token);
    }

    const playbackState = await api.getMyCurrentPlayingTrack();
    if(playbackState.statusCode !== 200) {
        response.status(playbackState.statusCode).send(playbackState.body);
        return;
    }

    const isPlaying = playbackState.body.is_playing;
    console.debug("IS PLAYING:", isPlaying);
    if(!isPlaying) {
        response.status(200).send({is_playing: false});
        return;
    }

    const result = parseTrack(playbackState.body.item, playbackState.body.progress_ms);
    response.status(200).send(result);
    console.debug("RESULT:", result);
    return result;
});

const parseTrack = (track, progress) => (
    {
        id: track.id,
        name: track.name,
        album: track.album.name,
        artists: track.artists.map(artist => artist.name).join(", "),
        duration: track.duration_ms,
        cover: track.album.images[0].url,
        url: track.external_urls.spotify,
        progress: progress,
    }
);

export default router;
