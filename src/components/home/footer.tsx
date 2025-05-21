import { Logo } from "../common/logo";
import footerDesc from "@/utils/json/footer-desc.json";
import {
  FooterData,
  isFooterItemWithIcon,
  isFooterItemWithLink,
} from "@/types/footer-data";
// TODO: get icons from somewhere else
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

// TODO: Solid icons instead of outlinedd
const iconMap = {
  facebook: <Facebook size={24} className="text-pink-800" />,
  twitter: <Twitter size={24} className="text-pink-800" />,
  instagram: <Instagram size={24} className="text-pink-800" />,
  linkedin: <Linkedin size={24} className="text-pink-800" />,
  youtube: <Youtube size={24} className="text-pink-800" />,
};

// TODO: Add color to tailwind config
// TODO: why is customer service breaking to next line
export function Footer() {
  const footerData = footerDesc as unknown as FooterData;
  const footerKeys = Object.keys(footerData);

  return (
    <div className="px-8 md:px-32 flex flex-row pt-16 mt-8 secondary-bg primary-text">
      <Logo className="hidden md:block md:mr-40 lg:mr-80 self-start" />
      <div className="flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {footerKeys.map((key) => {
            const items = footerData[key];
            return (
              <div key={key} className="flex flex-col gap-2">
                <div className="font-bold uppercase text-xs">
                  {key.replace(/_/g, " ")}
                </div>
                {items.map((item) => {
                  return (
                    <div key={item.name}>
                      {isFooterItemWithLink(item) && (
                        <a href={item.link} className="text-base">
                          {item.name}
                        </a>
                      )}
                      {isFooterItemWithIcon(item) && (
                        <div className="flex flex-row gap-6">
                          {item.icons.map((icon) => {
                            return (
                              <a href={icon.link} key={icon.icon}>
                                {iconMap[icon.icon as keyof typeof iconMap]}
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
        <div className="w-full mt-20 border-t border-gray-300 text-center text-base py-8 text-gray-500">
          © 2021 Manual. All rights reserverd
        </div>
      </div>
    </div>
  );
}
