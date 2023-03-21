import Link from "next/link";

import { api } from "~/utils/api";

import { Dropdown } from "~/components/ui";
import Icon from "~/components/common/Icon";
import { MenuItem } from "~/components/ui/Dropdown/Dropdown";

type CardProps = {
  id?: string;
  status?: string;
  trackingNumber?: string;
};

const Card = ({ id, status = "", trackingNumber = "" }: CardProps) => {
  const { refetch } = api.shipment.getAll.useQuery();

  const deleteShipment = api.shipment.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const isDisabled = deleteShipment?.isLoading;

  return (
    <Link href={`/shipment/${id}`}>
      <div className="mt-2 flex flex-col rounded-md bg-white p-3 shadow-sm transition-colors md:hover:bg-indigo-50">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 gap-3">
            <span className="h-14 w-14 rounded-md bg-indigo-100 p-2">
              <Icon name="truck" className="h-10 w-10 text-indigo-500" />
            </span>

            <div className="flex w-full min-w-0 flex-col gap-[2px]">
              <div className="flex items-center gap-3">
                <span className="text=[#27303D] truncate text-sm font-semibold uppercase">
                  {trackingNumber}
                </span>
              </div>

              <span className="truncate text-xs uppercase text-gray-500">
                {id}
              </span>
              <div className="flex items-center gap-3">
                <span
                  className={`truncate text-xs uppercase ${
                    status?.toLowerCase() === "delivered"
                      ? "text-green-700"
                      : "text-indigo-400"
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>

          <Dropdown>
            <div className="mx-1 py-1">
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (!id) {
                    return;
                  }

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
