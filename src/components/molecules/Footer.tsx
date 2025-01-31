import Image from "next/image";
import React from "react";
import penhouse_logo from "../../../public/penhouse_logo_gold.webp";
import { Facebook02Icon, InstagramIcon, WebProgrammingIcon } from "hugeicons-react";

const Footer = () => {
  return (
    <footer className="w-full bg-black flex flex-col items-center justify-center pt-8 mt-16">
      <article className="grid grid-cols-1 md:grid-cols-2 py-8 flex-1 w-full max-w-screen-lg gap-8">
        <section className="flex flex-col items-center justify-center gap-4 w-full border-r">
          <Image src={penhouse_logo} alt="logo" width={180} height={180} />
            <p className="text-gray-400 text-xs font-normal italic text-center">
              102 St. Palm Beach
              <br />
              Florida, CA, United States
            </p>
            <span className="text-gray-400 font-normal italic flex gap-2">
                <a target="_blank" href="https://www.facebook.com/">
                    <Facebook02Icon size={20} />
                </a>
                <a target="_blank" href="https://www.instagram.com/">
                    <InstagramIcon size={20} />
                </a>
                <a target="_blank" href="https://www.webprogramming.com/">
                    <WebProgrammingIcon size={20} />
                </a>
            </span>
        </section>
        <section className="flex flex-col items-center justify-center gap-4">
           <Image src="https://burbanostudio-assets.s3.amazonaws.com/assets/imgs/logos/js/js-contrast-shadow.png"  alt="logo" width={180} height={180} />
           <p style={{ letterSpacing: "0.4em"}} className="text-gray-200 text-xs font-normal text-center">JSBURBANO</p>
           <p className="text-gray-400 text-xs font-normal italic text-center">
            @jsburbano
            <br />
            Fullstack Developer
           </p>
           <span className="font-normal italic flex gap-2">
                <a target="_blank" href="https://www.facebook.com/">
                    <Facebook02Icon size={20} className="text-gray-400" />
                </a>
                <a target="_blank" href="https://www.instagram.com/">
                    <InstagramIcon size={20} className="text-gray-400" />
                </a>
                <a target="_blank" href="https://www.webprogramming.com/">
                    <WebProgrammingIcon size={20} className="text-gray-400" />
                </a>
            </span>
        </section>
      </article>
      <p className="text-gray-600 text-xs p-2 border-t border-gray-700 w-full text-center">
        © 2024 Penthouse. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
