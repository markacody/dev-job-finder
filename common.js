

// ------CONSTANTS------
export const BASE_API_URL = 'https://bytegrad.com/course-assets/js/2/api';
export const DEFAULT_DISPLAY_TIME = 3500;
export const MAX_RESULTS_PER_PAGE = 7;

// ------STATES------
// States can be managed with an object literal that contains named states defined initially as arrays, objects, or values.
export const state = {
    searchJobItems: [],
    bookmarkJobItems: [],
    activeJobItem: {},
    currentPage: 1
}

// ------UTILITY FUNCTIONS------
export const getData = async (completeUrl) => {
    const response = await fetch(completeUrl);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.description);
    }
    return data;
}; 

// ------PAGE ELEMENT SELECTORS------
// Select bookmark elements (2): btn and list
export const bookmarksBtnEl = document.querySelector('.bookmarks-btn');
export const jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
// Select form elements (2): form and input
export const searchFormEl = document.querySelector('.search');
export const searchInputEl = document.querySelector('.search__input'); 
// Select sort elements (3): parent, relevant, recent
export const sortingEl = document.querySelector('.sorting');
export const sortingBtnRelevantEl = document.querySelector('.sorting__button--relevant');
export const sortingBtnRecentEl = document.querySelector('.sorting__button--recent');
// Select job results element (1): nbr
export const countEl = document.querySelector('.count__number');
// Select job list elements (1): parent ul
export const jobListSearchEl = document.querySelector('.job-list--search');
// Select pagination elements (5): btn, prev/next page, prev/next nbr
export const paginationEl = document.querySelector('.pagination');
export const paginationBtnNextEl = document.querySelector('.pagination__button--next');
export const paginationBtnBackEl = document.querySelector('.pagination__button--back');
export const paginationNbrNextEl = document.querySelector('.pagination__number--next');
export const paginationNbrBackEl = document.querySelector('.pagination__number--back');
// Select job details elements (2): display block and contents
export const jobDetailsEl = document.querySelector('.job-details');
export const jobDetailsContentEl = document.querySelector('.job-details__content');
// Select error message elements (2): display block and text
export const errorEl = document.querySelector('.error');
export const errorTextEl = document.querySelector('.error__text');
// Select spinner elements (2): retrieve search results and retrieve job details.
export const spinnerSearchEl = document.querySelector('.spinner--search');
export const jobDetailsSpinnerEl = document.querySelector('.spinner--job-details');

