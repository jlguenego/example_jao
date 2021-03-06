// 'use strict'; NO NEED ANYMORE OF USE STRICT BECAUSE OF ES6 MODULE MODE
// WEBPACK USES ABOVE USE STRICT SO NO NEED.


import Hashes from 'jshashes'; // ES6 import notation.
const hash = (new Hashes.SHA1).hex;

const data = 'this is the genesis block';
const genesisBlock = { id: 0, data: data, previous: undefined, hash: hash(data) };
const blockchain = {
    lastBlock: genesisBlock,
    add: function (data) {
        const id = this.lastBlock.id + 1;
        this.lastBlock = {
            id, data,
            previous: this.lastBlock,
            hash: hash(id + data + this.lastBlock.hash),
        };
    },
    log: function () {
        var block = this.lastBlock;
        while (true) {
            console.log(`block[${block.id}]:[${block.data}], hash=${block.hash}`);
            block = block.previous;
            if (block === undefined) break;
        }
    }
}
export default blockchain; // export ES6 (webpack)
