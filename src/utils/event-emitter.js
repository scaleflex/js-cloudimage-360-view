export class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  /**
   * @param {String} eventName 
   * @param {HTMLElement} listenerObj 
   * @param {Function} listenerFunc 
   */
  addListener(eventName, listenerObj, listenerFunc) {
    if (!this.isEventNameValid(eventName) || !listenerObj || typeof listenerFunc !== 'function') { throw new Error('bad parameters'); }
    const selectedListeners = this.getListenersByEventName(eventName);
    if (selectedListeners.includes(listenerObj)) { return; }

    listenerObj.addEventListener(eventName, listenerFunc)
    selectedListeners.push(listenerObj);
  }

  /**
   * @param {String} eventName 
   * @param {HTMLElement} listenerObj 
   * @param {Function} listenerFunc 
   */
  removeListener(eventName, listenerObj, listenerFunc) {
    if (!this.isEventNameValid(eventName) || !listenerObj) { throw new Error('bad parameters'); }
    if (!this.listeners[eventName]) { return; }

    listenerObj.removeEventListener(eventName, listenerFunc);
  }

  /**
   * @param {String} eventName 
   * @param {any} param 
   */
  emit(eventName, param = undefined) {
    if (!this.isEventNameValid(eventName)) { throw new Error('bad parameters'); }
    if (!this.listeners[eventName]) { return; }

    for (const listenerObj of this.listeners[eventName]) {
      listenerObj.dispatchEvent(new CustomEvent(eventName, { detail: param }));
    }
  }

  /**
   * @param {String} eventName 
   * @returns {[]}
   */
  getListenersByEventName(eventName) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    return this.listeners[eventName];
  }

  /**
  * @param {String} eventName 
  */
  isEventNameValid(eventName) {
    return typeof eventName === 'string' && eventName.trim() !== '';
  }
}