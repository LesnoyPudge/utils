


export const counter = (
    providedInitial = 0, 
    providedStep = 1
) => {
    let initial = providedInitial;
    let step = providedStep;
    let count = initial;
    
    const get = () => count;
    const setCount = (amount: number) => count = amount;
    const increase = (amount = step) => setCount(count + amount);
    const decrease = (amount = step) => setCount(count - amount);
    const reset = () => setCount(initial);
    const setInitial = (newInitial: number) => initial = newInitial;
    const setStep = (newStep: number) => step = newStep;

    return {
        get,
        increase,
        decrease,
        reset,
        setCount,
        setInitial,
        setStep,
        inc: increase,
        dec: decrease,
    }
}