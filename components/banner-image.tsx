'use client';

import Image from "next/image";
import Link from "next/link";

export function BannerImage() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a]">
      <div className="relative w-full">
        {/* Banner image - full width */}
        {/* Image dimensions: 3323 x 1024 */}
        <div className="relative w-full" style={{ aspectRatio: '3323/1024', minHeight: '1200px' }}>
          <Image
            src="/banner.png"
            alt="Glimpse Banner"
            fill
            className="object-cover object-center"
            loading="lazy"
            quality={75}
            sizes="100vw"
          />

          {/* Glassmorphism buttons centered at the bottom */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-[256px] px-8">
            {/* Contact Us button */}
            <Link
              href="https://www.linkedin.com/in/tryglimpse/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="glass-button px-8 py-4 rounded-[50px] cursor-pointer transition-all duration-300 hover:scale-105">
                <span className="text-black font-medium text-sm md:text-base">Contact Us</span>
              </div>
            </Link>

            {/* Copyright button */}
            <div className="glass-button px-8 py-4 rounded-[50px]">
              <span className="text-black font-medium text-sm md:text-base">
                © {new Date().getFullYear()} Glimpse. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-button {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.15) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(200, 200, 200, 0.3);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
        }

        .glass-button:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.2) 100%
          );
        }
      `}</style>
    </section>
  );
}
