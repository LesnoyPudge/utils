import { AnyRecord } from "ts-essentials/dist/any-record";
import { pick } from "../../src";
import { MergeN, NonEmptyArray, Prettify, StrictOmit } from "ts-essentials";


export class TObject {
    static shallowClone<
        _Source extends AnyRecord
    >(
        source: _Source
    ): Prettify<_Source> {
        return Object.assign({}, source);
    }

    static pick = pick;

    static keys<
        _Source extends AnyRecord,
    >(
        source: _Source,
    ): keyof _Source {
        return Object.keys(source) as any;
    }

    static omit<
        _Source extends AnyRecord,
        _Keys extends keyof _Source,
    >(
        source: _Source,
        ...keys: NonEmptyArray<_Keys>
    ): Prettify<StrictOmit<_Source, _Keys>> {
        return (
            Object.keys(source)
                .filter((key) => !keys.includes(key))
                .reduce<any>((acc, cur) => {
                    acc[cur] = source[cur];
                    return acc;
                }, {})
        );
    }

    static shallowMerge<
        _Sources extends AnyRecord
    >(
        ...sources: [_Sources, _Sources, ..._Sources[]]
    ): MergeN<> {
        return Object.assign({}, ...sources) as any;
    }
}


type Some1 = {
    data: 'some';
    wow: 'no'
}

type Some2 = Pick<Some1, 'data'> & {
    extra: 5;
}

type Some3 = StrictOmit<Some1, 'data'>;

type Some4 = Some2 & Some3;

const qwe: Some4 = {
    data: "some",
    extra: 5,
    wow: "no",
};

const zxc1 = TObject.shallowClone(qwe)
const zxc2 = TObject.pick(qwe, 'data')
const zxc3 = TObject.shallowMerge({}, qwe, {})
