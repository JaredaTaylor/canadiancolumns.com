"use client";
/* TODO:
    - style contact section
    - setup contact form
    - SEO
    - links to social media
*/

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image';
import Head from 'next/head';

const companyInfo = {
  name: "Canadian Columns",
  email: "info@canadiancolumns.ca",
  number: "905-447-5728",
  logo: "/img/cc_logo_50.png",
};

const testimonialsData = [
  { quote: "Thank you so much for the exceptional column work you and your team did on our home. We are extremely pleased with how our home looks.", name: "Bill & Ornella" },
  { quote: "Great workmanship. Excellent service. Pleasure to work with. Very professional. Thank you!", name: "Mahmood from Claremont" },
  { quote: "The crew arrived on time, were professional and completed the job with high attention to detail and thoroughness. We are very pleased with the job that they did.", name: "Dominic from Pickering" },
  { quote: "The guys were AMAZING! The columns look better than I ever imagined. They cleaned up everything. They were friendly but worked so hard.", name: "Deborah from Brooklin" },
  { quote: "Fantastic job on the columns. The installers were very efficient and friendly and great with the cleanup. I will recommend you to any of our neighbours.", name: "Colleen & Steve" },
  { quote: "Thank you for the fast and excellent workmanship in replacing the damaged and rotten column on our porch. It is such a pleasure now to come home and see the nice white post on our porch. My husband and I were both very surprised that the whole project was completed so very quickly. We will for sure recommend your company.", name: "Martje & Dieter" },
  { quote: "We are very pleased with the finished product, the install, and the customer service. The new posts are exactly what we envisioned. The crew were here, done and gone in a morning.", name: "Steve & Lesley from Oshawa" },
  { quote: "I would like to thank you for the great service your company did on replacing my columns that were rotting that were holding my house up. It’s a great comfort on knowing I don’t have to worry about them again your workers did an efficient and well done job. I would recommend your company to anyone who has the same problem we had.", name: "Brian Frith from Brooklin" },
  { quote: "I needed to replace one of the columns on the front façade of my house, and I shopped around mostly in the West End/East End. I got four quotes, but only one company came to my house in person. I met with them on June 17th, 2015. He was punctual and pleasant. He took pictures of my old column and then emailed me a reasonable quote. I also got him to paint my column, and he did a great job. He straightforwardly told me that he would not be able to finish my column until September, but I was satisfied with that. He surprised me by finishing in only one month. The team at Canadian Columns did an amazing job. The finished product is beyond expectations. I will definitely call them in the future.", name: "Arlene Tansingco from Pickering" },
  { quote: "We had our porch pillars replaced June 2015. We are very pleased with the finished product, the install, and the customer service. The new posts are exactly what we envisioned. The crew were here, done and gone in a morning. They were a pleasure to deal with and he a great sense of humour. I have already recommended Canadian Columns to friends and will continue to do so.", name: "Steve & Lesley from Oshawa" },
  { quote: "Thank you for excellent work! We needed to replace our front porch pillars as they were rotten. We contacted Canadian Columns for a quote. Shortly after initial contact they provided us with a detailed estimate on the spot. We selected the type and color of pillars and waited for the work to commence. He was great with communication by phone and email. The day before work started he called us and confirmed all details pertaining to next day`s work. Two installers arrived the next day and did excellent work. They were courteous, accommodating and professional. We would definitely recommend Canadian Columns to others!", name: "Tom & Andie" },
  { quote: "The staff at Canadian Columns do excellent work. We are very satisfied with all the work completed on a timely manner. I would highly recommend this company.", name: "Donna from Markham" },
  { quote: "They were very professional and helpful with my questions and coordinating the appointments. All in all a very positive experience. Would definitely work with Canadian Columns again.", name: "Jeff & Andrea" },
  { quote: "Fantastic job on the columns. The installers were very efficient and friendly and great with the cleanup. Other than the new columns there was not a trace of any workers here. I will recommend you to any of our neighbours.", name: "Colleen & Steve" },
  { quote: "Thank you so much for the exceptional column work you and your team did on our home. We are extremely pleased with how our home looks.", name: "Bill & Ornella Lynch" },
  { quote: "The whole experience with the company was great. The initial phone call I placed was answered in timely manner, appointment was made and kept as organized. The appointment itself was informative and professionally presented. Two young men that came to do the installation were very polite and professional. If need be we will use your services again and we definitely recommend your company to others.", name: "Natalia & Lenard from Ajax" },
  { quote: "We were extremely happy with the columns and installation.The work performed was very accurate, detailed and precise. The colour we chose was perfect and wellmatched. Overall, we would highly recommend Canadian Columns and we will use them again.", name: "Peter from Whitby" },
  { quote: "Awesome. Thanks so much for everything Canadian Columns. We appreciate the quick and professional job that was done. We will spread the good word.", name: "Lori" },
  { quote: "We were very pleased with the great job Canadian Columns did for us on our columns on our front porch. We recommended them to our neighbours and their work also looks great.", name: "Anonymous" },
  { quote: "The crew were super nice and explained everything. There was nothing to clean up when they left. Canadian Columns followed up with me after the work was complete. I mentioned one issue and he said they will come back in the spring to check the install due to the cold and recaulk the contact points to make sure everything is perfect. Extremely happy with the work.", name: "Libby from Richmond Hill" },
  { quote: "When Canadian Columns came to the house, he gave me the pricing and answered all my questions. I knew I had found the right person for the job. After it was completed I was satisfied with the work and the place being left clean.", name: "Hardip from Vaughan" },
  { quote: "My experience with CC has been more than pleasing as he installs trust, honesty, excellent work, good advise professionally and when he was finished, the clean up back to normal is great!", name: "Raymond from Caesarea" },
  { quote: "Fast and excellent workmanship in replacing the damaged and rotten column on our porch. It is such a pleasure now to come home and seeing the nice white post on our porch. My husband and I were both very surprised that the whole project was completed so very quickly.", name: "Martje & Dieter" },
  { quote: "Another job well done. I would highly recommend Canadian Columns for their professionalism, great prices and job done well and within the time frame promised. Way to go crew.", name: "Abe & Lenka Gunda" },
  { quote: "We were very impressed with your professionalism, your hard working team and your ability to get the project done to our satisfaction and on time. We were especially pleased that throughout the duration of this project, you were in touch with us regularly to answer any questions or concerns we may have had and keep us informed of the next step. This project has truly transformed the look of our house and greatly improved curb appeal.", name: "Carm & Dave Samalea" },
  { quote: "I just want to say thanks for a great job on my new columns in the front of my house. They look fabulous and you and your workers did an awesome job in taking out the old wooden ones and installing the new ones. You even took the extra step and replaced the aluminum bulk head on my porch with no extra cost to which I totally appreciate.", name: "Karen Duwyn" },
  { quote: "The new columns look awesome and we are very happy with the outcome. Your installers were incredibly efficient and very professional. Not to mention we thank you for your professional approach, management of this project, and the ease at which this was carried out. The process was totally stress free and refreshing to say the least. Moving forward, we look forward to the many maintenance free years ahead.", name: "Phil Sanders from Brampton" },
  { quote: "Thanks again for an outstanding job. We`ve used your services and expertise for several properties now and we are grateful for your attention to detail and quality workmanship. One thing that we truly appreciate is your commitment to the job. You show up daily and never let other jobs interfere with the progress on our homes. This is rare and again we are thankful.", name: "Richard from Toronto" },
];

const landingImages = [
  "/img/house_columns_01.jpg",
  "/img/house_columns_02.jpg",
  "/img/house_columns_03.jpg",
  "/img/house_columns_04.jpg",
];

const galleryImages = [
  "/gallery/cc_1.jpg",
  "/gallery/cc_2.jpg",
  "/gallery/cc_3.jpg",
  "/gallery/cc_4.jpg",
  "/gallery/cc_5.jpg",
  "/gallery/cc_6.jpg",
  "/gallery/cc_7.jpg",
  "/gallery/cc_8.jpg",
  "/gallery/cc_9.jpg",
  "/gallery/cc_10.jpg",
];

const landingQuotes = [
  "Professional, experienced & Reliable Service",
  "Painted & maintenance free fiberglass pillars",
  "Get a free estimate for your replacement columns"
];

// BEFORE AFTER COMPONENT
const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(70);
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Adjust aspect ratio based on the image size
    const img = document.createElement("img");
    img.src = "/compare/after_2_cropped.jpg";
    img.onload = () => {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isDragging]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(event.target.value));
  };

  return (
    <div ref={containerRef} className="relative w-full mx-auto lg:" style={{ aspectRatio }}>
      {/* AFTER Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/compare/after_2_cropped.jpg"
          alt="After Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          priority={true}
        />
      </div>

      {/* BEFORE Image (Top Layer) */}
      <div
        className="absolute inset-0 h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <Image
          src="/compare/before_2_cropped.jpg"
          alt="Before Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          priority={true}
        />
      </div>

      {/* DIVIDER LINE */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `${sliderPosition}%`, width: "4px", backgroundColor: "white", transform: "translateX(-50%)" }}
      ></div>

      {/* BEFORE/AFTER LABELS */}
      <div
        className="absolute top-2 right-4 text-white text-lg font-bold bg-black bg-opacity-50 px-2 py-1 rounded transition-opacity duration-300"
        style={{ opacity: sliderPosition < 90 ? 1 : 0 }}
      >
        BEFORE
      </div>
      <div
        className="absolute top-2 left-4 text-white text-lg font-bold bg-black bg-opacity-50 px-2 py-1 rounded transition-opacity duration-300"
        style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
      >
        AFTER
      </div>

      {/* SLIDER */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 bg-white text-black rounded-full shadow-lg cursor-pointer"
        style={{ left: `${sliderPosition}%`, transform: "translate(-50%, -50%)" }}
      >
        &lt; &gt;
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="absolute left-0 w-full h-full top-0 z-10 cursor-pointer bg-transparent appearance-none opacity-0"
      />
    </div>
  );
};


// MAIN PAGE
const HomePage: React.FC = () => {
  // Testimony
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [fade, setFade] = useState("opacity-100");

  // Services
  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  // landing section
  const [currentImage, setCurrentImage] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  // TESTIMONY SECTION
  useEffect(() => {
    const interval = setInterval(() => {
      setFade("opacity-0");
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
        setFade("opacity-100");
      }, 1000); // Slow down the transition
    }, 8000);

    return () => clearInterval(interval);
  }, [currentTestimonial]);

  const handleNext = () => {
    setFade("opacity-0");
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
      setFade("opacity-100");
    }, 400); // Slow down the transition
  };

  const handlePrevious = () => {
    setFade("opacity-0");
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
      setFade("opacity-100");
    }, 400); // Slow down the transition
  };

  // SERVICES SECTION
  useEffect(() => {
    const handleScroll = () => {
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.90 && rect.bottom >= window.innerHeight * 0.10) {
          setServicesVisible(true);
        } else {
          setServicesVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LANDING SECTION
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % landingImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % landingQuotes.length);
    }, 8000);

    return () => clearInterval(quoteInterval);
  }, []);


  // GALLERY SECTION
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState(0);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const openModal = (index: number) => {
    setCurrentModalImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Header
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Canadian Columns",
          "url": "https://canadiancolumns.ca",
          "telephone": "905-447-5728",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Main Street",
            "addressLocality": "Toronto",
            "addressRegion": "ON",
            "postalCode": "M1A 1A1",
            "addressCountry": "CA"
          },
          "openingHours": "Mo-Fr 09:00-17:00",
          "image": "https://canadiancolumns.ca/img/logo.png"
        }
      </script> */}
      <Head>
        <link rel="icon" href="/img/home-favicon.ico" />
        <title>Canadian Columns | High-Quality Fiberglass Columns & Installations</title>
        <meta name="description" content="Canadian Columns specializes in high-quality fiberglass columns, pillars, and posts with lifetime warranties and professional installation." />
      </Head>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        {/* Navigation */}
        <nav className="bg-[#FF0000] text-white py-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image src={companyInfo.logo} alt="Company Logo" width={30} height={30} priority={true} />
              <h1 className="text-2xl font-bold">{companyInfo.name}</h1>
            </div>
            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
            {/* Menu Items */}
            <ul
              className={`lg:flex lg:space-x-2 lg:items-center lg:justify-end text-center p-4 lg:p-0 ${menuOpen ? "block" : "hidden"} absolute lg:static bg-[#FF0000] top-16 left-0 w-full lg:w-auto lg:flex-row`}
            >
              {[
                { name: "About", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Gallery", href: "#gallery" },
                { name: "Testimonials", href: "#testimonials" },
                { name: "Contact", href: "#contact" }
              ].map((item, index) => (
                <li key={index} className="lg:inline-block w-full lg:w-auto text-center py-2 lg:py-0 shadow-md lg:shadow-none bg-white lg:bg-transparent text-[#FF0000] lg:text-white rounded-md my-2 lg:my-0">
                  <a
                    href={item.href}
                    className="block w-full py-2 px-4 hover:bg-[#FF0000] hover:text-white rounded-md transition lg:hover:bg-transparent lg:hover:underline"
                    onClick={handleMenuItemClick}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>


        {/* Landing Section */}
        <section className="relative w-full h-[calc(100vh-64px)] bg-black">
          <div className="absolute inset-0 z-0">
            {landingImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Landing Background ${index + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
                priority={true}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-30 flex flex-col justify-center items-center text-white px-4 text-center">
            <div className="overflow-hidden h-24 relative">
              <div
                className="inline-block whitespace-nowrap relative transition-transform duration-[1500ms]"
                style={{ transform: `translateX(-${currentQuote * 100}%)` }}
              >
                {landingQuotes.map((quote, index) => (
                  <h1
                    key={index}
                    className={`xs:text-1x1 sm:text-2xl md:text-3xl lg:text-4xl uppercase font-bold inline-block w-full text-center whitespace-normal break-words`}
                  >
                    {quote}
                  </h1>
                ))}
              </div>
            </div>
            <hr className="border-t border-white w-1/2 mb-4" />
            <p className="text-sm md:text-xl">SERVING THE PETERBOROUGH, KAWARTHA & DURHAM AREAS</p>
          </div>
        </section>



        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto lg:px-20 px-6"> {/* Check sizing on mobile for padding */}
            <div className="pb-10">
              <h2 className="text-2xl font-semibold mb-4 text-center">About Us</h2>
              <h3 className="text-xl font-semibold mb-4 text-center">Pillar & Column Replacement</h3>
              <p className="text-gray-700 pb-4 justify-center">
                Canadian Columns specializes in replacing exterior architectural columns and pillars. We have over 15 years experience in providing professional and reliable service to both residential and commercial customers. Customer service and satisfaction are the cornerstones of our business. We only finish when the customer is fully satisfied and the job site is as clean as the day we started.
              </p>
              <p className="text-gray-700 pb-4 text-justify">
                We have replaced hundreds of columns and pillars throughout the GTA. All our columns are maintenance free fiberglass, painted to the colour of your choosing, and come with a lifetime warranty. We never outsource our work. We trust our team of highly trained specialists to uphold our strict standards of craftsmanship.
              </p>
              <p className="text-gray-700 pb-4 text-justify">
              We serve the Peterborough, Kawartha Lakes and Durham Region areas. This includes Lindsay, Fenelon Falls, Omemee, Woodville, Bobcaygeon, Havelock, Apsley, Bridgenorth, Norwood, Lakefield, Port Perry, Brooklin, Uxbridge, Whitby, Oshawa, Ajax and Pickering. If you live in any of these areas, we would be happy to meet with you and provide a free estimate to replace your columns.
              </p>
              <p className="text-gray-700 pb-1 text-center">
                Contact us today for your free estimate.
              </p>
              <p className="text-xl text-gray-700 text-center">
              <a href={`tel:${companyInfo.number}`} className="text-xl text-gray-700 align-center">{companyInfo.number}</a>
              </p>
              <p className="text-gray-700 text-center">
                No person-to-person contact required. We can quote, install and invoice without having to meet in person.
              </p>
            </div>
            {/* 916x574 */}
            {/* <div className="relative w-full h-auto">
              <Image
                src="/img/16foot_before_after.jpg"
                alt="Before and after photo"
                layout="responsive"
                width={100}
                height={50} // Adjust aspect ratio (50 for 2:1, 75 for 4:3, etc.)
                objectFit="cover" // Use "contain" if you don't want cropping
                className="rounded-lg"
              />
            </div> */}
            <div className="container lg:px-40">
              <BeforeAfterSlider />
            </div>
            <div className="pt-10">
              <h3 className="text-xl font-semibold mb-4 text-center">The Difference</h3>
              <p className="text-gray-700 text-center">
                Unlike our competitors, Canadian Columns does NOT install raw fiberglass columns. We pride ourselves in delivering painted, maintenance free, fiberglass columns to our customers.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div
            ref={servicesRef}
            className={`container mx-auto px-4 text-center transition-all duration-500 transform ${
              servicesVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[ 
                { title: "MATERIALS", desc: "We only use high-quality fiberglass columns, pillars and posts. They provide a high weight load, superior durability and improved value on your investment. Fiberglass is substantially more reliable than aluminum or wood, and more appropriate for long-term use as they will not deteriorate over time. They are maintenance free, have a lifetime warranty, and minor damage can easily be repaired." },
                { title: "STYLES", desc: "The combinations available for architectural styles and colours are nearly unlimited. Various styles include round, square, fluted, recessed, tapered, taperless, barreled or paneled. Plus, other specialty styles are available. Whether you are building a new home from scratch, want to match your old columns, or are completing a historical restoration, we can match your style perfectly." },
                { title: "PAINTING", desc: "You choose your colour. Our paint specialists can create stunning columns with any colour code. We use only the highest-quality paint and provide a full lifetime warranty." },
                { title: "INSTALLATION", desc: "Our installation team is honest and professional. We provide a thorough inspection of your portico or balcony, and complete a detailed clean up after your column replacement." }
              ].map((service, index) => (
                <div key={index} className="p-4 bg-white shadow-md flex items-center justify-center text-center h-full">
                  <div>
                    <h3 className="text-lg font-bold">{service.title}</h3>
                    <p className="text-gray-600">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 transition-all duration-600 overflow-hidden ${expanded ? "max-h-[9999px]" : "max-h-[800px]"}`}>
              {galleryImages.slice(0, expanded ? galleryImages.length : 6).map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer overflow-hidden rounded-lg w-full h-48 md:h-64 lg:h-80"
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
            {!expanded && (
              <button
                onClick={toggleExpanded}
                className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
              >
                Show More ▼
              </button>
            )}
            {expanded && (
              <button
                onClick={toggleExpanded}
                className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
              >
                Show Less ▲
              </button>
            )}
          </div>

          {/* Image Modal */}
          {isModalOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
              onClick={closeModal}
            >
              <div 
                className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh] w-full h-full"
              >
                <Image
                  src={galleryImages[currentModalImage]}
                  alt={`Gallery Modal Image ${currentModalImage + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-white bg-red-600 p-2"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-50 transition-all duration-500 ease-in-out overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
            <div
              className="p-6 bg-white shadow-md transition-all"
            >
              <blockquote
                className={`transition-opacity duration-1000 ${fade} text-gray-600 text-lg`}
              >
                {testimonialsData[currentTestimonial].quote}
              </blockquote>
              <p
                className={`transition-opacity duration-1000 ${fade} text-sm text-gray-500 mt-2`}
              >
                - {testimonialsData[currentTestimonial].name}
              </p>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
            <button
                onClick={handlePrevious}
                className="text-[#FF0000]"
              >
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
              <button
                onClick={handleNext}
                className="text-[#FF0000]"
              >
                <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">Have a question or need a quote? Feel free to reach out to us.</p>
            <div className="flex flex-col items-center space-y-4">
              {/* <a href={`mailto:${companyInfo.email}?subject=Inquiry%20about%20Fiberglass%20Columns`} className="text-blue-600 hover:underline text-lg">{companyInfo.email}</a> */}
              <a href={`tel:${companyInfo.number}`} className="text-blue-600 hover:underline text-lg">{companyInfo.number}</a>
              <form name="contact" method="POST" data-netlify="true">
                <p>
                  <label>Your Name: <input type="text" name="name" /></label>
                </p>
                <p>
                  <label>Your Email: <input type="email" name="email" /></label>
                </p>
                <p>
                  <label>Message: <textarea name="message"></textarea></label>
                </p>
                <p>
                  <button type="submit">Send</button>
                </p>
              </form>
              {/* <button
                onClick={() => window.open("https://forms.gle/YOUR_GOOGLE_FORM_URL", "_blank", "width=600,height=800")}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 shadow-md transition"
              >
                Open Contact Form
              </button> */}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto space-x-4 pb-4 text-center">
            <a
              href="https://www.facebook.com/profile.php?id=61569483483877"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-red-600 hover:text-red-800 text-2xl" />
            </a>
            <a
              href="https://www.instagram.com/canadiancolumns/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-red-600 hover:text-red-800 text-2xl" />
            </a>
          </div>
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;