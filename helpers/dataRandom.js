class DataRandom {
  dataRandom (data) {
   const random = [];
   data.forEach(element => {
    random.push(element.external_urls.spotify);
   });
   const dataOrder = random.sort(function() { return Math.random() - 0.5});
   return dataOrder;
  }
}

module.exports = new DataRandom();