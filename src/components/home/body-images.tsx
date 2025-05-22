import { BodyContentWithImages } from "@/types/body-data";
import Image from "next/image";

interface BodyImagesProps {
  content: BodyContentWithImages;
}

export function BodyImages({ content }: BodyImagesProps) {
  return (
    <div className="flex flex-col justify-center">
      {(content.images || []).map((image) => {
        return (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={370}
            height={445}
            className="md:block hidden"
          />
        );
      })}
    </div>
  );
}
