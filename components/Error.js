// IMPORTS
import {
    DEFAULT_DISPLAY_TIME,
    errorTextEl,
    errorEl
} from '../common.js';

// ------ERROR COMPONENT------
// Given an incoming message, display it for 3.5 seconds in the error component. Default should be "something went wrong". This abstraction enables you to specify the message in context with the call. 
const renderError = (message = 'Something went wrong.') => {
    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(() => {
        errorEl.classList.remove('error--visible')
    }, DEFAULT_DISPLAY_TIME);
}

export default renderError;