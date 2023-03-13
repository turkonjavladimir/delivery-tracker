import { useMemo } from "react";
import {
  ArrowPathRoundedSquareIcon as ArrowPathRoundedSquareIconOutline,
  BellIcon as BellIconOutline,
  BellSlashIcon as BellSlashIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline,
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisIconOutline,
  CheckBadgeIcon as CheckBadgeIconOutline,
  CheckIcon as CheckIconOutline,
  EllipsisHorizontalIcon as EllipsisHorizontalIconOutline,
  EnvelopeIcon as EnvelopeIconOutline,
  FlagIcon as FlagIconOutline,
  HeartIcon as HeartIconOutline,
  HomeIcon as HomeIconOutline,
  InformationCircleIcon as InformationCircleIconOutline,
  LockClosedIcon as LockClosedIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutline,
  NoSymbolIcon as NoSymbolIconOutline,
  PencilSquareIcon as PencilSquareIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
  QueueListIcon as QueueListIconOutline,
  ShareIcon as ShareIconOutline,
  TrashIcon as TrashIconOutline,
  UserIcon as UserIconOutline,
  XCircleIcon as XCircleIconOutline,
  XMarkIcon as XIconOutline,
  MoonIcon as MoonIconOutline,
} from "@heroicons/react/24/outline";

import {
  ArrowPathRoundedSquareIcon as ArrowPathRoundedSquareIconSolid,
  BellIcon as BellIconSolid,
  BellSlashIcon as BellSlashIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid,
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid,
  CheckIcon as CheckIconSolid,
  EllipsisHorizontalIcon as EllipsisHorizontalIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  FlagIcon as FlagIconSolid,
  HeartIcon as HeartIconSolid,
  HomeIcon as HomeIconSolid,
  InformationCircleIcon as InformationCircleIconSolid,
  LockClosedIcon as LockClosedIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  NoSymbolIcon as NoSymbolIconSolid,
  PencilSquareIcon as PencilSquareIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  QueueListIcon as QueueListIconSolid,
  ShareIcon as ShareIconSolid,
  TrashIcon as TrashIconSolid,
  UserIcon as UserIconSolid,
  XCircleIcon as XCircleIconSolid,
  XMarkIcon as XIconSolid,
  MoonIcon as MoonIconSolid,
} from "@heroicons/react/24/solid";

export const icons = {
  arrowPathRoundedSquare: {
    outline: ArrowPathRoundedSquareIconOutline,
    solid: ArrowPathRoundedSquareIconSolid,
  },
  bell: {
    outline: BellIconOutline,
    solid: BellIconSolid,
  },
  bellSlash: {
    outline: BellSlashIconOutline,
    solid: BellSlashIconSolid,
  },
  bookmark: {
    outline: BookmarkIconOutline,
    solid: BookmarkIconSolid,
  },
  chatBubbleOvalLeft: {
    outline: ChatBubbleOvalLeftIconOutline,
    solid: ChatBubbleOvalLeftIconSolid,
  },
  chatBubbleOvalLeftEllipsis: {
    outline: ChatBubbleOvalLeftEllipsisIconOutline,
    solid: ChatBubbleOvalLeftEllipsisIconSolid,
  },
  check: {
    outline: CheckIconOutline,
    solid: CheckIconSolid,
  },
  checkBadge: {
    outline: CheckBadgeIconOutline,
    solid: CheckBadgeIconSolid,
  },
  ellipsisHorizontal: {
    outline: EllipsisHorizontalIconOutline,
    solid: EllipsisHorizontalIconSolid,
  },
  envelope: {
    outline: EnvelopeIconOutline,
    solid: EnvelopeIconSolid,
  },
  flag: {
    outline: FlagIconOutline,
    solid: FlagIconSolid,
  },
  heart: {
    outline: HeartIconOutline,
    solid: HeartIconSolid,
  },
  home: {
    outline: HomeIconOutline,
    solid: HomeIconSolid,
  },
  info: {
    outline: InformationCircleIconOutline,
    solid: InformationCircleIconSolid,
  },
  lockClosed: {
    outline: LockClosedIconOutline,
    solid: LockClosedIconSolid,
  },
  magnifyingGlass: {
    outline: MagnifyingGlassIconOutline,
    solid: MagnifyingGlassIconSolid,
  },
  moonIcon: {
    outline: MoonIconOutline,
    solid: MoonIconSolid,
  },
  noSymbol: {
    outline: NoSymbolIconOutline,
    solid: NoSymbolIconSolid,
  },
  pencilSquare: {
    outline: PencilSquareIconOutline,
    solid: PencilSquareIconSolid,
  },
  plusCircle: {
    outline: PlusCircleIconOutline,
    solid: PlusCircleIconSolid,
  },
  queueList: {
    outline: QueueListIconOutline,
    solid: QueueListIconSolid,
  },
  share: {
    outline: ShareIconOutline,
    solid: ShareIconSolid,
  },
  trash: {
    outline: TrashIconOutline,
    solid: TrashIconSolid,
  },
  user: {
    outline: UserIconOutline,
    solid: UserIconSolid,
  },
  x: {
    outline: XIconOutline,
    solid: XIconSolid,
  },
  xCircle: {
    outline: XCircleIconOutline,
    solid: XCircleIconSolid,
  },
} as const;

export const useIcons = () => {
  const memoizedIcons = useMemo(() => icons, []);
  return memoizedIcons;
};
