const returnData = (ctx, dataRandom) => {
    for(let i = 0; i < 5; i++){
        ctx.reply(dataRandom[i]);
    }
}

module.exports = returnData;