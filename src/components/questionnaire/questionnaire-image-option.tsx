import { ImageOptions } from "@/types/question";
import Image from "next/image";

interface QuestionnaireImageOptionProps {
  option: ImageOptions;
  onClick: () => void;
  selected: boolean;
}

const wrapperClassName =
  "hover:scale-105 transition-all duration-300 hover:cursor-pointer hover:border-1 hover:border-emerald-400 rounded-md";
const selectedClassName = "border-black border-2";

export function QuestionnaireImageOption({
  option,
  onClick,
  selected,
}: QuestionnaireImageOptionProps) {
  // TODO: use SRCSET
  return (
    <div
      className={`flex rounded-md justify-center ${wrapperClassName} ${
        selected ? selectedClassName : ""
      }`}
    >
      <Image
        src={option.url}
        alt={option.alt}
        width={100}
        height={100}
        onClick={onClick}
        role="button"
      />
    </div>
  );
}
