import { BodyContentWithLines } from "@/types/body-data";

interface BodyLinesProps {
  content: BodyContentWithLines;
}

const lineStyles = ["text-xs", "text-2xl lg:text-3xl", "text-md lg:text-lg"];

export function BodyLines({ content }: BodyLinesProps) {
  return (
    <div className="p-4 flex flex-col gap-2 justify-center lg:w-80 primary-text">
      {(content.lines || []).map((line, index) => {
        return (
          <div
            key={line}
            className={`text-left ${lineStyles[index] || "text-xs"}`}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
}
