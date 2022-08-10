// IMPORTS
import {
    spinnerSearchEl,
    jobDetailsSpinnerEl
} from '../common.js'

// ------SPINNER COMPONENT------
// Given an event trigger (for search or click request), display a spinner until the request completes.
const renderSpinner = (whichSpinner) => {
    const spinnerEl = whichSpinner === 'search' ? spinnerSearchEl : jobDetailsSpinnerEl;
    spinnerEl.classList.toggle('spinner--visible');

};

export default renderSpinner;