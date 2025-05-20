import React from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-600 to-gray-900 text-white p-5 md:p-4 shadow-lg">
      <div className="px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0 w-full md:w-2/2 pr-4">
            {" "}
            {/* // Adjusted width for About Us */}
            <h5 className="text-lg font-bold border-b border-gray-700 pb-2 mb-2">
              About Us
            </h5>
            <p className="text-sm mb-4">
              At ElectroEra, we are passionate about bringing you the latest in
              electronic innovation. Our mission is to provide top-quality
              products and exceptional service, ensuring that your shopping
              experience is seamless and enjoyable. Join us in exploring the
              future of technology! - <b>Who We Are</b>
              <br /> At ElectroEra, we are dedicated to revolutionizing your
              electronic shopping experience. Our team is committed to sourcing
              the latest and most innovative products to meet your needs.
              <br />
              <br />
              <li>
                <b>Our Mission</b> <br />
                Our mission is to empower customers with cutting-edge technology
                and exceptional service. We strive to provide a platform where
                quality meets convenience, making your online shopping
                effortless.
              </li>
              <br />{" "}
              <li>
                <b>What We Offer</b> <br />
                We offer a wide range of electronic products, from the latest
                gadgets to essential accessories, all curated to enhance your
                lifestyle. Our goal is to ensure you find exactly what you need
                at competitive prices.
              </li>
              <br />
              <li>
                <b>Customer Commitment</b>
                <br /> At ElectroEra, customer satisfaction is our top priority.
                We are here to assist you every step of the way, from browsing
                our selection to post-purchase support, ensuring a smooth and
                enjoyable experience.
              </li>
              <br />
              <li>
                {" "}
                <b>Join Us</b> <br />
                Explore the future of electronics with us! Whether you're a tech
                enthusiast or just looking for reliable products, ElectroEra is
                your go-to destination for all things electronic.
              </li>
            </p>
          </div>
          <div className="hidden md:block w-px bg-gray-700 mx-4"></div>
          <div className="mb-4 md:mb-0 w-full md:w-1/3">
            <h5 className="text-lg font-bold border-b border-gray-700 pb-2 mb-2">
              About Shop
            </h5>
            <p className="text-sm">
              <b>Shop Name:</b> Vimal Electronics
              <br />
              <b>Shop Address:</b> Shop No. 3/2 Bhagat Nagar, Near Sureliya
              Estate,
              <br />
              Vastral road, Amraiwadi, Ahmedabad, Gujarat-380026.
              <br />
              <b>Mobile No.:</b> +91 93136 91209
            </p>
            <div className="flex flex-col md:flex-row justify-between mt-6">
              <div className="mb-4 md:mb-0 w-full md:w-1/3">
                <h5 className="text-lg font-bold border-b border-gray-700 pb-2 mb-2">
                  Help
                </h5>
                <ul className="space-y-1">
                  <li>
                    <Link to="CustomerService" className="text-sm hover:underline">
                      Customer Service
                    </Link>
                  </li>
                  <li>
                    <Link to="Support" className="text-sm hover:underline">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link to="FAQs" className="text-sm hover:underline">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="ContactUs" className="text-sm hover:underline">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mb-4 md:mb-0 w-full md:w-1/3">
                <h5 className="text-lg font-bold border-b border-gray-700 pb-2 mb-2">
                  Follow Us
                </h5>
                <ul className="space-y-0">
                  <li>
                    <a href="https://www.facebook.com/vimalelectronics1986?rdid=liJRv6rbIAy0Ph9I&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F165ooeRnNP%2F#" className="text-sm hover:underline">
                      <FaFacebook className="text-xl inline-block hover:scale-110 transition-transform" />{" "}
                      Facebook
                    </a>
                  </li>
                  {/* <li>
                    <a href="#" className="text-sm hover:underline">
                      <FaTwitter className="text-xl hover:scale-110 inline-block transition-transform" />{" "}
                      Twitter
                    </a>
                  </li> */}
                  <li>
                    <a href="https://www.instagram.com/vimalelectronics/?hl=en" className="text-sm hover:underline">
                      <FaInstagram className="text-xl hover:scale-110 inline-block transition-transform" />{" "}
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ElectroEra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
