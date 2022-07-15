require('dotenv').config();
const {Telegraf} = require('telegraf');

const {startText} = require('../data/dataTelegram');
const {
    getArtist,
    getPlaylist, 
    getTracks,
} = require('../data/dataSpotify');
const returnData  = require('../helpers/returnData');
const dataRandom = require('../helpers/dataRandom');
const actions = require('../helpers/actions');
const Token = require('../helpers/getTokenSpotify');

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

let responses;

bot.help((ctx)=> {
    const helpMessage = `
    *Music dot bot*
    /start - Iniciar bot
    /canciones - Buscar canciones por artista
    /playlists - Buscar playlist por artista, género o país
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

bot.command('playlists', async(ctx) => {
    await Token.generateToken();
    ctx.reply("Ingresa nombre del artista, genero o país");
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

actions(bot);

bot.hears(['Canciones por genero', 'Artistas por genero','Playlist por genero'], ctx => {
    ctx.reply("Ingresa el nombre del genero");
    responses = ctx.message.text;
});
    
bot.hears(['Playlist por artista', 'Canciones por artista'], ctx => {
    ctx.reply("Ingresa el nombre del artista");
    responses = ctx.message.text;
});
    
bot.hears(['Canciones por pais', 'Artistas por pais', 'Playlist por pais'], ctx => {
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