var ts = {};

$(function() {
   $(window).on("scroll", ts.updateAdVisibility);
});

ts.shouldDisplayAd = function() {
  var bounds = $(".footer-more-projects")[0].getBoundingClientRect();
  var winHeight = window.innerHeight;
  return (bounds.top - winHeight) > 0;
}

ts.updateAdVisibility = function() {
  if (ts.shouldDisplayAd()) {
    $(".ts-carbon-ad-container").removeClass("ts-carbon-ad-container-hidden");
  } else {
    if ($(".ts-carbon-ad-container").hasClass("ts-carbon-ad-container-hidden")) return;
    $(".ts-carbon-ad-container").addClass("ts-carbon-ad-container-hidden");
  }
}