// IMPORTS
// Import element selectors and constants
import {
    BASE_API_URL,
    MAX_RESULTS_PER_PAGE,
    getData,
    jobDetailsContentEl, 
    jobListSearchEl,
    state,
    jobListBookmarksEl
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';

// ------RENDER JOB LIST------
// Given an array of jobs, display job titles in a list.
const renderJobList = (whichJobList = 'search') => {
    // Determine the appropriate selector: search or bookmarks
    const jobListEl = whichJobList === 'search' ? jobListSearchEl: jobListBookmarksEl;
    // Remove current list to prevent stacking on the UI.
    jobListEl.innerHTML = ''; 
    // Determine the appropriate job items to be rendered: search or bookmarks and define the two options in if/else blocks
    let jobItems;
    if (whichJobList === 'search') {
        jobItems = state.searchJobItems.slice(state.currentPage * MAX_RESULTS_PER_PAGE - MAX_RESULTS_PER_PAGE, state.currentPage * MAX_RESULTS_PER_PAGE);
    } else if (whichJobList === 'bookmarks') {
        jobItems = state.bookmarkJobItems;
    }
    // Read from state and display list
    jobItems.forEach(job => {
        // Define the list element and inject data
        const newJobItemHTML = `
            <li class="job-item ${state.activeJobItem.id === job.id ? 'job-item--active' : ''}">
                <a class="job-item__link" href="${job.id}">
                    <div class="job-item__badge">${job.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading">${job.title}</h3>
                        <p class="job-item__company">${job.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${job.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${job.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${job.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === job.id)? 'job-item__bookmark-icon--bookmarked':''}"></i>
                        <time class="job-item__time">${job.daysAgo}d</time>
                    </div>
                </a>
            </li>`;
        // Insert job into list
        jobListEl.insertAdjacentHTML('beforeend', newJobItemHTML)
    });
};

// ------JOB LIST COMPONENT------
// Listens for clicks on job item and bookmark.
const clickHandler = async (e) => {
    // Prevent navigation because click is on anchor tag
    e.preventDefault();
    // Get ID of job, highlight job in list, erase prior contents of pane, show spinner, get ID of job item and display details in pane.
    // Get ID of job
    const selectedJobEl = e.target.closest('.job-item');
    const id = selectedJobEl.children[0].getAttribute('href');
    // Remove existing highlight; then re-render job list (below)
    document.querySelectorAll('.job-item--active').forEach(job => job.classList.remove('job-item--active'));   
    // Erase prior contents in job details pane
    jobDetailsContentEl.innerHTML = '';
    // Add job id to url
    history.pushState(null, '', `/#${id}`);
    // Render spinner in job details pane
    renderSpinner('job-details');
    // Update state with active job. Look in all places (bookmarks and search) to ensure it works prior to search.
    const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
    state.activeJobItem = allJobItems.find(jobItem => jobItem.id === +id);
    // Re-render job list
    renderJobList();

    // Request selected job data
    try {
        // Request data and manage responses
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);
        // Manage the UX and render job details.
        renderSpinner('job-details');
        const job = data.jobItem;
        renderJobDetails(job);
    } catch(error) {
        renderSpinner('job-details');
        renderError(error.message);
    }
}
jobListSearchEl.addEventListener('click', clickHandler);
jobListBookmarksEl.addEventListener('click', clickHandler);

// EXPORTS
export default renderJobList;