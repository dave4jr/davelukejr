var portfolio = {};
portfolio.minecraft = {};
portfolio.ml = {};

$(function() {
  app.loadAndFadeInImages();
  portfolio.minecraft.init();
  portfolio.ml.init();

  $(".case-item-minecraft").mouseenter(function(){
    if (portfolio.minecraft.isInMotion == true) return;
    portfolio.playMinecraftAnimationReverse(portfolio.minecraft.reverse);
  }).mouseleave(function() {
    if (portfolio.minecraft.isInMotion == true) return;
    portfolio.playMinecraftAnimationReverse(portfolio.minecraft.reverse);
  });

  $(window).on("scroll resize", portfolio.ml.onlyPlayIfVisible);
});

portfolio.ml.init = function() {
  // Wrap every letter in a span
  $('.case-item-ml-text-wrapper').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='case-item-header-ml-letter'>$&</span>"));
  });

  var mlAnimation = anime.timeline({loop: true})
    .add({
      targets: '.case-item-header-ml-letter',
      translateY: ["1.1em", 0],
      translateZ: 0,
      duration: 750,
      delay: function(el, i) {
        return 50 * i;
      }
    }).add({
      targets: '.case-item-header-ml-letter',
      opacity: 0,
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 750,
      delay: function(el, i) {
        return 200 + 50 * i;
      }
    });

  app.animations.track(mlAnimation, document.querySelector(".case-item-ml-text-wrapper"));
}

portfolio.minecraft.init = function() {
  portfolio.minecraft.interval = 40;
  portfolio.minecraft.reverse = false;
  portfolio.minecraft.isInMotion = false;
  portfolio.minecraft.block = $(".case-item-minecraft-block");
  portfolio.minecraft.frames = $(portfolio.minecraft.block).attr('data-frames');
  portfolio.minecraft.frameWidth = parseInt($(portfolio.minecraft.block).css("width"));
  portfolio.minecraft.frameHeight = parseInt($(portfolio.minecraft.block).css("height"));
  portfolio.minecraft.currentFrame = 20;
}

portfolio.playMinecraftAnimationReverse = function(reverse) {
  portfolio.minecraft.reverse = !portfolio.minecraft.reverse;
  portfolio.stopAnimation();
  // Flip direction
  portfolio.minecraft.currentFrame = portfolio.minecraft.frames - portfolio.minecraft.currentFrame;

  portfolio.minecraft.loop = setInterval ( () => {
    if (portfolio.minecraft.currentFrame + 1 >= portfolio.minecraft.frames) {
      portfolio.stopAnimation();
      return;
    }
    // Stop animation from reversing if it's more than 2/5 through completion (then just complete it)
    if (portfolio.minecraft.currentFrame > portfolio.minecraft.frames/5*2) portfolio.minecraft.isInMotion = true;

    portfolio.minecraft.currentFrame++;
    portfolio.setMinecraftFrameToInt(portfolio.minecraft.currentFrame, reverse);
  }, portfolio.minecraft.interval );
}

portfolio.setMinecraftFrameToInt = function(frame, reverse) {
  $(portfolio.minecraft.block)
    .css("background-position", 
      -frame*portfolio.minecraft.frameWidth + "px " + reverse*portfolio.minecraft.frameHeight + "px"
    );
}

portfolio.stopAnimation = function() {
  clearInterval(portfolio.minecraft.loop);
  portfolio.minecraft.isInMotion = false;
}