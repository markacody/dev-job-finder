// IMPORTS
import {
    jobDetailsContentEl,
    getData,
    BASE_API_URL,
    state
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderError from './Error.js';
import renderJobDetails from './JobDetails.js';
import renderJobList from './JobList.js';

// ------ROUTER------
// Render job details given an incoming http request with job id contained in the url.
const loadHashChangeHandler = async () => {
    // Get the job id from the incoming url. Take all but the first character (#).
    const id = window.location.hash.substring(1);
    // If there is an id in the url, render the page.
    if (id) {
        // Unhighlight the currently active job. Use all to avoid possible failure after first find.
        document.querySelectorAll('.job-item--active').forEach(activeJob => activeJob.classList.remove('job-item--active'));
        // Remove current content if there and re-render the page
        jobDetailsContentEl.innerHTML = '';
        renderSpinner('.job-details'); //starts spinner
        try {
            // Request data and manage responses
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
            // Manage the UX and render job details.
            renderSpinner('job-details'); //removes spinner
            const job = data.jobItem; //extract job item
            state.activeJobItem = job; //update state of active job
            renderJobList(); //Re-render job list
            renderJobDetails(job);
        } catch(error) {
            renderSpinner('job-details');
            renderError(error.message);
        }
        // 
    }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler)