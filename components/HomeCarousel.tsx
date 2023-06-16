"use client";
import Image from "next/image";
import { useSpringCarousel } from "react-spring-carousel";
import { useState, useEffect } from "react";

type Artist = {
  artist: string;
  image: string;
};

export default function HomeCarousel({ items }: { items: Artist[] }) {
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
      ? items.map((item: Artist, idx: number) => ({
          id: idx,
          renderItem: (
            <div className="w-full mx-2" key={idx}>
              <div className="mt-16">
                <div className="mb-2">
                  {item.image && (
                    <img
                      placeholder="blur"
                      src={item.image}
                      alt={item.artist}
                      width={200}
                      height={150}
                    />
                  )}
                </div>
                {item?.artist && <i>{item.artist}</i>}
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

  return <div className=" max-w-[300px]">{carouselFragment}</div>;
}
