const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

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
        const newBand = await Band.create({name: 'The Beatles', genre: 'Rock', showCount: 170});
        // select the band from the database and check properties
        const selectBand = await Band.findByPk(newBand.id);
        expect(selectBand.name).toBe('The Beatles');
        expect(selectBand.genre).toBe('Rock');
        expect(selectBand.showCount).toBe(170);
    })

    test('can update a Band', async () => {
        // create new band
        const newBand = await Band.create({name: 'Flo', genre: 'RnB', showCount: 52});
        // update band 
        const updatedBand = await Band.update({ showCount: 74 }, { where: { id: newBand.id }});
        // select band from database and check new properties
        const selectBand = await Band.findByPk(newBand.id)
        expect(selectBand.showCount).toBe(74);
    })
    
    test('can delete a Band', async () => {
        // create new band
        const newBand = await Band.create({name: 'Flo', genre: 'RnB', showCount: 52});
        // check the band exists
        let selectBand = await Band.findByPk(newBand.id);
        expect(selectBand).not.toBeNull();
        // delete the band
        await Band.destroy({ where: { id: newBand.id } });
        // try to retreive the band again and test that it doesnt exist anymore
        selectBand = await Band.findByPk(newBand.id);
        expect(selectBand).toBeNull();
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

    test('can update a Musician', async () => {
        // create new musician
        const newMusician = await Musician.create({name: 'Lizzo', instrument: 'Flute'});
        // update musician
        const updatedMusician = await Musician.update({name: 'Lady Gaga', instrument: 'Piano'}, { where: { id: newMusician.id }});
        // retreive from the db and check new properties
        const selectMusician = await Musician.findByPk(newMusician.id);
        expect(selectMusician.name).toBe('Lady Gaga');
        expect(selectMusician.instrument).toBe('Piano');
    })

    test('can delete a Musician', async () => {
        // create new musician
        const newMusician = await Musician.create({name: 'Ed Sheeran', instrument: 'Guitar'});
        // check the musician exists
        let selectMusician = await Musician.findByPk(newMusician.id);
        expect(selectMusician).not.toBeNull();
        // delete the musician
        await Musician.destroy({ where: { id: newMusician.id } });
        // try to retreive the band again and test that it doesnt exist anymore
        selectMusician = await Musician.findByPk(newMusician.id);
        expect(selectMusician).toBeNull();
    })

    test('can add multiple musicians to a band', async () => {
        // create some bands
        const newBand = await Band.create({name: 'Flo', genre: 'RnB', showCount: 52});
        // get bands from db
        const band4 = await Band.findByPk(4);
        // create some musicians
        const newMusician1 = await Musician.create({name: 'Stella Quaresma', instrument: 'Voice'});
        const newMusician2 = await Musician.create({name: 'Jorja Douglas', instrument: 'Voice'});
        const newMusician3 = await Musician.create({name: 'Renee Downer', instrument: 'Voice'});
        // add musicians to band
        await newBand.addMusician(newMusician1);
        await newBand.addMusician(newMusician2);
        await newBand.addMusician(newMusician3);
        const bandWithMusicians = await Musician.findAll( { where: { bandId: 4 } });
        // console.log(bandWithMusicians);
        // console.log(newBand.id);
        expect(bandWithMusicians[0].name).toBe('Stella Quaresma');
        expect(bandWithMusicians[1].name).toBe('Jorja Douglas');
        expect(bandWithMusicians[2].name).toBe('Renee Downer');
        
    })

    test('can create a Song', async () => {
        // create song
        const newSong = await Song.create({title: 'Cardboard Box', year: 2021})
        // select song from db and check properties
        const findSong = await Song.findByPk(newSong.id);
        expect(findSong.title).toBe('Cardboard Box');
        expect(findSong.year).toBe(2021);
    })
 
})