export function relayEvent(event, customType, detail) {
    console.log('loaded')
    const relay = event.currentTarget;
    const customEvent = new CustomEvent(customType, {
        bubbles: true,
        composed: true,
        detail
    });
    relay.dispatchEvent(customEvent);
    event.stopPropagation();
}