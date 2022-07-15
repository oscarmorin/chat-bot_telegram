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
}

module.exports = actions;