import intervalToDuration from "date-fns/intervalToDuration";

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
    <main className="grid min-h-screen items-center justify-center">
      <Countdown {...countdown} />
    </main>
  );
}

/**
 * *********************** sections ***********************
 */

function Countdown({ days, hours, minutes, seconds }) {
  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": days }}></span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": hours }}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": minutes }}></span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": seconds }}></span>
        </span>
        sec
      </div>
    </div>
  );
}
