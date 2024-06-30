import { eslintConfigBase } from '@lesnoypudge/eslint-base-config';



export default [
    ...eslintConfigBase,
    {
        rules: {
            '@typescript-eslint/consistent-indexed-object-style': 'off',
        },
    }
];