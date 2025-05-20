import React, { useEffect } from "react";
import gsap from "gsap";
import "../style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHandPointRight } from "react-icons/fa";
import {Link} from "react-router-dom"

gsap.registerPlugin(ScrollTrigger);

const useAnimations = () => {
  useEffect(() => {
    // Home Page Animation
    gsap.set(".slidesm", { scale: 5 });

    const homeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    homeTl
      .to(".vdiodiv", { "--clip": "0%", ease: "power2" }, "a")
      .to(".slidesm", { scale: 1, ease: "power2" }, "a")
      .to(".lft", { xPercent: -10, stagger: 0.03, ease: "power4" }, "b")
      .to(".rgt", { xPercent: 10, stagger: 0.03, ease: "power4" }, "b");

    // Real Page Animation
    gsap.to(".slide", {
      scrollTrigger: {
        trigger: ".real",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
      xPercent: -150,
      ease: "power4",
    });

    // Product Animation
    document.querySelectorAll(".listelem").forEach((elem) => {
      elem.addEventListener("mousemove", (dets) => {
        gsap.to(elem.querySelector(".picture"), {
          opacity: 1,
          x: gsap.utils.mapRange(0, window.innerWidth, -200, 200, dets.clientX),
          ease: "power4",
          duration: 0.5,
        });
      });

      elem.addEventListener("mouseleave", () => {
        gsap.to(elem.querySelector(".picture"), {
          opacity: 0,
          ease: "power4",
          duration: 0.5,
        });
      });
    });

    document.querySelectorAll(".section").forEach(function (e) {
      ScrollTrigger.create({
        trigger: e,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: function () {
          document
            .querySelector(".body")
            .setAttribute("theme", e.dataset.color);
        },
        onEnterBack: function () {
          document
            .querySelector(".body")
            .setAttribute("theme", e.dataset.color);
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

const HomePage = () => {
  useAnimations();
  const cardsData = [
    {
      image: "/images/samsung.png",
      title: "Samsung",
      description: "Samsung Electronics is a global leader in the consumer electronics industry, offering a wide range of innovative products. Samsung is a pioneer in TV technology, producing QLED, OLED, and 8K Smart TVs. In home appliances, it manufactures refrigerators, washing machines, air conditioners, and microwaves with smart features.",
    },
    {
      image: "/images/Haier.png",
      title: "Haier",
      description: "Haier is a globally recognized brand specializing in home appliances and consumer electronics. It offers a diverse range of products, including refrigerators, washing machines, air conditioners, and microwave ovens, designed for efficiency and convenience.With a strong international presence, the brand continues to deliver reliable, high-quality appliances that meet the needs of households worldwide.",
    },
    {
      image: "/images/Llyod.png",
      title: "Llyod",
      description: "Lloyd is a well-known brand in the consumer electronics and home appliances industry, offering a range of high-performance products. Its lineup includes air conditioners, refrigerators, washing machines, and LED TVs, designed with modern technology for energy efficiency and durability.",
    },
    {
      image: "/images/Sony.png",
      title: "Sony",
      description: "Sony is a leading name in consumer electronics, offering a wide array of high-quality products designed for innovation and performance. Its portfolio includes OLED and LED TVs.",
    },
    {
      image: "/images/Philips.png",
      title: "philips",
      description: "Philips is a renowned global brand known for its high-quality consumer electronics and home appliances. It offers a diverse range of products,including kitchen appliances .",
    },
    {
      image: "/images/LG.png",
      title: "LG",
      description: "LG is a well-established global brand offering a diverse range of consumer electronics and home appliances. Its product lineup includes refrigerators, washing machines and kitchen gadgets.",
    },
  ];
  return (
    <div className="body">
      <div className="main w-full">
        <div
          data-color="black"
          className="home section w-full h-[200vh] relative"
        >
          <div className="w-full sticky top-0 left-0 text-white">
            <div className="btmtext z-[4] absolute bottom-[7%] w-52 left-[3%]">
              <h1 className="break-words">
                Connect. Create. Conquer. Smart Solutions, Simple Living.
                Unleash the Potential.
              </h1>
            </div>

            <div
              style={{ "--clip": "100%" }}
              className="vdiodiv  z-[3] w-full h-screen absolute top-0 left-0 bg-black overflow-hidden"
            >
              <video
                autoPlay
                loop
                muted
                className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                src="/vedios/ElectroEra_homepage.mp4"
              ></video>
            </div>
            <div className="marqueecontainer w-full h-screen relative overflow-hidden">
              <div className="heading absolute top-[9%] left-1/2 -translate-x-1/2 w-130 text-center">
                <h1 className="text-xl font-regular">
                  Welcome to <b>ElectroEra</b>
                </h1>
                <h1 className="text-xl font-regular">
                  An E-commerce Web-Platform for Electronics Appliences
                </h1>
              </div>
              <div className="slidesm absolute scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
                <div className="row lft -translate-x-4 w-full py-1 flex items-center gap-10 whitespace-nowrap">
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Samsung</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/F_1.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Haier</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/AC_2.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Philips</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/Cooler_2.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">LG</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/F_16.3.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Sony</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/F_6.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Llyod</h1>
                    {/* <!-- <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-yellow-500 overflow-hidden"></div> --> */}
                  </div>
                </div>
                <div className="row rgt -translate-x-1/3 w-full py-1 flex items-center gap-10 whitespace-nowrap">
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Samsung</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/F_9.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Haier</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/G_1.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Philips</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/MC_4.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">LG</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/Mixer_2.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Sony</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/Oven_3.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Llyod</h1>
                    {/* <!-- <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-yellow-500 overflow-hidden"></div> --> */}
                  </div>
                </div>
                <div className="row lft -translate-x-7 w-full py-1 flex items-center gap-10 whitespace-nowrap">
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Samsung</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/TV_10.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Haier</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/WM_11.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Philips</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/TV_7.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">LG</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/WM_9.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Sony</h1>
                    <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full border overflow-hidden">
                      <img
                        src="/images/F_1.png"
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="elem flex items-center gap-10">
                    <h1 className="font-semibold text-7xl">Llyod</h1>
                    {/* <!-- <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-yellow-500 overflow-hidden"></div> --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-color="cyan"
          className="craft section w-full flex gap-10 justify-between items-start px-10 py-10 relative"
        >
          <div className="ltext w-[40%] sticky top-0 left-0 py-14">
            <p className="text-xl  font-regular flex items-start gap-2 text-white/70">
            <span className="mt-1"><FaHandPointRight/></span>
          <span>
            At our electronics shop, we offer a wide range of products, including ACs, refrigerators, TVs, home appliances, kitchen appliances, and washing machines. We partner with top brands like Sony, Samsung, Haier, Lloyd, Philips, Bosch, and more to bring you high-quality and reliable products. Please note that our dealership agreements may change over time, so the availability of specific products can vary. Shop with us for the latest and most trusted electronics!
          </span>
            </p>
            <h1 className="text-[5rem] leading-[6.5rem] mt-10 mb-10 text-white/60">
              Our top<br/> Companies
            </h1>
            <div className="w-fit px-10 py-5 text-xl rounded-full bg-white/30 cursor-pointer">
              <div className="masker overflow-hidden">
                <span className="inline-block"><Link to="/AllProducts">Our Products</Link></span>
              </div>
            </div>
          </div>
          <div className="cards w-1/2 flex flex-col gap-6 items-center py-64">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="w-3/4 flex items-center gap-8 p-4 rounded-lg backdrop-blur-md bg-white/30 shadow-lg"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-[30%] h-[30%] object-cover rounded-lg"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-white/60">
                    {card.title}
                  </h2>
                  <p className="text-gray-200 text-xs">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div data-color="salmon" className="real section w-full">
          <div className="container h-[400vh] relative">
            <div className="slides overflow-hidden gap-20 sticky top-0 left-0 w-full flex h-[100vh]">
              <div className="slide w-full flex justify-center items-center h-screen flex-shrink-0">
                <div className="text flex flex-col gap-2 items-center">
                  <h1 className="text-8xl bg-clip-text text-transparent bg-gradient-to-r from-[#B68989] via-[#FF00B4] to-[#8C0A0A]">
                      Electronics That 
                  </h1>
                  <h1 className="text-8xl bg-clip-text text-transparent bg-gradient-to-r from-[#B68989] via-[#FF00B4] to-[#8C0A0A]">
                  Elevate Your Lifestyle
                  </h1>
                </div>
                <div className="image -translate-y-1/2 overflow-hidden rounded-full translate-x-1/2 w-[35rem] h-[35rem] absolute top-1/2 right-0">
                  <img
                    className="w-full h-full object-cover"
                    src="/images/F_4.png"
                    alt="image"
                  />
                </div>
              </div>
              <div className="slide w-full h-screen flex justify-center items-center flex-shrink-0 relative">
                <div className="img1 absolute z-[3] left-[10%] top-130 -translate-y-1/3 w-[15rem] h-[15rem] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="/images/Griller_3.png"
                    alt="image"
                  />
                </div>
                <div className="img2 absolute z-[3] left-1/2 top-20 -translate-y-1/2 -translate-x-1/2 w-[25rem] h-[25rem] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="/images/AC_1.png"
                    alt="image"
                  />
                </div>
                <div className="image -translate-y-1/2 overflow-hidden rounded-full translate-x-1/2 w-[30rem] h-[30rem] absolute top-1/2 right-0">
                  <img
                    className="w-full h-full object-cover"
                    src="/images/TV_13.png"
                    alt="image"
                  />
                </div>
                <div className="w-[60%] text-center relative">
                  {/* <h3 className=" w-1/3 text-left font-semibold leading-7 tracking-tight text-[1.3rem] absolute top-0 left-0 -translate-y-1/2 -translate-x-1/3 text-yellow-700">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facere ad molestias dolore ab molestiae
                  </h3> */}
                  <h1 className="font-semibold text-[12rem] leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#b6b489] via-[#e38507] to-[#0c397c]">
                    ElectroEra
                  </h1>
                  <h3 className="text-3xl leading-none tracking-tight text-yellow-700">
                  Discover the latest in technology with our wide range of high-quality electronics. From smart gadgets and home appliances to cutting-edge entertainment systems, we offer personalized recommendations to match your needs.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-color="last" className="products section py-20">
          <h1 className="text-center font-semibold text-8xl bg-clip-text text-transparent bg-gradient-to-r from-[#B68989] via-[#FF00B4] to-[#8C0A0A]">
            Our Products
          </h1>
          <div className="list w-full px-10 h-fit mt-20">
            <div className="listelem border-b-3 border-black w-full py-[3rem] relative">
              <div className="relative z-[3] flex items-center justify-between ">
                <div className="left flex gap-20">
                  <h3 className="text-5xl text-gray-700">01</h3>
                  <h1 className="text-5xl"><Link to="/AC">Air Conditioners.</Link></h1>
                </div>
                <h3 className="text-3xl">Starting From 27001/-</h3>
              </div>
              <div className="picture opacity-0 absolute z[4] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-[15rem] overflow-hidden rounded-full">
              <img
                    className="w-full h-full object-cover"
                    src="/images/AC_18.png"
                    alt="image"
                  /></div>
              <div className="bluelayer bottom-0 left-0 z-[2] w-full h-[0%] bg-blue-400 absolute"></div>
            </div>
            <div className="listelem border-b-3 border-black w-full py-[3rem] relative">
              <div className="relative z-[3] flex items-center justify-between ">
                <div className="left flex gap-20">
                  <h3 className="text-5xl text-gray-700">02</h3>
                  <h1 className="text-5xl"><Link to="/Fridge">Refrigerators.</Link></h1>
                </div>
                <h3 className="text-3xl">Starting From 15290/-</h3>
              </div>
              <div className="picture opacity-0 absolute z[4] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-[15rem] overflow-hidden">
              <img
                    className="w-full h-full object-cover"
                    src="/images/F_3.1.png"
                    alt="image"
                  />
              </div>
              <div className="bluelayer bottom-0 left-0 z-[2] w-full h-[0%] bg-blue-400 absolute"></div>
            </div>
            <div className="listelem border-b-3 border-black w-full py-[3rem] relative">
              <div className="relative z-[3] flex items-center justify-between ">
                <div className="left flex gap-20">
                  <h3 className="text-5xl text-gray-700">03</h3>
                  <h1 className="text-5xl"><Link to="/WM">Washing Machines.</Link></h1>
                </div>
                <h3 className="text-3xl">Starting From 10700/-</h3>
              </div>
              <div className="picture opacity-0 absolute z[4] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-[15rem] overflow-hidden">
              <img
                    className="w-full h-full object-cover"
                    src="/images/WM_2.png"
                    alt="image"
                  />
              </div>
              <div className="bluelayer bottom-0 left-0 z-[2] w-full h-[0%] bg-blue-400 absolute"></div>
            </div>
            <div className="listelem border-b-3 border-black w-full py-[3rem] relative">
              <div className="relative z-[3] flex items-center justify-between ">
                <div className="left flex gap-20">
                  <h3 className="text-5xl text-gray-700">04</h3>
                  <h1 className="text-5xl"><Link to="/TV">Televisions.</Link></h1>
                </div>
                <h3 className="text-3xl">Starting From 34900/-</h3>
              </div>
              <div className="picture opacity-0 absolute z[4] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-[15rem] overflow-hidden ">
              <img
                    className="w-full h-full object-cover"
                    src="/images/TV_12.png"
                    alt="image"
                  />
              </div>
              <div className="bluelayer bottom-0 left-0 z-[2] w-full h-[0%] bg-blue-400 absolute"></div>
            </div>
            <div className="listelem border-b-3 border-black w-full py-[3rem] relative">
              <div className="relative z-[3] flex items-center justify-between ">
                <div className="left flex gap-20">
                  <h3 className="text-5xl text-gray-700">05</h3>
                  <h1 className="text-5xl"><Link to="/Oven">Ovens.</Link></h1>
                </div>
                <h3 className="text-3xl">Starting From 1749/-</h3>
              </div>
              <div className="picture opacity-0 absolute z[4] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-[15rem] overflow-hidden ">
              <img
                    className="w-full h-full object-cover"
                    src="/images/Oven_1.1.png"
                    alt="image"
                  />
              </div>
              <div className="bluelayer bottom-0 left-0 z-[2] w-full h-[0%] bg-blue-400 absolute"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
