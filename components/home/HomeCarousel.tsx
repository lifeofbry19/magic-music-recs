"use client";
import Image from "next/image";
import { useSpringCarousel } from "react-spring-carousel";
import { useState, useEffect } from "react";

type ArtistImage = {
  url: string;
};

export default function HomeCarousel({ items }: { items: ArtistImage[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const {
    carouselFragment,
    slideToNextItem,
    getCurrentActiveItem,
    useListenToCustomEvent,
  } = useSpringCarousel({
    withLoop: true,

    //@ts-ignore
    items: items
      ? items.map((item: ArtistImage, idx: number) => ({
          id: idx,
          renderItem: (
            <div
              className=" mx-1 slow-transition p-4  flex shadow-md mt-12 group cursor-pointer hover:bg-[#2c2c2c] flex-col w-full max-w-[300px] items-center gap-5   bg-[#252525] bg-opacity-60 rounded-lg"
              key={idx}
            >
              <div className="">
                <div className="mb-2 mt-2">
                  {item.url && (
                    <img
                      placeholder="blur"
                      src={item.url}
                      alt=""
                      width={200}
                      height={150}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>
          ),
        }))
      : [],
  });
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       slideToNextItem();
  //     }, 2000);
  //     return () => {
  //       if (interval) {
  //         clearInterval(interval);
  //       }
  //     };
  //   }, [activeIdx]);
  useEffect(() => {
    const timer = setInterval(() => {
      slideToNextItem();
    }, 1500);

    return () => {
      window.clearInterval(timer);
    };

    // You MUST add the slide methods to the dependency list useEffect!
  }, [slideToNextItem]);

  //   useListenToCustomEvent((event) => {
  //     // Triggered when the slide animation is completed
  //     if (event.eventName === "onSlideChange") {
  //       setActiveIdx(activeIdx + 1);
  //     }
  //   });

  // every 2 seconds, slide to next item

  return <div className=" max-w-[250px]">{carouselFragment}</div>;
}
