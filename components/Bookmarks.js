// IMPORTS
import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';
import renderJobList from './JobList.js';

// ------BOOKMARKS COMPONENT------
// On mouseover bookmarks, display list. On mouseleave, disappear list.
const mouseEnterHandler = (e) => {
    // Manage UX: highlight the bookmark button
    bookmarksBtnEl.classList.add('bookmarks-btn--active');
    // Make job list visible
    jobListBookmarksEl.classList.add('job-list--visible');
    // Render job list
    renderJobList('bookmarks');

};
const mouseLeaveHandler = (e) => {
    // Manage UX: dim the bookmark button
    bookmarksBtnEl.classList.remove('bookmarks-btn--active');
    // Make job list invisible
    jobListBookmarksEl.classList.remove('job-list--visible');
};
const clickHandler = (e) => {
    e.preventDefault();
    // Detect click target and return if not bookmark
    if (!e.target.className.includes('bookmark')) return;
    // Update state: push job to bookmarks or remove/filter (unbookmark)
    if (state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === state.activeJobItem.id)) {
        // If true, remove job from bookmarks (using filter)
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobItem => bookmarkJobItem.id !== state.activeJobItem.id);
    } else {
        // Update state with new bookmark.
        state.bookmarkJobItems.push(state.activeJobItem);
        // Persist in local storage: input key value pair and stringify. Read from state, the single source of truth.
        window.localStorage.setItem('bookmarkJobItems', JSON.stringify(state.bookmarkJobItems));
    }
    // Update bookmark. NOTE: does not exist initially, so must be selected now
    document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');
    
    // Render search job list
    renderJobList();
};

bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);
jobDetailsEl.addEventListener('click', clickHandler);
// EXPORTS