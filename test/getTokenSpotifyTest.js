const {it, describe} = require('mocha');
const {expect} = require('chai');

const archivoValidator = require('../helpers/getTokenSpotify');

describe('Prueba de token, el resultado debe ser guardar en la valiable de entorno ACCESS_TOKEN_SPOTIFY el token', function(){

    it("El resultado de getTokenSpotify debe ser guardar el token en ACCESS_TOKEN_SPOTIFY y sera una cadena de tipo string", async function(){

        const result = await archivoValidator.generateToken();
        expect(result).to.be.a('string');
    });
});