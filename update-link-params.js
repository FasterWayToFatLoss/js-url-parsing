// Function to update all links on the page
function updateLinksWithQueryString() {
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
    // Parse the link's URL
    var linkUrl = new URL(link.href);

    // Get the query string parameters of the link as a URLSearchParams object
    var linkParams = new URLSearchParams(linkUrl.search);

    // Merge or replace parameters from the current URL into the link's parameters
    currentParams.forEach(function(value, key) {
      linkParams.set(key, value); // Replace or add the parameter
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
