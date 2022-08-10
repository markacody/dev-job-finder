// IMPORTS
import {
    state,
    paginationEl,
    paginationBtnNextEl,
    paginationBtnBackEl,
    paginationNbrNextEl,
    paginationNbrBackEl,
    MAX_RESULTS_PER_PAGE
} from '../common.js';
import renderJobList from './JobList.js';

// ------PAGINATION COMPONENT------
// Listen for button clicks
const renderPaginationButtons = () => {
        // Manage Back button visibility.
        if (state.currentPage > 1) {
            paginationBtnBackEl.classList.remove('pagination__button--hidden')
        } else {
            paginationBtnBackEl.classList.add('pagination__button--hidden')
        }
        if (state.currentPage * MAX_RESULTS_PER_PAGE >= state.searchJobItems.length) {
            paginationBtnNextEl.classList.add('pagination__button--hidden')
        } else {
            paginationBtnNextEl.classList.remove('pagination__button--hidden')
        }
        // Update button numbers.
        paginationNbrBackEl.textContent = state.currentPage -1;
        paginationNbrNextEl.textContent = state.currentPage +1;
        // Unfocus the buttons.
        paginationBtnBackEl.blur();
        paginationBtnNextEl.blur();
};
const clickHandler = (e) => {
    e.preventDefault();
    // Get button that was clicked. If none, return. 
    const clickedBtnEl = e.target.closest('.pagination__button');
    if (!clickedBtnEl) return; 
    const nextPage = clickedBtnEl.className.includes('--next') ? true : false;
    // Is it next or back? Update state and render list
    nextPage ? state.currentPage++ : state.currentPage--;
    renderJobList();
    renderPaginationButtons();
};
paginationEl.addEventListener('click',clickHandler);

// EXPORTS
// Rendering buttons is needed in Sorting.js
export default renderPaginationButtons;