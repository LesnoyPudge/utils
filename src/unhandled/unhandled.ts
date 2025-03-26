


/**
 * Helps to prevent unhandled cases.
 *
 * Shows TypeScript error if provided value exists.
 */
export const unhandled = (
    shouldNotExist: never,
    message = 'Found unhandled variable:',
): never => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const _message = `${message} ${shouldNotExist}`;
    throw new Error(_message);
};