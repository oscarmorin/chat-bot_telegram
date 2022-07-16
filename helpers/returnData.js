const returnData = async(bot, ctx, dataRandom, responses) => {
    let i = 0;
    for(i ; i < 5; i++){
        await ctx.reply(dataRandom[i]);
    }
    if(i === 5){
        const message = `Para buscar nuevamente *${responses}* ingrese nuevo nombre, para finalizar escriba *Salir*`; 
        bot.telegram.sendMessage(ctx.from.id, message, {
            parse_mode: "Markdown"
        });
    }
}

module.exports = returnData;