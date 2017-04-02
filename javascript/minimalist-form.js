(function() {
  var inputWraps = document.querySelectorAll('.c-mini-form__input-wrap');
  var inputFields = document.querySelectorAll('.c-mini-form__input');
  var inputFieldsArr = [].slice.call(inputFields);
  var nextBtns = document.querySelectorAll('.c-mini-form__btn--next');
  var nextBtnsArr = [].slice.call(nextBtns);
  var toFirstBtn = document.querySelector('.c-mini-form__btn--back');
  var submitBtn = document.querySelector('.c-mini-form__submit-btn');
  var currentCardIndex = 0;
  var i;

  function checkValidation() {
    var index = inputFieldsArr.indexOf(this);
    var inputToCheck = inputFields[index];
    if (inputToCheck.checkValidity()) {
      inputWraps[index].classList.remove('is-invalid');
      return true;
    } else {
      inputWraps[index].classList.add('is-invalid');
      return false;
    }
  }

  function fadeIn(ele) {
    ele.style.animationName = 'rollToRight';
    ele.classList.add('is-active');
    ele.querySelector('.c-mini-form__input-inner').style.animationName ='bgChange';
    ele.querySelector('.c-mini-form__btn--prev').style.visibility = 'visible';
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

        // update currentCardIndex with the next card's index
        currentCardIndex = index + 1;
      }
    });

    inputWraps[index + 1].querySelector('.c-mini-form__btn--prev').addEventListener('click', function() {
      goBack(index);
    });
  }

  function goBack(index) {
    if (currentCardIndex > index) {
      inputWraps[currentCardIndex].style.animationName = 'rollToLeft';
      inputWraps[currentCardIndex].classList.remove('is-active');
      inputWraps[currentCardIndex].querySelector('.c-mini-form__input-inner').style.animationName = '';
      inputWraps[currentCardIndex].querySelector('.c-mini-form__btn--prev').style.visibility = 'hidden';
      inputWraps[--currentCardIndex].classList.add('is-active');
      inputWraps[currentCardIndex].querySelector('.c-mini-form__input-inner').style.animationName = '';
      window.setTimeout(function() {
        goBack(index);
      }, 500);
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

  for (i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener('keyup', checkValidation);
  }

  addListenerToBtns();

  toFirstBtn.addEventListener('click', function() {
    goBack(0);
  });

  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
  });

})();