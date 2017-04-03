(function() {
  var inputWraps = document.querySelectorAll('.c-mini-form__input-wrap');
  var inputFields = document.querySelectorAll('.c-mini-form__input');
  var inputFieldsArr = [].slice.call(inputFields);
  var nextBtns = document.querySelectorAll('.c-mini-form__btn--next');
  var nextBtnsArr = [].slice.call(nextBtns);
  var prevBtns = document.querySelectorAll('.c-mini-form__btn--prev');
  var toFirstBtn = document.querySelector('.c-mini-form__btn--back');
  var submitBtn = document.querySelector('.c-mini-form__submit-btn');
  var submitCardInner = document.querySelector('.c-mini-form__submit').querySelector('.c-mini-form__input-inner');
  var currentCardIndex = 0;
  var i;

  function checkValidation() {
    var index = inputFieldsArr.indexOf(this);
    var inputToCheck = inputFields[index];
    var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (inputToCheck.type === 'email') {
      if (validEmail.test(inputToCheck.value)) {
        inputWraps[index].classList.remove('is-invalid');
        return true;
      } else {
        inputWraps[index].classList.add('is-invalid');
        return false;
      }
    } else {
      if (inputToCheck.checkValidity()) {
        inputWraps[index].classList.remove('is-invalid');
        return true;
      } else {
        inputWraps[index].classList.add('is-invalid');
        return false;
      }
    }
  }

  function fadeIn(ele) {
    ele.style.animationName = 'expandToRight';
    ele.classList.add('is-active');
    ele.querySelector('.c-mini-form__input-inner').style.animationName ='bgChange';
  }

  function fadeOut(ele) {
    ele.querySelector('.c-mini-form__input-inner').style.animationName ='fadeOut';
    ele.classList.remove('is-active');
  }

  function goNext(btn) {
    var index = nextBtnsArr.indexOf(btn);

    btn.addEventListener('click', function() {
      if (checkValidation.apply(inputFields[index])) {
        // current card fades out
        fadeOut(inputWraps[index]);

        // next card fades in
        fadeIn(inputWraps[index + 1]);
        prevBtns[index].style.visibility = 'visible';
        prevBtns[index].style.transitionDelay = '1s, 0s';

        // update currentCardIndex with the next card's index
        currentCardIndex = index + 1;
      }
    });

    // prevBtns[index].style.visibility = 'visible';
    prevBtns[index].addEventListener('click', function() {
      goBack(index);
    });
  }



  function goBack(index) {
    if (currentCardIndex > index) { // not the first input card
      // current card: roll back to left, remove active class
      inputWraps[currentCardIndex].style.animationName = 'rollToLeft';
      inputWraps[currentCardIndex].classList.remove('is-active');
      // current inner wrap: remove animation
      inputWraps[currentCardIndex].querySelector('.c-mini-form__input-inner').style.animationName = '';
      // hide indicator (prev btn)
      prevBtns[currentCardIndex - 1].style.visibility = 'hidden';
      prevBtns[currentCardIndex - 1].style.transitionDelay = '0s, 0s';

      // next card: add active class, remove animation of inner wrap
      inputWraps[--currentCardIndex].classList.add('is-active');
      inputWraps[currentCardIndex].querySelector('.c-mini-form__input-inner').style.animationName = 'bgChange';

      window.setTimeout(function() {
        goBack(index);
      }, 250);
    }
  }

  function addListenerToBtns() {
    for (i = 0; i < nextBtns.length; i++) {
      goNext(nextBtns[i]);
    }
  }

  for (i = 0; i < inputWraps.length; i++) {
    inputWraps[i].style.left = 0.5 * (inputWraps.length - 1 - i) + 'em';
  }

  for (i = 0; i <prevBtns.length; i++) {
    var leftDistance = (0.5 * (prevBtns.length - 1 - i) + 19.5) + 'em';
    prevBtns[i].style.left = 'calc(' + leftDistance + ' - 4px)';
  }

  for (i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener('keyup', checkValidation);
  }

  addListenerToBtns();

  toFirstBtn.addEventListener('click', function() {
    goBack(0);
  });

  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    submitCardInner.style.animationName = '';
    submitCardInner.innerHTML = 'Thank you for subscribing';

    // hide all indicators
    for (i = 0; i < prevBtns.length; i++) {
      prevBtns[i].style.visibility = 'hidden';
      prevBtns[i].style.transitionDelay = '0s';
      inputWraps[i + 1].style.borderRightColor = 'transparent';
      inputWraps[i + 1].style.transition = 'all 0s 0s';
    }
  });

})();