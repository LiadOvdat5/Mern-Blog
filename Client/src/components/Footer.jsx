import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function FooterCom() {
  const aboutLinks = [
    { href: "https://liads-portfolio.netlify.app/", text: "Portfolio" },
    { href: "/about", text: "Liad's Blog" },
  ];

  const followLinks = [
    { href: "https://github.com/LiadOvdat5", text: "Github" },
    {
      href: "https://www.linkedin.com/in/liad-ovdat-developer1/",
      text: "LinkedIn",
    },
  ];

  const legalLinks = [
    { href: "#", text: "Privacy Policy" },
    {
      href: "/#",
      text: "Terms & Conditions",
    },
  ];

  const FooterLink = ({ href, text }) => (
    <Footer.Link href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </Footer.Link>
  );

  FooterLink.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-col-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg
              sm:text-xl font-semibold dark:text-white"
            >
              <span
                className="px-2 py-1 bg-gradient-to-r from-indigo-500
             via-purple-500 to-pink-500 rounded-lg text-white"
              >
                {" "}
                Liad&apos;s{" "}
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                {aboutLinks.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={link.href}
                    text={link.text}
                  />
                ))}
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow me" />
              <Footer.LinkGroup col>
                {followLinks.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={link.href}
                    text={link.text}
                  />
                ))}
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                {legalLinks.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={link.href}
                    text={link.text}
                  />
                ))}
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Liad Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://www.linkedin.com/in/liad-ovdat-developer1/"
              icon={FaLinkedin}
            />
            <Footer.Icon href="https://github.com/LiadOvdat5" icon={FaGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
