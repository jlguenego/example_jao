let o = {
    a: 3,
    b: {
        c: 4,
        d: {
            e: 'hello'
        }
    }
};

const p = Object.assign({}, o);
const q = { ...o };
console.log('p', p);
console.log('p === o', p === o);
console.log('p.b === o.b', p.b === o.b);
console.log('q', q);
console.log('q === o', q === o);
console.log('q.b === o.b', q.b === o.b);
