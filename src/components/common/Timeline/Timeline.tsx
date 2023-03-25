import { format } from "date-fns";
import { motion } from "framer-motion";

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

        <motion.p
          initial={{ opacity: 0, translateX: "-5px" }}
          transition={{ duration: 0.2 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          className="text-sm text-neutral-400"
        >
          {format(newDate, "MMMM d, yyyy, h:mm aa")}
        </motion.p>
      </div>

      <div className="mt-2 ml-4">
        <motion.h4
          initial={{ opacity: 0, translateX: "-5px" }}
          transition={{ duration: 0.2 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          className="mb-1.5 text-sm font-semibold"
        >
          {description}
        </motion.h4>
        <motion.p
          initial={{ opacity: 0, translateX: "-5px" }}
          transition={{ duration: 0.2 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          className="pb-3 text-sm text-neutral-400"
        >
          {location}
        </motion.p>
      </div>
    </li>
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
