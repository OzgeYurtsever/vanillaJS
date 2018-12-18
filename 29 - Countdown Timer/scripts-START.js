let countDown = null;
const timerNode = document.querySelector('.display__time-left');
const endingTimeNode = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll(`[data-time]`);

function timer(seconds) {
  if (countDown) {
    clearInterval(countDown);
  }
  const now = Date.now();
  const timeEnd = now + seconds * 1000;
  displayTime(seconds);
  displayEndTime(timeEnd);
  countDown = setInterval(() => {
    const secondsLeft = Math.round((timeEnd - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
    } else {
      displayTime(secondsLeft);
    }
  }, 1000);
}

function displayTime(second) {
  const minutes = Math.floor(second / 60);
  const sec = second % 60;
  const timeToDisplay = `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  document.title = timeToDisplay;
  timerNode.textContent = timeToDisplay;
}

function displayEndTime(time) {
  let displayHour = new Date(time).getHours();
  let midDay = displayHour >= 12 && displayHour < 24 ? 'PM' : 'AM';
  displayHour = displayHour > 12 ? displayHour - 12 : displayHour;
  let displayMins = new Date(time).getMinutes();
  displayMins = displayMins >= 10 ? displayMins : `0${displayMins}`;

  endingTimeNode.textContent = `Be back @ ${displayHour}:${displayMins}${midDay}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = parseInt(this.minutes.value);
  if (mins) {
    timer(mins * 60);
  } else {
    return;
  }
});
