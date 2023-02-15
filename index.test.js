const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        // create new band
        const newBand = await Band.create({name: 'The Beatles', genre: 'Rock'});
        // select the band from the database and check properties
        const selectBand = await Band.findByPk(newBand.id);
        expect(selectBand.name).toBe('The Beatles');
        expect(selectBand.genre).toBe('Rock');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        // create new musician
        const newMusician = await Musician.create({name: 'Lizzo', instrument: 'Flute'});
        // Select musician from the database and check properties
        const selectMusician = await Musician.findByPk(newMusician.id);
        expect(selectMusician.name).toBe('Lizzo');
        expect(selectMusician.instrument).toBe('Flute');
    })
})