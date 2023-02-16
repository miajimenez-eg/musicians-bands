const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Band.hasMany(Musician);
Band.belongsToMany(Song, {through: 'band_songs'})
Song.belongsToMany(Band, {through: 'band_songs'});
Musician.belongsTo(Band);

module.exports = {
    Band,
    Musician,
    Song
};