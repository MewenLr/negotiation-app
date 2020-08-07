/**
 * @param eventFn - The variable to store the event function of a directive
*/

type TEventDirective = HTMLElement & {
  eventFn?: EventListenerOrEventListenerObject;
}

export default TEventDirective
