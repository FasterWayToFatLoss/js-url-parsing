function getReferralID() {

	var extractedReferralID = "";
  
	// Get url param aid if exists
  var urlParams = new URLSearchParams(window.location.search);
  var aid = urlParams.get('aid');
    
  // Get anchor # if exists
  var currentUrl = window.location.href;
  var url = new URL(currentUrl);
  var anchorValue = url.hash;
  if (anchorValue.startsWith('#')) {
      anchorValue = anchorValue.substring(1);
  }
  
  if(aid) {
  	extractedReferralID = aid;
  } else if(anchorValue) {
  	extractedReferralID = anchorValue;
  }
  
  return extractedReferralID;
}