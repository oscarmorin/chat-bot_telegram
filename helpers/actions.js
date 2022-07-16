const {
    searchArtists,
    searchTracks, 
    searchGenre, 
    searchCountry, 
    searchPlaylist
} = require('../data/dataTelegram');

const menuMessage = "¿Qué buscas?";

const actions = (bot) => {
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
    bot.action('Salir', ctx => {
        ctx.answerCbQuery();
        bot.telegram.sendMessage(ctx.chat.id, `Hasta luego *${ctx.chat.first_name}* si quieres iniciar una nueva búsqueda presiona /start, si quieres conocer los comandos presiona /help`, {
            reply_markup: {
                remove_keyboard: true
            },
            parse_mode: "Markdown"
        }); 
        
    }); 
    bot.action('Ayuda', ctx => {
        ctx.answerCbQuery();
            const helpMessage = `
            *Music dot bot*
            Comandos:
            /start - Iniciar bot
            /canciones - Buscar canciones por artista
            /playlists - Buscar playlist por artista, género o país
            `;
        
            bot.telegram.sendMessage(ctx.from.id, helpMessage, {
                parse_mode: "Markdown"
            });
    });    
}

module.exports = actions;