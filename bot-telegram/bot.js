require('dotenv').config();
const {Telegraf} = require('telegraf');

const {
    getArtist,
    getPlaylist, 
    getTracks
} = require('../data/dataSpotify');
const {
    startText,
    searchArtists,
    searchTracks, 
    searchGenre, 
    searchCountry, 
    searchPlaylist
} = require('../data/dataTelegram');
const returnData  = require('../helpers/returnData');
const dataRandom = require('../helpers/dataRandom');
const Token = require('../helpers/getTokenSpotify');

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
const menuMessage = "¿Qué buscas?";
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

bot.command('canciones', async(ctx) => {
    await Token.generateToken();
    ctx.reply("Ingresa el nombre del artista");
    responses = 'Canciones por artista';
});

bot.command('playlist', async(ctx) => {
    await Token.generateToken();
    ctx.reply("Ingresa nombre del artista o genero");
    responses = 'Playlist por artista';
});

function sendStartMessage (ctx) {
    const startMessage = `Bienvenid@ ${ctx.chat.first_name}, este bot te ayuda a descubrir Spotify en el mundo`;

    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: startText
        }
    })
}

bot.action('Artista', ctx => {
    ctx.answerCbQuery();

    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: 
            searchArtists,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
});

bot.action('Canciones', ctx => {
    ctx.answerCbQuery();

    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: searchTracks,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
});

bot.action('Genero', ctx => {
    ctx.answerCbQuery();

    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: searchGenre,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
});

bot.action('Pais', ctx => {
    ctx.answerCbQuery();

    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: searchCountry,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
});

bot.action('Playlist', ctx => {
    ctx.answerCbQuery();

    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: searchPlaylist,
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
        returnData(ctx, random);
    }
    if(responses === 'Playlist por artista' || responses === 'Playlist por genero' || responses === 'Playlist por pais'){
        ctx.reply(`Ya busco algunas playlist de ${ctx.message.text}`);
        const playlist = await getPlaylist(ctx.message.text);
        const random = dataRandom(playlist);
        returnData(ctx, random);
    }
    if(responses === 'Artistas por genero' || responses === 'Artistas por pais'){
        ctx.reply(`Ya busco algunos artistas por ${ctx.message.text}`);
        const artistas = await getArtist(ctx.message.text);
        const random = dataRandom(artistas);
        returnData(ctx, random);
    }
});

bot.launch();