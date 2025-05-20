import { Option } from "@/types/question";

interface QuestionnaireTextOptionProps {
  option: Option;
  onClick: () => void;
  className?: string;
  index: number;
  selected: boolean;
}

const textOptionClassName =
  "hover:cursor-pointer hover:border-1 hover:border-black rounded-md";

export function QuestionnaireTextOption({
  option,
  onClick,
  className,
  index,
  selected,
}: QuestionnaireTextOptionProps) {
  return (
    <div
      className={`flex space-x-4 p-2 ${textOptionClassName} ${className} ${
        selected ? "border-black border-2" : ""
      }`}
      role="button"
      onClick={onClick}
    >
      <span className="text-sm mt-0.5">{index}.</span>
      <div>{option.display}</div>
    </div>
  );
}
