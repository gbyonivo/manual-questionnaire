"use client";

import Image from "next/image";
import { Button } from "./common/button";
import { Body } from "./home/body";
import { Footer } from "./home/footer";
import { Logo } from "./common/logo";

export function HomeContainer() {
  return (
    <div className="relative">
      {/* TODO: Background to be added to tailwind config */}
      <div
        className="w-full p-8 lg:p-0 relative"
        style={{ backgroundColor: "#a3b89f" }}
      >
        <Image
          src="/images/home-bg.png"
          alt="Home"
          className="w-full hidden lg:block"
          width={1000}
          height={750}
        />
        <Logo
          size={40}
          className="pl:32 mb-8 lg:mb-0 lg:absolute lg:top-4 lg:left-32"
        />
        <div className="w-full h-full lg:w-1/3 lg:absolute lg:top-0 lg:left-32">
          <div className="w-full h-full flex flex-col justify-center">
            <div className="text-4xl lg:text-7xl">
              Be good <br className="hidden lg:block" />
              to yourself
            </div>
            <div className="text-lg mt-8">
              We&apos;re working around the clock to bring you a holistic
              approach to your wellness. From top to bottom, inside and out.
            </div>
            <Button
              className="mt-8 bg-rose-900 text-white self-start"
              onClick={() => {}}
            >
              Take the quiz
            </Button>
          </div>
        </div>
      </div>
      <Body />
      <Footer />
    </div>
  );
}
