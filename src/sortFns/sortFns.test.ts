import { sortFns } from './sortFns';



const toNested = (arr: number[]): Record<'nested', number>[] => {
    return arr.map((value) => {
        return {
            nested: value,
        };
    });
};

const shuffledArray = [4, 2, 5, 1, 3, 3];
const ascendingArray = [1, 2, 3, 3, 4, 5];
const descendingArray = [5, 4, 3, 3, 2, 1];

const shuffledArrayNested = toNested(shuffledArray);
const ascendingArrayNested = toNested(ascendingArray);

describe('sortFns', () => {
    describe('<sortFn>.select', () => {
        it(`
            should sort non number values by selecting inner number value
        `, () => {
            const result = shuffledArrayNested.toSorted(
                sortFns.ascending.select((ab) => ab.nested),
            );

            expect(result).toEqual(ascendingArrayNested);
        });

        it('should exist in every sort function', () => {
            const isInEvertSortFn = Object.values(sortFns).every((sortFn) => {
                return 'select' in sortFn;
            });

            expect(isInEvertSortFn).toBe(true);
        });
    });

    describe('ascending/smallToBig', () => {
        it('should be aliases', () => {
            expect(sortFns.ascending).toBe(sortFns.smallToBig);
        });

        it('should sort array from lowest to biggest', () => {
            const result = shuffledArray.toSorted(sortFns.ascending);

            expect(result).toEqual(ascendingArray);
        });

        it('should accept numbers and return number', () => {
            expectTypeOf(sortFns.ascending).parameter(0).toBeNumber();

            expectTypeOf(sortFns.ascending).parameter(1).toBeNumber();

            expectTypeOf(sortFns.ascending).returns.toBeNumber();
        });
    });

    describe('descending/bigToSmall', () => {
        it('should be aliases', () => {
            expect(sortFns.descending).toBe(sortFns.bigToSmall);
        });

        it('should sort array from biggest to lowest', () => {
            const result = shuffledArray.toSorted(sortFns.descending);

            expect(result).toEqual(descendingArray);
        });

        it('should accept numbers and return number', () => {
            expectTypeOf(sortFns.descending).parameter(0).toBeNumber();

            expectTypeOf(sortFns.descending).parameter(1).toBeNumber();

            expectTypeOf(sortFns.descending).returns.toBeNumber();
        });
    });
});