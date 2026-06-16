function standardize (str) {
    return str
        .normalize("NFD")                // sépare les lettres et les accents
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase(); // supprime les accents et met en minuscule
}

const exceptions = [
    { "codeCommune" : "25104", "nomCommune" : "By" },
    { "codeCommune" : "28064", "nomCommune" : "Bû" },
    { "codeCommune" : "38289", "nomCommune" : "Oz" },
    { "codeCommune" : "61349", "nomCommune" : "Ri" },
    { "codeCommune" : "65458", "nomCommune" : "Uz" },
    { "codeCommune" : "76548", "nomCommune" : "Ry" },
    { "codeCommune" : "76255", "nomCommune" : "Eu" },
    { "codeCommune" : "95625", "nomCommune" : "Us" },
    { "codeCommune" : "08434", "nomCommune" : "Sy" },
    { "codeCommune" : "31404", "nomCommune" : "Oô" },
    { "codeCommune" : "66218", "nomCommune" : "Ur" },
    { "codeCommune" : "66155", "nomCommune" : "Py" },
    { "codeCommune" : "77082", "nomCommune" : "Gy" },
    { "codeCommune" : "80829", "nomCommune" : "Y" }
];

export function isException (string) {
    if (string.length) { 
        let isException = exceptions.map(e => standardize(e.nomCommune)).includes(standardize(string)); 
        return isException;
    }
    return false;
}

export function getExceptionParams (string) {
    return exceptions.find(e => standardize(e.nomCommune) === standardize(string));
}
