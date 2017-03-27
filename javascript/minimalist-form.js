(function() {
  var inputWraps = document.querySelectorAll('.c-mini-form__input-wrap');
  var nextBtns = document.querySelectorAll('.c-mini-form__btn--next');
  var nextBtnsArr = [].slice.call(nextBtns);
  var prevBtn = document.querySelector('.c-mini-form__btn--prev');
  var submitBtn = document.querySelector('.c-mini-form__submit-btn');
  var zIndex = 1;
  var currentIndex = 0;
  var i;


  function fadeIn(ele) {
    ele.style.animationName = 'fadeIn';
    ele.classList.add('c-mini-form--active');
  }

  function fadeOut(ele) {
    ele.style.animationName = 'moveToBack';
    ele.classList.remove('c-mini-form--active');
  }

  function goNext(btn) {
    var index = nextBtnsArr.indexOf(btn);

    btn.addEventListener('click', function() {
      // next card fade in - outer input wraps fadeIn & add active class
      fadeIn(inputWraps[index]);

      // increase z-index of the next card
      inputWraps[index].style.zIndex = zIndex;
      zIndex++;

      fadeOut(inputWraps[index + 1]);
      inputWraps[index + 1].style.animationDelay = '0s';
    });
  }

  function backToFirst() {
    inputWraps[currentIndex].style.zIndex = 0;
    if (currentIndex + 1 < inputWraps.length) {
      fadeOut(inputWraps[currentIndex]);
      fadeIn(inputWraps[++currentIndex]);
      window.setTimeout(backToFirst, 75);
    } else {
      currentIndex = 0;
      zIndex = 1;
    }
  }


  function addListenerToBtns() {
    for (i = 0; i < nextBtns.length; i++) {
      goNext(nextBtns[i]);
    }
  }

  for (i = 0; i < inputWraps.length; i++) {
    inputWraps[i].style.top = 0.45 * i + 'em';
    inputWraps[i].style.left = 0.45 * i + 'em';
  }

  addListenerToBtns();

  prevBtn.addEventListener('click', backToFirst);

  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
  });

})();