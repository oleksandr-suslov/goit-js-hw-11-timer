// "use strict";

const refs = {
  day: document.querySelector(`.value[data-value="days"]`),
  hour: document.querySelector(`.value[data-value="hours"]`),
  min: document.querySelector(`.value[data-value="mins"]`),
  sec: document.querySelector(`.value[data-value="secs"]`),
  timerSet: document.querySelector(`#timer-1`),
};


class CountdownTimer {
  constructor({
    targetDate,
    onTick,
  }) {
    this.onTick = onTick;
    this.targetDate = targetDate;
    this.interval = null;
  };
  start() {
    this.interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
      this.timeFinish(deltaTime);
    }, 1000);
  };
  
  timeFinish(t) {
    if (t < 0) {
              clearInterval(this.interval);
              refs.timerSet.textContent = "Finish!";
    };
  };
  
  pad(value) {
    return String(value).padStart(2, '0');
  };
  
  getTimeComponents(times) {
    const days = this.pad(Math.floor(times / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((times % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((times % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((times % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  };
  
};

function updateClockface({ days, hours, mins, secs }) {
  refs.day.textContent = `${days}`;
  refs.hour.textContent = `${hours}`;
  refs.min.textContent = `${mins}`;
  refs.sec.textContent = `${secs}`;
};


const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 15, 2021 14:12:40'),
  onTick: updateClockface,
});
timer.start();
