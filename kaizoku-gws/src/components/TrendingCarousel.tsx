"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css";
import { cn } from "@/lib/utils";
import { Item } from "@/lib/types";

const TrendingCarousel = ({
  items,
  category,
  className,
}: {
  items: Item[];
  category: string;
  className?: string;
}) => {
  const images = items.map((item) => ({
    src: item.thumbnail,
    alt: item.title,
    href: `/${category}/${item.slug}`,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full", className)}
    >
      <Swiper
        spaceBetween={40}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={2.43}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{
          clickable: true,
        }}
        className="TrendingCarousel"
        modules={[EffectCoverflow, Autoplay, Pagination]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!h-[320px] w-full rounded-xl overflow-hidden transition-all duration-300 hover:border-[#4FD1FF] hover:shadow-[0_0_30px_rgba(79,209,255,0.2)]">
            <Link href={image.href} className="group block h-full w-full relative">
              <img
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                src={image.src}
                alt={image.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-semibold text-lg text-white truncate">
                  {image.alt}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export { TrendingCarousel };