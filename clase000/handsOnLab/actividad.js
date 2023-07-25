const moment = require ('moment')

const hija = moment("20110218") /* Fecha Nacimiento Hija */
const yo = moment("19850818", "YYYYMMDD") /* Fecha Nacimiento Yo */

console.log(hija, yo);

if (yo.isValid()) {
    console.log(let = difDay = hija.diff(yo, 'days'));
} else {
    console.log('Is not valid');
}

