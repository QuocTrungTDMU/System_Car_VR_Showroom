import React from 'react';

const Footer = () => {
    return (
        <div className='bg-cyan-900  p-10 mt-8 text-white'>
            <footer className="footer">
                <div>
                    <span className="footer-title">Products</span>
                    <div className="link link-hover">Exterior vehicle parts</div>
                    <div className="link link-hover">Interior function</div>
                    <div className="link link-hover">Innovative products</div>
                </div>
                <div>
                    <span className="footer-title">Blackstone Automotive</span>
                    <div className="link link-hover">About us</div>
                    <div className="link link-hover">Contact</div>
                    <div className="link link-hover">Careers</div>

                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <div className="link link-hover">Terms of use</div>
                    <div className="link link-hover">Privacy policy</div>
                    <div className="link link-hover">Cookie policy</div>
                </div>

            </footer>
            <div className='text-center pt-8'>
                <p>All Rights Reserved, Blackstone Automotive </p>
                <p><small>Copyright &copy; 2022</small></p>
            </div>
        </div>
    );
};

export default Footer;