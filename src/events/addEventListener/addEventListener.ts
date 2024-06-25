import { removeEventListener } from '@root';



type ElementUnion = HTMLElement | Document | Window;

type AvailableEventNames<ProvidedElement extends ElementUnion> = (
    ProvidedElement extends Document
        ? DocumentEventMap
        : ProvidedElement extends Window
            ? WindowEventMap
            : ProvidedElement extends HTMLElement
                ? HTMLElementEventMap
                : never
);

type AddEventListener = <
    ProvidedElement extends ElementUnion,
    EventName extends keyof AvailableEventNames<ProvidedElement>,
>(
    element: ProvidedElement,
    eventName: EventName,
    fn: (e: AvailableEventNames<ProvidedElement>[EventName]) => void
) => () => void;

export const addEventListener: AddEventListener = (
    element,
    eventName,
    fn,
) => {
    element.addEventListener(String(eventName), fn as EventListener);

    return () => removeEventListener(element, eventName, fn);
};