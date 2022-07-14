require('dotenv').config();
const {Telegraf} = require('telegraf');

const {getArtist,getPlaylist, getTracks} = require('../data/data');
const dataRandom = require('../helpers/dataRandom');
const Token = require('../helpers/getTokenSpotify');

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
let responses; 

bot.help((ctx)=> {
    const helpMessage = `
    *Music dot bot*
    /start - Iniciar bot
    `;

    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "Markdown"
    })
});

bot.command('start', async(ctx) => {
    await Token.generateToken();
    sendStartMessage(ctx);
});

function sendStartMessage (ctx) {
    const startMessage = `Bienvenid@ ${ctx.chat.first_name}, este bot te ayuda a descubrir Spotify en el mundo`;

    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
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
                ]
            ]
        }
    })
}

bot.action('Artista', ctx => {
    ctx.answerCbQuery();

    const menuMessage = "¿Qué buscas?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Canciones por artista"}
                ],
                [
                    { text: "Playlist por artista"}
                ],
                [
                    { text: "Salir" }
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
});

bot.action('Canciones', ctx => {
    ctx.answerCbQuery();

    const menuMessage = "¿Qué buscas?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Canciones por genero"}
                ],
                [
                    { text: "Canciones por artista"}
                ],
                [
                    { text: "Salir" }
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
});

bot.action('Genero', ctx => {
    ctx.answerCbQuery();

    const menuMessage = "¿Qué buscas?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
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
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
});

bot.action('Pais', ctx => {
    ctx.answerCbQuery();

    const menuMessage = "¿Qué buscas?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
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
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
});

bot.action('Playlist', ctx => {
    ctx.answerCbQuery();

    const menuMessage = "¿Qué buscas?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
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
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
});

bot.hears(['Canciones por genero', 'Artistas por genero','Playlist por genero'], ctx => {
    ctx.reply("Ingresa el nombre del genero");
    responses = ctx.message.text;
});

bot.hears(['Playlist por artista', 'Canciones por artista'], ctx => {
    ctx.reply("Ingresa el nombre del artista");
    responses = ctx.message.text;
});

bot.hears(['Canciones por pais', 'Artistas por pais'], ctx => {
    ctx.reply("Ingresa el pais");
    responses = ctx.message.text;
});

bot.hears('Salir', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Hasta luego ${ctx.chat.first_name}`, {
        reply_markup: {
            remove_keyboard: true
        }
    });
    
});


bot.on('text', async(ctx) => {
    if(responses === 'Canciones por pais' || responses === 'Canciones por artista'|| responses === 'Canciones por genero'){
        ctx.reply(`Ya busco algunas canciones de ${ctx.message.text}`);
        const canciones = await getTracks(ctx.message.text);
        const random = dataRandom(canciones);
        for(let i = 0; i < 5; i++){
            ctx.reply(random[i]);
        }
    }
    if(responses === 'Playlist por artista' || responses === 'Playlist por genero' || responses === 'Playlist por pais'){
        ctx.reply(`Ya busco algunas playlist de ${ctx.message.text}`);
        const playlist = await getPlaylist(ctx.message.text);
        const random = dataRandom(playlist);
        for(let i = 0; i < 5; i++){
            ctx.reply(random[i]);
        }
    }
    if(responses === 'Artistas por genero' || responses === 'Artistas por pais'){
        ctx.reply(`Ya busco algunos artistas por ${ctx.message.text}`);
        const artistas = await getArtist(ctx.message.text);
        const random = dataRandom(artistas);
        for(let i = 0; i < 5; i++){
            ctx.reply(random[i]);
        }
    }
});

bot.launch();