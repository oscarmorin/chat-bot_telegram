const {it, describe} = require('mocha');
const {expect} = require('chai');

const archivoValidator = require('../helpers/dataRandom');

describe('Prueba de array, recibe un objeto y lo recorre para almacenar la data en un array y devolver al azar 5 posiciones para no repetir los valores', function(){
    it("El resultado de dataRandom debe ser un array de 5 posiciones", function(){
        const data = {
            external_urls: {
                spotify: 'url'
            }
        }
        const result = archivoValidator.dataRandom([data,data,data,data,data]);
        expect(result.length).to.be.equal(5)
    });
});