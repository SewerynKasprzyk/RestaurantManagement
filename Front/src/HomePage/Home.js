import React from 'react';
import classNames from 'classnames';
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            <div className={classNames('section', 'banner')}>
                <h1 className="banner-title">Welcome to our restaurant <span
                    className="restaurant-name">[Name here]</span></h1>
            </div>
            <div className={classNames('section', 'speciality')}>
                <h2 className="speciality-title">Our Speciality</h2>
                <div className="speciality-images">
                    <img
                        src="https://static01.nyt.com/images/2014/12/31/dining/20141231-DISHES-slide-921Q/20141231-DISHES-slide-921Q-superJumbo.jpg"
                        alt="Speciality 1" className="speciality-image"/>
                    <img
                        src="https://berriesandspice.com/wp-content/uploads/2018/08/Berries-and-Spice-How-to-plate-dishes-worthy-of-a-fine-dining-restaurant-the-complete-guide-23-scaled.jpg"
                        alt="Speciality 2" className="speciality-image"/>
                    <img src="https://robbreport.com/wp-content/uploads/2019/12/sorrel-cappelletti-1.jpg?w=1000"
                         alt="Speciality 3" className="speciality-image"/>
                </div>
            </div>
            <div className={classNames('section', 'about-us')}>
                <img src="https://snibbs.co/cdn/shop/articles/Pros_and_Cons_of_Being_a_Chef_1000x667.jpg?v=1688650492"
                     alt="About Us" className="about-us-image"/>
                <h2 className="about-us-title">About Us</h2>
            </div>
            <div className={classNames('section', 'trusted')}>
                <h2 className="trusted-title">Have trusted us</h2>
            </div>
            <div className={classNames('section', 'credentials')}>
                <ul className="credentials-list">
                    <li>Seweryn Kasprzyk</li>
                    <li>Jakub Gawlik</li>
                    <li>Jakub Dudek</li>
                    <li>Filip Sołtysik</li>
                    <li>Olaf Wnęczak</li>
                </ul>
            </div>
        </div>
    );
}
