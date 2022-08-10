// IMPORTS
// Import element selectors and constants
import {
    BASE_API_URL,
    searchInputEl, 
    searchFormEl,  
    jobListSearchEl, 
    countEl,
    getData,
    state
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

// ------SEARCH COMPONENT------
// Request jobs matching a search term and display results
const searchHandler = async (e) => {
    e.preventDefault();
    // Get the search text
    const searchText = searchInputEl.value;
    
    // Validate the input with regex
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your search cannot contain number.');
        return;
    }

    // Manage UX while searching: erase, spin, and blur
    jobListSearchEl.innerHTML = '';
    searchInputEl.blur();
    renderSpinner('search');

    // Search for matching jobs, process the response, handle errors, and display results.
    try {
        // Request data and handle responses.
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
        console.log(data);
        const jobItems = data.jobItems; //get jobs
        console.log(jobItems, jobItems.length);
        // Manage UX. Display count. Write results to page & state.
        renderSpinner('search'); //spin
        countEl.innerText = jobItems.length; //count
        state.searchJobItems = jobItems; //update state of jobs
        state.currentPage = 1; //update state of page nbrs
        renderPaginationButtons(); //re-render page buttons
        renderJobList(); //write to page
    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }
} 
// Listen for search form submissions. Input 'submit' and the handler function (but do not invoke).
searchFormEl.addEventListener('submit', searchHandler);