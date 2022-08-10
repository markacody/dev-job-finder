// IMPORTS
import {
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    state
} from '../common.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

// ------SORT COMPONENT------
// Sort jobs by recency or relevancy. If not on page 1, return user to page 1.
const clickHandler = (e) => {
    e.preventDefault();
    // Get clicked button
    const clickedBtnEl = e.target.closest('.sorting__button');
    // If no button clicked, stop function
    if (!clickedBtnEl) return;
    // Update current page and re-render pagination buttons.
    state.currentPage = 1;
    renderPaginationButtons();
    // Check if recency or relevancy
    const recent = clickedBtnEl.className.includes('--recent');
    // Sort
    if (recent) {
        state.searchJobItems.sort((a,b) => {
            return a.daysAgo - b.daysAgo;
        });
        sortingBtnRecentEl.classList.toggle('sorting__button--active');
        sortingBtnRelevantEl.classList.toggle('sorting__button--active');
    } else {
        state.searchJobItems.sort((a,b) => {
            return b.relevanceScore - a.relevanceScore;
        });
        sortingBtnRecentEl.classList.toggle('sorting__button--active');
        sortingBtnRelevantEl.classList.toggle('sorting__button--active');
    }
    // Render list 
    renderJobList();
};
sortingEl.addEventListener('click', clickHandler);

// EXPORTS
// No statement needed.