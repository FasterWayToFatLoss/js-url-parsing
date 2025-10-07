// Function to update all links on the page
function updateLinksWithQueryString() {

  // --- Parameters to EXCLUDE from the merge process ---
  // GA4/GA360 Linker: _gl (Global Linker)
  // Google Click IDs: _gcl_au (AdWords), _gclid (Google Ads), _gcl_aw, etc.
  // Legacy GA (just in case): _ga
  const GA_EXCLUDE_PARAMS = ['_gl', '_ga', '_gclid', '_gcl_au', '_gcl_aw', 'gclid'];

  // Get the current page's URL
  var currentUrl = window.location.href;

  // Extract the query string and hash from the current URL
  var queryString = window.location.search; // Includes the "?" and everything after it
  var hash = window.location.hash; // Includes the "#" and everything after it

  // Convert the current URL's query string into a URLSearchParams object
  var currentParams = new URLSearchParams(queryString);

  // If a hash exists, convert it to a query string parameter 'aid'
  if (hash) {
    currentParams.set('aid', hash.substring(1)); // Add or update the 'aid' parameter
    hash = ''; // Clear the hash since we've converted it to a query string parameter
  }

  // Get all links on the page
  var links = document.querySelectorAll('a[href]');

  // Iterate through each link
  links.forEach(function(link) {

    // Skip links with href="#" or href="#somevalue"
    if (link.getAttribute('href').startsWith('#')) {
        return;
      }
      
    // Parse the link's URL
    var linkUrl = new URL(link.href);

    // Get the query string parameters of the link as a URLSearchParams object
    var linkParams = new URLSearchParams(linkUrl.search);

    // Merge or replace parameters from the current URL into the link's parameters; skip GA params
    currentParams.forEach(function(value, key) {
      // Skip the parameter if it is on the exclusion list
      if (!GA_EXCLUDE_PARAMS.includes(key)) {
        linkParams.set(key, value); // Merge/replace the parameter
      }
    });

    // Update the link's search parameters
    linkUrl.search = linkParams.toString();

    // Update the link's href with the modified URL
    link.href = linkUrl.toString();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  // Call the function to update all links with query string values
  updateLinksWithQueryString();
});
