require('dotenv').config();
const SpotifyWebApi  = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi();

class Data {
    static async getTracks(data) {
        spotifyApi.setAccessToken(process.env.ACCESS_TOKEN_SPOTIFY);
        const response = await spotifyApi.searchTracks(data);
        return response.body.tracks.items;
    } 

    static async getPlaylist(data) {
        spotifyApi.setAccessToken(process.env.ACCESS_TOKEN_SPOTIFY);
        const response = await spotifyApi.searchPlaylists(data);
        return response.body.playlists.items;
    } 

    static async getArtist(data) {
        spotifyApi.setAccessToken(process.env.ACCESS_TOKEN_SPOTIFY);
        const response = await spotifyApi.searchArtists(data);
        return response.body.artists.items;
    }
}

module.exports = Data;