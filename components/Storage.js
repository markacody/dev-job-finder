// IMPORT
import {
    state
} from '../common.js';

// ------STORAGE COMPONENT------
// On load, update state with local storage

const storedJobItems = localStorage.getItem('bookmarkJobItems');
if (storedJobItems) {
    state.bookmarkJobItems = JSON.parse(storedJobItems);
}