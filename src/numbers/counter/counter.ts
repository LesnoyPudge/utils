


export const counter = (
    providedInitial = 0, 
    providedStep = 1
) => {
    let initial = providedInitial;
    let step = providedStep;
    let count = initial;
    
    const get = () => count;;
    const increase = (amount = step) => count = count + amount;
    const decrease = (amount = step) => count = count - amount;
    const reset = () => count = initial;
    const setCount = (amount: number) => count = amount;
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