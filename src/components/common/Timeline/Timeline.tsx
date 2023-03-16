import { format } from "date-fns";

type TimelineItemProps = {
  date: string;
  location: string;
  description: string;
};

export type EventProps = {
  timestamp: string;
  location: {
    address: {
      addressLocality: string;
    };
  };
  description: string;
};

type TimelineProps = {
  events: EventProps[];
};

const TimelineItem = ({ date, location, description }: TimelineItemProps) => {
  const newDate = new Date(date);
  return (
    <li>
      <div className="flex-start flex items-center pt-3">
        <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-500"></div>
        <p className="text-sm text-neutral-400">
          {format(newDate, "MMMM d, yyyy, h:mm aa")}
        </p>
      </div>

      <div className="mt-2 ml-4">
        <h4 className="mb-1.5 text-sm font-semibold">{location}</h4>
        <p className="pb-3 text-sm text-neutral-400">{description}</p>
      </div>
    </li>
  );
};

const Timeline = ({ events }: TimelineProps) => {
  return (
    <ol className="border-l border-neutral-300 dark:border-neutral-500">
      {events?.map((event: EventProps, index: number) => (
        <TimelineItem
          key={index}
          date={event?.timestamp}
          location={event?.location?.address?.addressLocality}
          description={event?.description}
        />
      ))}
    </ol>
  );
};

export default Timeline;
