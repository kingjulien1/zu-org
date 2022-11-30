import intervalToDuration from "date-fns/intervalToDuration";
import { createContext, useContext, useEffect, useRef, useState } from "react";

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

const ImageContext = createContext();

/* eslint-disable react/no-children-prop */
export default function Home({ countdown }) {
  return (
    <main className="w-full bg-base-100 bg-opacity-70 transition-all grid grid-cols-3 grid-rows-3 h-full items-center justify-center backdrop-blur-xl">
      <img alt="zu!org" src="zuorg.jpg" className="absolute h-10 top-10 -right-14 rotate-45" />
      <div className="grid items-center px-10 lg:px-20 h-full bg-base-300 col-span-3 md:col-span-2">
        <LineUp />
      </div>
      <div className="grid items-center justify-center col-span-3 row-span-1">
        <Countdown {...countdown} />
      </div>
      <div className="hidden md:block" />
      <div className="grid items-center text-right px-10 lg:px-20 h-full bg-base-300 col-span-3 md:col-span-2">
        <Info />
      </div>
    </main>
  );
}

/**
 * *********************** sections ***********************
 */

const useInterval = (callback) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
};

function Countdown({ days: startDays, hours: startHours, minutes: startMinutes, seconds: startSeconds }) {
  const [days, setDays] = useState(startDays);
  const [hours, setHours] = useState(startHours);
  const [minutes, setMinutes] = useState(startMinutes);
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => setSeconds((s) => s - 1), []);

  // countdown logic
  useInterval(() => {
    if (seconds > 0) setSeconds((s) => s - 1);
    else {
      // decrement minutes
      if (minutes > 0) setMinutes((m) => m - 1);
      else {
        //decrement hours
        if (minutes > 0) setHours((h) => h - 1);
        else {
          if (days > 0) setDays((d) => d - 1);
          setHours(23);
        }
        setMinutes(59);
      }
      // reset hours
      setSeconds(59);
    }
  });

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
      <span className="countdown font-mono text-5xl md:text-6xl lg:text-7xl xl:text-7xl">
        <span style={{ "--value": value }}></span>
      </span>
      {label}
    </div>
  );
}

function LineUp() {
  return (
    <div className="space-y-6 lg:space-y-10 group">
      <h1 className="text-2xl lg:text-5xl">Lineup</h1>
      <ul className="text-sm lg:text-lg space-y-4">
        <li>
          <a href="https://soundcloud.com/user-81326424">4base</a>
        </li>
        <li>
          <a href="https://soundcloud.com/sucke">Suzu</a>
        </li>
      </ul>
    </div>
  );
}

function Info() {
  return (
    <div className="space-y-6 lg:space-y-12">
      <h1 className="text-2xl lg:text-5xl">Info</h1>
      <ul className="text-sm lg:text-md space-y-4">
        <li>
          <a href="">Saag 10, Techelsberg</a>
        </li>
        <li>
          <a href="">07 December, 2022</a>
        </li>
      </ul>
    </div>
  );
}
