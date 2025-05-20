import { BodyData, isBodyContentWithLines } from "@/types/body-data";
import bodyDesc from "@/utils/body-desc.json";
import { BodyLines } from "./body-lines";
import { BodyImages } from "./body-images";

export function Body() {
  const body = bodyDesc as unknown as BodyData;
  return (
    <div className="pt-8 text-center">
      <div className="text-4xl font-medium">{body.header}</div>
      <div className="flex flex-col gap-2 md:gap-8">
        {body.parts.map((part) => {
          return (
            <div
              key={part.id}
              className="flex flex-row md:gap-8 lg:gap-32 justify-center py-0 md:py-4 lg:py-8 md:px-28 lg:px-60"
            >
              {part.content.map((content, index) => {
                return isBodyContentWithLines(content) ? (
                  <BodyLines key={content.id || index} content={content} />
                ) : (
                  <BodyImages key={content.id || index} content={content} />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
