import { Logo } from "../common/logo";
import footerDesc from "@/utils/footer-desc.json";
import {
  FooterData,
  isFooterItemWithIcon,
  isFooterItemWithLink,
} from "@/types/footer-data";

// TODO: Add color to tailwind config
export function Footer() {
  const footerData = footerDesc as unknown as FooterData;
  const footerKeys = Object.keys(footerData);

  return (
    <div className="p-32 flex flex-row" style={{ backgroundColor: "#e8efe9" }}>
      <Logo className="mr-80 self-start" />
      <div className="grid grid-cols-4 gap-4 flex-1">
        {footerKeys.map((key) => {
          const items = footerData[key];
          return (
            <div key={key} className="flex flex-col gap-2">
              <h3>{key}</h3>
              {items.map((item) => {
                return (
                  <div key={item.name}>
                    {isFooterItemWithLink(item) && (
                      <a href={item.link}>{item.name}</a>
                    )}
                    {isFooterItemWithIcon(item) && (
                      <div className="flex flex-row gap-2">
                        {item.icons.map((icon) => {
                          return (
                            <a href={icon.link} key={icon.icon}>
                              {icon.icon}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
