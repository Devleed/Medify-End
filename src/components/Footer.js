import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
              Medify is a basic medicine search engine. It provides vast amount
              of medicines, along with their category, price and availibilty in
              Pakistan.
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-as">
              <li>
                <a href="http://scanfcode.com/category/c-language/">React JS</a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/front-end-development/">
                  HTML 5
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/back-end-development/">
                  CSS 3 <br />
                  (semantic ui <br />
                  bootstrap) <br />
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/java-programming-language/">
                  Firebase
                </a>
              </li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick as</h6>
            <ul className="footer-as">
              <li>
                <a href="http://scanfcode.com/about/">About Us</a>
              </li>
              <li>
                <a href="http://scanfcode.com/contact/">Contact Us</a>
              </li>
              <li>
                <a href="http://scanfcode.com/contribute-at-scanfcode/">
                  Contribute
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/privacy-policy/">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/sitemap/">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2020 All Rights Reserved by
              <a href="https://www.linkedin.com/in/waleed-mujahid-288a13196/">
                {" "}
                Mamji & co{" "}
              </a>
              .
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li>
                <a
                  className="facebook"
                  href="https://www.facebook.com/waleed.mujahid.58"
                >
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a className="twitter" href="https://twitter.com/home">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  className="aedin"
                  href="https://www.aedin.com/in/waleed-mujahid-288a13196/"
                >
                  <i className="fa fa-aedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
