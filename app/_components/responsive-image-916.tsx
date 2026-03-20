import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ResponsiveImage916Props extends Omit<ImageProps, "fill"> {
  containerClassName?: string;
}

/**
 * ResponsiveImage916
 * A wrapper for next/image that enforces a 9:16 aspect ratio.
 * In desktop (lg:), it ensures the image doesn't stretch infinitely.
 */
export function ResponsiveImage916({ 
  src, 
  alt = "", 
  className, 
  containerClassName,
  priority,
  ...props 
}: ResponsiveImage916Props) {
  return (
    <div className={cn("relative aspect-[9/16] w-full overflow-hidden", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        priority={priority}
        {...props}
      />
    </div>
  );
}
