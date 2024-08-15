import { HeroImage } from "@/assets/landing/img";
import { Banner2, Banner3 } from "@/assets/landing/svg/banner";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { GoDot, GoDotFill } from "react-icons/go";

// laptop kecil = 1024px
// laptop medium = 1280px
// laptop besar = 1536px

const Home = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Mendapatkan lebar layar saat ini
  var lebarLayar = window.innerWidth;
  console.log("Lebar layar saat ini adalah " + lebarLayar + " piksel");

  return (
    <div id="home" className="">
      <Carousel
        className="hiddenx lg:blockx"
        plugins={[Autoplay({ delay: 5000 })]}
        setApi={setApi}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="px-5 pt-5 pb-5 lg:grid lg:grid-cols-2 lg:px-20 lg:pt-20 lg:py-0">
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-4xl text-center lg:text-left lg:text-6xl leading-tight">
                  {`Bimbingan Belajar yang Memberikan `}
                  <span className="text-custom-green">#PerhatianPenuh</span>
                  {` bagi Siswa dan Orang Tua`}
                </p>
                <p className="mt-4 text-black text-opacity-60 text-lg hidden lg:block">
                  Menyesuaikan dengan kurikulum terbaru di sekolah, pemberian
                  konseling untuk pengembangan karakter, dan laporan rutin untuk
                  orang tua.
                </p>
                <div className="mt-8 hidden lg:block">
                  <div className="h-1 w-40 bg-black bg-opacity-60 rounded-full" />
                </div>
              </div>
              <div className="flex justify-center lg:justify my-5 lg:my-0">
                <img
                  src={HeroImage}
                  className="w-3/4"
                  style={{ borderRadius: "2rem" }}
                />
              </div>
              <div className="block lg:hidden text-center">
                <p className="mt-4 text-black text-opacity-60">
                  Menyesuaikan dengan kurikulum terbaru di sekolah, pemberian
                  konseling untuk pengembangan karakter, dan laporan rutin untuk
                  orang tua.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="h-1 w-40 bg-black bg-opacity-60 rounded-full" />
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="px-5 py-5 lg:grid lg:grid-cols-3 lg:px-20 lg:py-0">
              <div className="col-span-1 flex flex-col justify-center">
                <div className="font-semibold text-center lg:text-left text-4xl lg:text-6xl leading-tight">
                  <p>
                    {"Kesempatan Daftar Kursus "}
                    <span className="text-custom-green">#GRATIS</span>
                  </p>
                </div>
                <div className="hidden lg:block">
                  <p className="mt-4 text-black text-opacity-60 max-w-xs text-lg">
                    {
                      "Jangan lewatkan kesempatan daftar program bimbingan belajar tanpa dipungut biaya sebelum "
                    }{" "}
                    <span className="text-black">15 Juli 2024</span>
                  </p>
                  <div className="mt-8">
                    <div className="h-1 w-40 bg-black bg-opacity-60" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end col-span-2 my-5 lg:my-0">
                <img src={Banner2} className="h-full" />
              </div>
              <div className="block lg:hidden text-center">
                <p className="mt-4 text-black text-opacity-60 max-w-xs">
                  {
                    "Jangan lewatkan kesempatan daftar program bimbingan belajar tanpa dipungut biaya sebelum "
                  }{" "}
                  <span className="text-black">15 Juli 2024</span>
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="h-1 w-40 bg-black bg-opacity-60 rounded-full" />
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="lg:grid lg:grid-cols-3 px-5 py-5 lg:px-20 lg:py-0">
              <div className="col-span-1 flex flex-col justify-center">
                <div className="font-semibold text-4xl lg:text-6xl text-center lg:text-left leading-tight">
                  <p>
                    {`Ajak Teman dan Dapatkan `}
                    <span className="text-custom-green">Rp 50.000</span>
                  </p>
                </div>
                <div className="hidden lg:block">
                  <p className="mt-4 text-black text-opacity-60 text-lg">
                    Bagikan pengalaman positifmu dan ajak teman-temanmu untuk
                    bergabung!
                  </p>
                  <div className="mt-8">
                    <div className="h-1 w-40 bg-black bg-opacity-60 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end col-span-2 my-5 lg:my-0">
                <img src={Banner3} className="h-full" />
              </div>
              <div className="block lg:hidden text-center">
                <p className="mt-4 text-black text-opacity-60">
                  Bagikan pengalaman positifmu dan ajak teman-temanmu untuk
                  bergabung!
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="h-1 w-40 bg-black bg-opacity-60 rounded-full" />
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="flex gap-4 items-center justify-center mt-8">
        {Array.from({ length: 3 }).map((_, index) => {
          return index === current - 1 ? (
            <GoDotFill key={index} className="text-2xl text-gray-400" />
          ) : (
            <GoDot
              key={index}
              className="text-2xl text-gray-300 cursor-pointer"
              onClick={() => {
                api?.scrollTo(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
