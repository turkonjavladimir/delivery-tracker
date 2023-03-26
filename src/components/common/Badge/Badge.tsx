import cn from "classnames";
import { type VariantProps, cva } from "class-variance-authority";

const badgeVariants = cva("inline-flex items-center font-medium", {
  variants: {
    size: {
      default: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-0.5 text-sm",
    },
    variant: {
      default: "rounded-md",
      rounded: "rounded-full",
    },
    intent: {
      default: "bg-gray-100 text-gray-800",
      primary: "bg-indigo-100 text-indigo-800",
      secondary: "bg-blue-100 text-blue-800",
      success: "bg-green-100 text-green-800",
      danger: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
      info: "bg-sky-100 text-sky-800",
      light: "bg-gray-100 text-gray-800",
      dark: "bg-gray-800 text-gray-100",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
    intent: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  intent,
  ...props
}) => {
  return (
    <span
      className={cn(badgeVariants({ variant, size, intent, className }))}
      {...props}
    />
  );
};

export default Badge;
