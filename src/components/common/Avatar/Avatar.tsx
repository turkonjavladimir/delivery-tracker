import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg";
const sizes = {
  sm: `w-8 h-8`,
  md: `w-10 h-10`,
  lg: `w-12 h-12`,
};

type AvatarProps = {
  label?: string;
  size?: AvatarSize;
  imageUrl?: string;
};

const getInitials = (label: string) => {
  label = label.trim();

  if (label.length <= 3) return label;

  return (
    label
      ?.split(/\s+/)
      .map((w) => [...w][0])
      .slice(0, 3)
      .join("") ?? ""
  );
};

const Avatar = ({ label = "", size = "sm", imageUrl = "" }: AvatarProps) => {
  const sizeClasses = sizes[size] || sizes.sm;

  return (
    <span
      className={`${sizeClasses} inline-flex items-center justify-center rounded-full border-[1px] border-neutral-200 bg-white transition-colors ease-linear hover:cursor-pointer md:text-sm`}
    >
      {!imageUrl ? (
        <span className="text-xs font-medium leading-none text-black">
          {getInitials(label)}
        </span>
      ) : (
        <Image
          className="w-12 rounded-full object-cover"
          alt="profile-image"
          width={50}
          height={50}
          src={imageUrl}
        />
      )}
    </span>
  );
};

export default Avatar;
