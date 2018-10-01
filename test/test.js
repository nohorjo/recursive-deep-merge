const { expect } = require("chai");;
const merge = require('../index');

describe('checks', () => {
    it('throws if first is null', () => {
        expect(merge.bind(null, null, {})).to.throw();
    });
    it('throws if second is null', () => {
        expect(merge.bind(null, {}, null)).to.throw();
    });
    it('throws if not same type', () => {
        expect(merge.bind(null, {}, [])).to.throw();
    });
    it('throws if not object or array', () => {
        expect(merge.bind(null, 1, 2)).to.throw();
        expect(merge.bind(null, true, false)).to.throw();
        expect(merge.bind(null, 'first', 'second')).to.throw();
    });
});
describe('merge', () => {
    it('does not modify inputs', () => {
        const first = {a: 1};
        const second = {b: 2};
        
        merge(first, second);

        expect(first).to.deep.equal({a: 1});
        expect(second).to.deep.equal({b: 2});
    });
    it('adds props', () => {
        const first = {a: 1};
        const second = {b: 2};
        const expected = {a: 1, b:2};

        expect(merge(first, second)).to.deep.equal(expected);
    });
    it('changes props', () => {
        const first = {a: 1};
        const second = {a: 2};
        const expected = {a: 2};

        expect(merge(first, second)).to.deep.equal(expected);
    });
    it('skips undefined array element', () => {
        const first = [{a: 1}];
        const second = [undefined, {b: 2}];
        const expected = [
            {a: 1},
            {b: 2}
        ];

        expect(merge(first, second)).to.deep.equal(expected);
    });
    it('does not skip null array element', () => {
        const first = [{a: 1}];
        const second = [null, {b: 2}];
        const expected = [
            null,
            {b: 2}
        ];

        expect(merge(first, second)).to.deep.equal(expected);
    });
    it('does not skip undefined object property', () => {
        const first = {a: 1};
        const second = {
            a: undefined,
            b: 2
        };
        const expected = {
            a: undefined,
            b: 2
        };

        expect(merge(first, second)).to.deep.equal(expected);
    });
    it('deep merges', () => {
        const first = {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: [{
                    f: 4
                }]
            },
            g: [
                {
                    h: 5,
                    i: 7
                },
                7
            ]
        };
        const second = {
            b: 9, // changed
            c: {
                e: [
                    {
                        e1: 8, // added prop
                    },
                    7 // added element
                ]
            },
            g: 'replace not merge'
        };
        const expected = {
            a: 1,
            b: 9,
            c: {
                d: 3,
                e: [
                    {
                        e1: 8,
                        f: 4
                    },
                    7
                ]
            },
            g: 'replace not merge'
        };

        expect(merge(first, second)).to.deep.equal(expected);
    });
});
