  document.addEventListener("DOMContentLoaded", function() {
    // Get the current URL parameters
    var urlParams = new URLSearchParams(window.location.search);

    // Extract specific UTM parameters
    var utmSource = urlParams.get('utm_source');
    var utmMedium = urlParams.get('utm_medium');
    var utmCampaign = urlParams.get('utm_campaign');

    // If no UTMs present, don't modify links
    if (utmSource || utmMedium || utmCampaign) {

      // Get all links on the page
      var allLinks = document.querySelectorAll('a');

      // Iterate through each link and check if the URL contains "fasterway.samcart.com"
      allLinks.forEach(function(link) {
        var href = link.getAttribute('href');

        // Check if the link contains the specified domain
        if (href && href.indexOf('fasterway.samcart.com') !== -1) {
          // Check if the link already has a query string
          if (href.indexOf('?') !== -1) {
            // If it does, append the specific UTM parameters if they don't exist in the link
            if (!href.includes('utm_source=')) {
              href += '&utm_source=' + encodeURIComponent(utmSource);
            }

            if (!href.includes('utm_medium=')) {
              href += '&utm_medium=' + encodeURIComponent(utmMedium);
            }

            if (!href.includes('utm_campaign=')) {
              href += '&utm_campaign=' + encodeURIComponent(utmCampaign);
            }

            link.setAttribute('href', href);
          } else {
            // If not, append the specific UTM parameters with "?"
            var utmQueryString = '';

            if (utmSource) {
              utmQueryString += '&utm_source=' + encodeURIComponent(utmSource);
            }

            if (utmMedium) {
              utmQueryString += '&utm_medium=' + encodeURIComponent(utmMedium);
            }

            if (utmCampaign) {
              utmQueryString += '&utm_campaign=' + encodeURIComponent(utmCampaign);
            }

            link.setAttribute('href', href + (utmQueryString ? '?' + utmQueryString.substring(1) : ''));
          }
        }
      });
    }
  });