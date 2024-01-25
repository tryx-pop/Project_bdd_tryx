import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export const Button = ({ className, ...otherProps }) => (
  <button
    className={twMerge(
      clsx(
        "bg-indigo-600 active:bg-indigo-700 text-white text-lg font-semibold px-4 py-3",
        className,
      ),
    )}
    {...otherProps}
  />
)
