import intervalToDuration from "date-fns/intervalToDuration";
import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";

/**
 * @todo change state if countdown has expired
 */
export async function getServerSideProps() {
  // event date (format: years, month, day, hours, minutes, seconds)
  const DATE = new Date(2022, 12, 7, 0, 0, 0);
  // get days, hours, minutes & seconds from now to event date
  const countdown = intervalToDuration({ start: new Date(), end: DATE });
  return {
    props: { countdown }, // will be passed to the page component as props
  };
}

/* eslint-disable react/no-children-prop */
export default function Home({ countdown }) {
  return (
    <main className="min-h-screen grid grid-cols-3 grid-rows-3 items-center justify-center">
      <div className="grid items-center px-10 lg:px-20 h-full bg-base-200 col-span-3 md:col-span-2">
        <LineUp />
      </div>
      <div className="grid items-center justify-center col-span-3 row-span-1">
        <Countdown {...countdown} />
      </div>
      <div className="hidden md:block" />
      <div className="grid items-center text-right px-10 lg:px-20 h-full bg-base-200 col-span-3 md:col-span-2">
        <Info />
      </div>
    </main>
  );
}

/**
 * *********************** sections ***********************
 */

function Countdown({ days: startDays, hours: startHours, minutes: startMinutes, seconds: startSeconds }) {
  const [days, setDays] = useState(startDays);
  const [hours, setHours] = useState(startHours);
  const [minutes, setMinutes] = useState(startMinutes);
  const [seconds, { startCountdown, resetCountdown }] = useCountdown({ countStart: minutes === startMinutes ? startSeconds : 60, intervalMs: 1000 });

  // start the countdown on page load
  useEffect(() => startCountdown(), []);

  // countdown logic
  useEffect(() => {
    if (seconds === 0) {
      if (minutes === 0) {
      } else setMinutes(minutes - 1);
      if (hours === 0) {
      } else setHours(hours - 1);
      if (days === 0) {
      } else setDays(days - 1);
      resetCountdown();
      startCountdown();
    }
  }, [seconds, resetCountdown, startCountdown, minutes, hours, days]);

  // wa
  useEffect(() => {});

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <CountDownValue label="days" value={days} />
      <CountDownValue label="hours" value={hours} />
      <CountDownValue label="minutes" value={minutes} />
      <CountDownValue label="seconds" value={seconds} />
    </div>
  );
}

function CountDownValue({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl md:text-6xl lg:text-7xl xl:text-9xl">
        <span style={{ "--value": value }}></span>
      </span>
      {label}
    </div>
  );
}

function LineUp() {
  return (
    <div className="space-y-6 lg:space-y-12">
      <h1 className="text-2xl lg:text-5xl">Lineup</h1>
      <ul className="ml-4 text-sm lg:text-lg space-y-4">
        <li>
          <i className="text-accent">[Artist]</i> dj4base
        </li>
        <li>
          <i className="text-accent">[Artist]</i> Zucce
        </li>
        <li>
          <i className="text-accent">[Artist]</i> ...
        </li>
      </ul>
    </div>
  );
}

function Info() {
  return (
    <div className="space-y-6 lg:space-y-12">
      <h1 className="text-2xl lg:text-5xl">Infos</h1>
      <ul className="ml-4 text-sm lg:text-lg space-y-4">
        <li>
          Saag 10, Techelsberg <i className="text-accent">[Locaiton]</i>
        </li>
        <li>
          07 December, 2022 <i className="text-accent">[Date]</i>
        </li>
      </ul>
    </div>
  );
}
