'use strict';

function hash(str) {
    let acc = 634563452;
    for (let v of str) {
        acc = acc * v.charCodeAt(0) % 3241234;
    }
    return acc;
}
const data = 'this is the initial block';
const genesisBlock = { data: data, previous: undefined, hash: hash(data) };
const blockchain = {
    lastBlock: genesisBlock,
    add: function (data) {
        this.lastBlock = {
            data: data,
            previous: this.lastBlock,
            hash: hash(data + this.lastBlock.hash),
        };
    },
    log: function () {
        var block = this.lastBlock;
        while (true) {
            console.log('block:[' + block.data + '], hash=' + block.hash);
            block = block.previous;
            if (block === undefined) break;
        }
    }
}
module.exports = blockchain; // export
