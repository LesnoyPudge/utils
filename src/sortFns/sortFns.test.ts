import { sortFns } from './sortFns';



const shuffledArray = [4, 2, 5, 1, 3, 3];
const ascendingArray = [1, 2, 3, 3, 4, 5];
const descendingArray = [5, 4, 3, 3, 2, 1];

describe('sortFns', () => {
    describe('ascending', () => {
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
    describe('descending', () => {
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