"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var markup2mir_1 = require("./markup2mir");
exports.markup2mir = markup2mir_1.markup2mir;
var radon_1 = require("./radon");
exports.Radon = radon_1.Radon;
var mir2markup_1 = require("./mir2markup");
exports.mir2markup = mir2markup_1.mir2markup;
exports.default = {
    Radon: radon_1.Radon,
    markup2mir: markup2mir_1.markup2mir,
    mir2markup: mir2markup_1.mir2markup,
};
var dr = {
    creationDate: 1574349677396,
    description: '',
    id: '8f9902dc-94e5-496e-bbe1-e1b28b7ed45e',
    name: 'template',
    radRequest: {
        description: '',
        name: 'template',
        radRequest: {
            retrieve: [{ script: [0x75, 0x40, 0x41], url: '' }, { script: [0x75], url: '' }],
            aggregate: [80],
            tally: [80],
            timelock: 0,
        },
    },
};
var radon = new radon_1.Radon(dr.radRequest).getMarkup();
// radon.updateMarkup(6, 'asBoolean')
console.dir(radon, { depth: null });
