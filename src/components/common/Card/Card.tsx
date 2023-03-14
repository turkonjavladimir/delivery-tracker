import Link from "next/link";

import { api } from "~/utils/api";

import { Dropdown } from "~/components/ui";
import Icon from "~/components/common/Icon";
import { MenuItem } from "~/components/ui/Dropdown/Dropdown";

type CardProps = {
  title: string;
  trackingNumber: string;
  id: string;
};

const Card = ({ title = "", trackingNumber = "", id }: CardProps) => {
  const { refetch } = api.shipment.getAll.useQuery();

  const deleteShipment = api.shipment.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const isDisabled = deleteShipment?.isLoading;

  return (
    <Link href={`/track/${trackingNumber}`}>
      <div className="mt-2 flex flex-col rounded-md bg-white p-3 shadow-sm transition-colors md:hover:bg-indigo-50">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 gap-3">
            <span className="h-14 w-14 rounded-md bg-indigo-100 p-2">
              <Icon name="truck" className="h-10 w-10 text-indigo-500" />
            </span>

            <div className="flex min-w-0 flex-col">
              <span className="text=[#27303D] truncate font-semibold uppercase">
                {title}
              </span>
              <span className="mt-2 text-sm uppercase text-gray-400">
                {trackingNumber}
              </span>
            </div>
          </div>

          <Dropdown>
            <div className="mx-1 py-1">
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Delete");
                  void deleteShipment.mutate({ id });
                }}
                text="Delete"
                isDisabled={isDisabled}
                isLoading={deleteShipment?.isLoading}
                icon={<Icon name="trash" className="h-4 w-4 text-red-400" />}
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </Link>
  );
};

export default Card;
