const startText = [
    [
        {text: "Artista", callback_data: 'Artista'}
    ],
    [
        {text: "Canciones", callback_data: 'Canciones'}
    ],
    [
        {text: "Genero", callback_data: 'Genero'}
    ],
    [
        {text: "País", callback_data: 'Pais'}
    ],
    [
        {text: "Playlist", callback_data: 'Playlist'}
    ],
    [
        {text: "Salir", callback_data: 'Salir'}
    ],
    [
        {text: "Ayuda", callback_data: 'Ayuda'}
    ]
];

const searchArtists = [
    [
        { text: "Canciones por artista"}
    ],
    [
        { text: "Playlist por artista"}
    ],
    [
        { text: "Salir" }
    ]
];

const searchTracks = [
    [
        { text: "Canciones por genero"}
    ],
    [
        { text: "Canciones por artista"}
    ],
    [
        { text: "Salir" }
    ]
];

const searchGenre = [
    [
        { text: "Playlist por genero"}
    ],
    [
        { text: "Artistas por genero"}
    ],
    [
        { text: "Canciones por genero"}
    ],
    [
        { text: "Salir" }
    ]
];

const searchCountry = [
    [
        { text: "Canciones por pais"}
    ],
    [
        { text: "Playlist por pais"}
    ],
    [
        { text: "Artistas por pais"}
    ],
    [
        { text: "Salir" }
    ]
];

const searchPlaylist = [
    [
        { text: "Playlist por artista"}
    ],
    [
        { text: "Playlist por genero"}
    ],
    [
        { text: "Playlist por pais"}
    ],
    [
        { text: "Salir" }
    ]
];

module.exports= {
    startText,
    searchArtists,
    searchTracks,
    searchGenre,
    searchCountry,
    searchPlaylist
};