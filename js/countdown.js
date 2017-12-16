// sadly, America's inferior date convention is required
const ORIENTATION_START_DATE = new Date('05/01/2018');

// returns 2 el array with indiv digits
const getDigits = (time) => {
  time += '';
  if (time.length == 1) time = '0' + time; // leftpad with zero if too short

  return time.split('')
}

const $ = document.querySelectorAll.bind(document); // let's pretend we loaded jQuery
const currDate = new Date( Date.now() );

const countdownSection = $('section.countdown')[0];
const digits = {};

['days', 'hours', 'minutes', 'seconds'].forEach((t) => {
  const els = $(`#${t} span`);
  digits[t] = Array.from(els)
})

let isCalled = false;
// updates digits every second once called
const updateDigits = (msElapsed = 0) => {
  const secondsDiff = (ORIENTATION_START_DATE.getTime() - currDate.getTime() - msElapsed) / 10;
  if (secondsDiff < 0){
      console.log(secondsDiff);
      countdownSection.remove()
  }

  const timeData = {
    seconds: secondsDiff,
  };

  Object.keys(timeData).forEach((t) => {
    timeData[t] = getDigits( Math.floor(timeData[t]) );
  })

  Object.keys(digits).forEach((timeInterval) => {
    digits[timeInterval].forEach((digit, idx) => {
      digit.textContent = timeData[timeInterval][idx];
    })
  })

  setTimeout(updateDigits.bind(null, msElapsed + 10), 10);
}

updateDigits();