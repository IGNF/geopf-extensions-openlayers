import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCoordinates, formatCoordinateLabel } from "../../src/packages/Utils/CoordinateParser.js";

const EPSILON = 1e-6;

function assertCoordinate (actual, expected) {
    assert.ok(actual, "une coordonnée est attendue");
    assert.ok(Math.abs(actual.lat - expected.lat) < EPSILON, `lat ${actual.lat} != ${expected.lat}`);
    assert.ok(Math.abs(actual.lon - expected.lon) < EPSILON, `lon ${actual.lon} != ${expected.lon}`);
    if (expected.order) {
        assert.equal(actual.order, expected.order);
    }
    if (expected.format) {
        assert.equal(actual.format, expected.format);
    }
}

test("exemples de référence", async (t) => {
    await t.test("degrés décimaux haute précision", () => {
        const result = parseCoordinates("48.50249550131934, 3.384179137330703");
        assertCoordinate(result[0], { lat : 48.50249550131934, lon : 3.384179137330703, order : "latlon", format : "DD" });
        assert.equal(result[0].lat, 48.50249550131934);
        assertCoordinate(result[1], { lat : 3.384179137330703, lon : 48.50249550131934, order : "lonlat" });
    });
    await t.test("degrés décimaux", () => {
        const result = parseCoordinates("48.502496, 3.384179");
        assert.equal(result.length, 2);
        assertCoordinate(result[0], { lat : 48.502496, lon : 3.384179, order : "latlon" });
    });
    await t.test("degrés et minutes décimales", () => {
        const result = parseCoordinates("48° 30.1497' N, 3° 23.0507' E");
        assert.equal(result.length, 1);
        assertCoordinate(result[0], { lat : 48 + 30.1497 / 60, lon : 3 + 23.0507 / 60, order : "cardinal", format : "DDM" });
    });
    await t.test("degrés minutes secondes", () => {
        const result = parseCoordinates("48°30'08.9\"N 3°23'03.0\"E");
        assert.equal(result.length, 1);
        assertCoordinate(result[0], { lat : 48 + 30 / 60 + 8.9 / 3600, lon : 3 + 23 / 60 + 3 / 3600, order : "cardinal", format : "DMS" });
    });
    await t.test("degrés décimaux signés", () => {
        const result = parseCoordinates("+48.502496, +3.384179");
        assertCoordinate(result[0], { lat : 48.502496, lon : 3.384179, order : "latlon" });
    });
});

test("hémisphères sud et ouest", () => {
    assertCoordinate(parseCoordinates("-33.8688, -151.2093")[0], { lat : -33.8688, lon : -151.2093, order : "latlon" });
    assertCoordinate(parseCoordinates("33°52'07.7\"S 151°12'33.5\"E")[0], { lat : -(33 + 52 / 60 + 7.7 / 3600), lon : 151 + 12 / 60 + 33.5 / 3600 });
    assertCoordinate(parseCoordinates("48.85 N, 2.35 W")[0], { lat : 48.85, lon : -2.35 });
    assertCoordinate(parseCoordinates("48.85 n, 2.35 o")[0], { lat : 48.85, lon : -2.35 });
    assertCoordinate(parseCoordinates("-12.5, 45.25")[0], { lat : -12.5, lon : 45.25, order : "latlon" });
});

test("points cardinaux en préfixe et ordre inversé", () => {
    assertCoordinate(parseCoordinates("N 48.5, E 3.3")[0], { lat : 48.5, lon : 3.3 });
    assertCoordinate(parseCoordinates("N48°30.1497' E3°23.0507'")[0], { lat : 48 + 30.1497 / 60, lon : 3 + 23.0507 / 60 });
    const reversed = parseCoordinates("3°23'03.0\"E 48°30'08.9\"N");
    assert.equal(reversed.length, 1);
    assertCoordinate(reversed[0], { lat : 48 + 30 / 60 + 8.9 / 3600, lon : 3 + 23 / 60 + 3 / 3600, order : "cardinal" });
});

test("double interprétation et bornes", () => {
    assert.equal(parseCoordinates("48.5, 120.25").length, 1);
    assertCoordinate(parseCoordinates("48.5, 120.25")[0], { lat : 48.5, lon : 120.25, order : "latlon" });
    const onlyLonLat = parseCoordinates("120.25, 48.5");
    assert.equal(onlyLonLat.length, 1);
    assertCoordinate(onlyLonLat[0], { lat : 48.5, lon : 120.25, order : "lonlat" });
    assert.equal(parseCoordinates("12.5, 12.5").length, 1);
    assert.equal(parseCoordinates("90.0, 180.0").length, 1);
    assert.equal(parseCoordinates("-90.0, -180.0").length, 1);
    assert.deepEqual(parseCoordinates("120.5, 190.5"), []);
    assert.deepEqual(parseCoordinates("95°N, 3°E"), []);
});

test("entiers avec séparateur explicite", () => {
    assertCoordinate(parseCoordinates("48, 2")[0], { lat : 48, lon : 2, order : "latlon", format : "DD" });
    assertCoordinate(parseCoordinates("48, 2")[1], { lat : 2, lon : 48, order : "lonlat" });
    assertCoordinate(parseCoordinates("48,2")[0], { lat : 48, lon : 2 });
    assertCoordinate(parseCoordinates("48;2")[0], { lat : 48, lon : 2 });
    assertCoordinate(parseCoordinates("48 / 2")[0], { lat : 48, lon : 2 });
    assertCoordinate(parseCoordinates("48.5, 2")[0], { lat : 48.5, lon : 2 });
    assertCoordinate(parseCoordinates("-48, 2")[0], { lat : -48, lon : 2 });
    assertCoordinate(parseCoordinates("+48, -2")[0], { lat : 48, lon : -2 });
    assert.equal(parseCoordinates("2, 48").length, 2);
    assert.equal(parseCoordinates("120, 48").length, 1);
    const rejected = ["48 2", "75 001", "45 12", "48.5 2", "48,5 3", "75001 75002", "120, 190", "1, 2, 3", "48,5,3,3", "48, 2,5", "48,"];
    for (const value of rejected) {
        assert.deepEqual(parseCoordinates(value), [], `"${value}" ne devrait pas être reconnu`);
    }
});

test("zéro", () => {
    const result = parseCoordinates("0.0, 0.0");
    assert.equal(result.length, 1);
    assertCoordinate(result[0], { lat : 0, lon : 0 });
});

test("séparateurs et virgule décimale", () => {
    assertCoordinate(parseCoordinates("48.5;3.3")[0], { lat : 48.5, lon : 3.3 });
    assertCoordinate(parseCoordinates("48.5 / 3.3")[0], { lat : 48.5, lon : 3.3 });
    assertCoordinate(parseCoordinates("48.5 3.3")[0], { lat : 48.5, lon : 3.3 });
    assertCoordinate(parseCoordinates("48,5024 3,3841")[0], { lat : 48.5024, lon : 3.3841 });
    assertCoordinate(parseCoordinates("48,5024; 3,3841")[0], { lat : 48.5024, lon : 3.3841 });
    assert.deepEqual(parseCoordinates("48,5,3,3"), []);
});

test("symboles typographiques", () => {
    assertCoordinate(parseCoordinates("48°30′08.9″N 3°23′03.0″E")[0], { lat : 48 + 30 / 60 + 8.9 / 3600, lon : 3 + 23 / 60 + 3 / 3600 });
    assertCoordinate(parseCoordinates("48º30'08.9''N\u00A03º23'03.0''E")[0], { lat : 48 + 30 / 60 + 8.9 / 3600, lon : 3 + 23 / 60 + 3 / 3600 });
    assertCoordinate(parseCoordinates("\u221233.5, 151.2")[0], { lat : -33.5, lon : 151.2 });
    assertCoordinate(parseCoordinates("48.5°, 3.3°")[0], { lat : 48.5, lon : 3.3 });
    assertCoordinate(parseCoordinates("48°, 3°")[0], { lat : 48, lon : 3 });
});

test("saisies rejetées", () => {
    const rejected = [
        "",
        "48.5",
        "48 3",
        "75001",
        "75001 75002",
        "12 rue de la Paix",
        "12 rue de la Paix 75002 Paris",
        "Paris",
        "1.5, 2.5, 3.5",
        "48°60' N, 3°20' E",
        "48°30'60\" N, 3°20'10\" E",
        "-48.5 N, 3.3 E",
        "48.5 N, 3.3 S",
        "48.5 E, 3.3 W",
        "48.5 N, 3.3",
        "N 48.5 S, 3.3 E",
        "48.5°, 3.3",
        "48°30.5', 3.3",
        "48° 30",
        "abc, def"
    ];
    for (const value of rejected) {
        assert.deepEqual(parseCoordinates(value), [], `"${value}" ne devrait pas être reconnu`);
    }
    assert.deepEqual(parseCoordinates(null), []);
    assert.deepEqual(parseCoordinates(undefined), []);
});

test("libellé", () => {
    const [latlon, lonlat] = parseCoordinates("48.50249550131934, 3.384179137330703");
    assert.equal(formatCoordinateLabel(latlon), "Latitude 48.502496°, Longitude 3.384179°");
    assert.equal(formatCoordinateLabel(lonlat), "Latitude 3.384179°, Longitude 48.502496°");
    assert.equal(formatCoordinateLabel(latlon, { precision : 2 }), "Latitude 48.5°, Longitude 3.38°");
    // le libellé recopié dans le champ (navigation clavier) ne doit pas être lui-même reconnu
    assert.deepEqual(parseCoordinates(formatCoordinateLabel(latlon)), []);
    assert.deepEqual(parseCoordinates(formatCoordinateLabel(lonlat)), []);
});
