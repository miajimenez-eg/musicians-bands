const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Band.hasMany(Musician);
Band.belongsToMany(Song)
Song.belongsToMany(Band)
Musician.belongsTo(Band);

module.exports = {
    Band,
    Musician
};
