//import { singles, doubles, trebles, oneDartScores } from "/data.js";

const finishInput = document.getElementById("finish");
const submit = document.getElementById("submit-finish");
const errorMessage = document.getElementById("error-message");

const selectedFinish = document.querySelector(".selected-finish");
const threeDartFinishesSection = document.getElementById("three-dart-finishes");
const twoDartFinishesSection = document.getElementById("two-dart-finishes");
const oneDartFinishesSection = document.getElementById("one-dart-finishes");
const oneDartFinishesDiv = document.getElementById("one-dart-finishes-div");
const twoDartFinishesDiv = document.getElementById("two-dart-finishes-div");
const threeDartFinishesDiv = document.getElementById("three-dart-finishes-div");

// event listener on the button
submit.addEventListener("click", function (e) {
  e.preventDefault();

  // get the users finish and turn it to a number
  const number = parseInt(finishInput.value);

  // clear existing data from the input box, selected finish and the finishes sections
  finishInput.value = "";
  selectedFinish.textContent = "";
  threeDartFinishesSection.style.display = "none";
  twoDartFinishesSection.style.display = "none";
  oneDartFinishesSection.style.display = "none";
  threeDartFinishesDiv.innerHTML = "";
  twoDartFinishesDiv.innerHTML = "";
  oneDartFinishesDiv.innerHTML = "";

  // deal with numbers under 2, over 170 and bogey numbers
  if (number < 2) {
    errorMessage.textContent = "finish must be bigger than 1";
    finishInput.value = "";
    setTimeout(clearErrorMessage, 3000);
  } else if (number > 170) {
    errorMessage.textContent = "cannot finish over 170";
    finishInput.value = "";
    setTimeout(clearErrorMessage, 3000);
  } else if (
    number === 159 ||
    number === 162 ||
    number === 163 ||
    number === 165 ||
    number === 166 ||
    number === 168 ||
    number === 169
  ) {
    errorMessage.textContent = `cannot finish ${number}`;
    finishInput.value = "";
    setTimeout(clearErrorMessage, 3000);
  }

  // if a valid number call relevant finish method/s
  else if (number <= 40 && number % 2 === 0) {
    getOneDoubleFinish(number);
  } else if (
    number <= 39 ||
    (number > 40 && number < 50) ||
    (number > 50 && number < 61) ||
    number === 50
  ) {
    getOneDoubleFinish(number);
    getOneSingleOneDoubleFinish(number);
    getTwoDoubleFinish(number);
  } else if ((number >= 60 && number < 99) || number === 100) {
    getOneSingleOneDoubleFinish(number);
    getOneTrebleOneDoubleFinish(number);
    getOneSingleOneTrebleOneDoubleFinish(number);
    getTwoDoubleFinish(number);
    getTwoSingleOneDoubleFinish(number);
  } else if (number === 99 || number > 100) {
    getOneTrebleOneDoubleFinish(number);
    getOneSingleOneTrebleOneDoubleFinish(number);
    getTwoTrebleOneDoubleFinish(number);
    getOneSingleTwoDoubleFinish(number);
    getOneTrebleTwoDoubleFinish(number);
    getThreeDoubleFinish(number);
  }
});

function clearErrorMessage() {
  errorMessage.textContent = "";
}

// get 1 dart finish
function getOneDoubleFinish(number) {
  doubles.forEach(function (double) {
    if (number === double) {
      selectedFinish.textContent = number;
      oneDartFinishesSection.style.display = "block";
      oneDartFinishesDiv.innerHTML += `<div class="finish-method">
                <p class="dart-targets"><span>D${number / 2}</span></p>
                <p class="target-points"><span>${number}</span></p>
              </div>`;
    }
  });
}

// get 2 dart finishes
// 1 single and 1 double
function getOneSingleOneDoubleFinish(number) {
  doubles.forEach(function (double) {
    const remainder = number - double;

    singles.forEach(function (single) {
      if (single === remainder) {
        selectedFinish.textContent = number;
        twoDartFinishesSection.style.display = "block";
        twoDartFinishesDiv.innerHTML += `<div class="finish-method">
                <p class="dart-targets"><span>S${single}</span> <span>D${
          double / 2
        }</span></p>
                <p class="target-points"><span>${single}</span> <span>${double}</span></p>
              </div>`;
      }
    });
  });
}

// 1 treble and 1 double
function getOneTrebleOneDoubleFinish(number) {
  doubles.forEach(function (double) {
    const remainder = number - double;

    trebles.forEach(function (treble) {
      if (treble === remainder) {
        selectedFinish.textContent = number;
        twoDartFinishesSection.style.display = "block";
        twoDartFinishesDiv.innerHTML += `<div class="finish-method">
                <p class="dart-targets"><span>T${treble / 3}</span> <span>D${
          double / 2
        }</span></p>
                <p class="target-points"><span>${treble}</span> <span>${double}</span></p>
              </div>`;
      }
    });
  });
}

// 2 doubles
function getTwoDoubleFinish(number) {
  doubles.forEach(function (double) {
    const remainder = number - double;

    doubles.forEach(function (double2) {
      if (double2 === remainder) {
        selectedFinish.textContent = number;
        twoDartFinishesSection.style.display = "block";
        twoDartFinishesDiv.innerHTML += `<div class="finish-method">
                <p class="dart-targets"><span>D${double2 / 2}</span> <span>D${
          double / 2
        }</span></p>
                <p class="target-points"><span>${double2}</span> <span>${double}</span></p>
              </div>`;
      }
    });
  });
}
// get 3 dart finishes
// 2 singles and 1 double
function getTwoSingleOneDoubleFinish(number) {
  doubles.forEach(function (double) {
    const remainder = number - double;

    singles.forEach(function (single) {
      const remainderAfterSingle = remainder - single;

      singles.forEach(function (single2) {
        if (single2 === remainderAfterSingle) {
          selectedFinish.textContent = number;
          threeDartFinishesSection.style.display = "block";
          threeDartFinishesDiv.innerHTML += `<div class="finish-method">
              <p class="dart-targets"><span>S${single}</span> <span>S${single2}</span> <span>D${
            double / 2
          }</span></p>
              <p class="target-points"><span>${single}</span> <span>${single2}</span> <span>${double}</span></p>
            </div>`;
        }
      });
    });
  });
}
// 1 single 1 treble and 1 double
function getOneSingleOneTrebleOneDoubleFinish(number) {
  doubles.forEach(function (double) {
    const remainder = number - double;

    trebles.forEach(function (treble) {
      const remainderAfterTreble = number - double - treble;

      singles.forEach(function (single) {
        if (remainderAfterTreble === single) {
          selectedFinish.textContent = number;
          threeDartFinishesSection.style.display = "block";
          threeDartFinishesDiv.innerHTML += `<div class="finish-method">
              <p class="dart-targets"><span>T${
                treble / 3
              }</span> <span>S${single}</span> <span>D${double / 2}</span></p>
              <p class="target-points"><span>${treble}</span> <span>${single}</span> <span>${double}</span></p>
            </div>`;
        }
      });
    });
  });
}
// 2 trebles and 1 double
function getTwoTrebleOneDoubleFinish(number) {
  doubles.forEach(function (double) {
    const remainder = number - double;

    trebles.forEach(function (treble) {
      const remainderAfterTreble = remainder - treble;

      trebles.forEach(function (treble2) {
        if (remainderAfterTreble === treble2) {
          selectedFinish.textContent = number;
          threeDartFinishesSection.style.display = "block";
          threeDartFinishesDiv.innerHTML += `<div class="finish-method">
              <p class="dart-targets"><span>T${treble / 3}</span> <span>T${
            treble2 / 3
          }</span> <span>D${double / 2}</span></p>
              <p class="target-points"><span>${treble}</span> <span>${treble2}</span> <span>${double}</span></p>
            </div>`;
        }
      });
    });
  });
}
// 1 single and 2 doubles
function getOneSingleTwoDoubleFinish(number) {
  doubles.forEach(function (double) {
    const remainder = number - double;

    doubles.forEach(function (double2) {
      const remainderAfterDouble = remainder - double2;

      singles.forEach(function (single) {
        if (remainderAfterDouble === single) {
          selectedFinish.textContent = number;
          threeDartFinishesSection.style.display = "block";
          threeDartFinishesDiv.innerHTML += `<div class="finish-method">
              <p class="dart-targets"><span>S${single}</span> <span>D${
            double2 / 2
          }</span> <span>D${double / 2}</span></p>
              <p class="target-points"><span>${single}</span> <span>${double2}</span> <span>${double}</span></p>
            </div>`;
        }
      });
    });
  });
}
// 1 treble and 2 doubles
function getOneTrebleTwoDoubleFinish(number) {
  doubles.forEach(function (double) {
    const remainder = number - double;

    doubles.forEach(function (double2) {
      const remainderAfterDouble = remainder - double2;

      trebles.forEach(function (treble) {
        if (remainderAfterDouble === treble) {
          selectedFinish.textContent = number;
          threeDartFinishesSection.style.display = "block";
          threeDartFinishesDiv.innerHTML += `<div class="finish-method">
              <p class="dart-targets"><span>T${treble / 3}</span> <span>D${
            double2 / 2
          }</span> <span>D${double / 2}</span></p>
              <p class="target-points"><span>${treble}</span> <span>${double2}</span> <span>${double}</span></p>
            </div>`;
        }
      });
    });
  });
}
// 3 doubles
function getThreeDoubleFinish(number) {
  doubles.forEach(function (double) {
    const remainder = number - double;

    doubles.forEach(function (double2) {
      const remainderAfterDouble = remainder - double2;

      doubles.forEach(function (double3) {
        if (remainderAfterDouble === double3) {
          selectedFinish.textContent = number;
          threeDartFinishesSection.style.display = "block";
          threeDartFinishesDiv.innerHTML += `<div class="finish-method">
              <p class="dart-targets"><span>D${double2 / 2}</span> <span>D${
            double3 / 2
          }</span> <span>D${double / 2}</span></p>
              <p class="target-points"><span>${double2}</span> <span>${double3}</span> <span>${double}</span></p>
            </div>`;
        }
      });
    });
  });
}
