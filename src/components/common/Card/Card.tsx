import Link from "next/link";
import Icon from "../Icon";

type CardProps = {
  title: string;
  trackingNumber: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card = ({ onClick, title = "", trackingNumber = "" }: CardProps) => {
  return (
    <Link href={`/track/${trackingNumber}`}>
      <div className="relative mt-2 flex flex-col rounded-md bg-white p-3 shadow-sm transition-colors hover:bg-indigo-50">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 gap-3">
            <span className="h-14 w-14 rounded-md bg-indigo-100 p-2">
              <Icon name="truck" className="text-indigo-500" />
            </span>

            <div className="flex min-w-0 flex-col">
              <span className="text=[#27303D] truncate font-semibold">
                {title}
              </span>
              <span className="mt-2 text-sm uppercase text-gray-400">
                {trackingNumber}
              </span>
            </div>
          </div>

          <button
            className="absolute right-1 top-2 shrink-0 rounded-full p-2"
            onClick={onClick}
          >
            <Icon name="ellipsisHorizontal" className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
