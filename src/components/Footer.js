import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ background: '#292618ff', color: '#fff' }} className="pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h4 className="font-weight-bold">StudyMate</h4>
            <p>Empowering Students & Educators with seamless collaboration and learning tools.</p>
            <div className="d-flex">
              <a href="#" className="text-white mr-3"><FaFacebookF /></a>
              <a href="#" className="text-white mr-3"><FaTwitter /></a>
              <a href="#" className="text-white mr-3"><FaInstagram /></a>
              <a href="#" className="text-white"><FaLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5 className="font-weight-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Home</a></li>
              <li><a href="#" className="text-white">Features</a></li>
              <li><a href="#" className="text-white">About</a></li>
              <li><a href="#" className="text-white">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3 mb-4">
            <h5 className="font-weight-bold">Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Documentation</a></li>
              <li><a href="#" className="text-white">Help Center</a></li>
              <li><a href="#" className="text-white">Community</a></li>
              <li><a href="#" className="text-white">Blog</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-3 mb-4">
            <h5 className="font-weight-bold">Subscribe</h5>
            <p>Get updates on new features and releases.</p>
            <form>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <button type="submit" className="btn btn-light btn-sm font-weight-bold px-3">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <hr style={{ borderColor: '#ADEED9' }} />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} StudyMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
