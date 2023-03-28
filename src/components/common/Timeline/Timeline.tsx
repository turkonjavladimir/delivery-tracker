import { format } from "date-fns";
import { m, LazyMotion, domAnimation } from "framer-motion";

type TimelineItemProps = {
  date: string;
  location: string;
  description: string;
  isActive: boolean;
};

export type EventProps = {
  timestamp: string;
  location: string;
  description: string;
};

type TimelineProps = {
  events: EventProps[];
};

const TimelineItem = ({
  date,
  location,
  isActive,
  description,
}: TimelineItemProps) => {
  const newDate = new Date(date);

  return (
    <LazyMotion features={domAnimation}>
      <li>
        <div className="flex-start flex items-center pt-3">
          <span className="relative -ml-[4.5px] mr-3 flex h-2 w-2">
            {isActive && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                isActive ? "bg-indigo-400" : "bg-green-500"
              }`}
            ></span>
          </span>

          <m.p
            initial={{ opacity: 0, translateX: "-5px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            className="text-sm text-neutral-400"
          >
            {format(newDate, "MMMM d, yyyy, h:mm aa")}
          </m.p>
        </div>

        <div className="mt-2 ml-4">
          <m.h4
            initial={{ opacity: 0, translateX: "-5px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            className="mb-1.5 text-sm font-semibold"
          >
            {description}
          </m.h4>
          <m.p
            initial={{ opacity: 0, translateX: "-5px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            className="pb-3 text-sm text-neutral-400"
          >
            {location}
          </m.p>
        </div>
      </li>
    </LazyMotion>
  );
};

const Timeline = ({ events }: TimelineProps) => {
  return (
    <ol className="border-l border-neutral-300 dark:border-neutral-500">
      {events?.map((event: EventProps, index: number) => {
        const isActive =
          index === 0 && event?.description.toLowerCase() !== "delivered";
        return (
          <TimelineItem
            key={index}
            isActive={isActive}
            date={event?.timestamp}
            location={event?.location}
            description={event?.description}
          />
        );
      })}
    </ol>
  );
};

export default Timeline;
