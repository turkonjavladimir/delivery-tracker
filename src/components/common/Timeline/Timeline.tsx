import { format } from "date-fns";

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

        <p className="text-sm text-neutral-400">
          {format(newDate, "MMMM d, yyyy, h:mm aa")}
        </p>
      </div>

      <div className="mt-2 ml-4">
        <h4 className="mb-1.5 text-sm font-semibold">{description}</h4>
        <p className="pb-3 text-sm text-neutral-400">{location}</p>
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
