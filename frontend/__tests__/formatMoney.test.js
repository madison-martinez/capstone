import formatMoney from '../src/utils/formatMoney';

describe('Format Money function', () => {
    it('works with cents', () => {
        expect(formatMoney(.10)).toEqual('$0.10')
    });

    it('works with dollars and dollars with cents', () => {
        expect(formatMoney(50.25)).toEqual('$50.25')
        expect(formatMoney(78.00)).toEqual('$78.00')
    })
});
