import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Career from './Career';
import Innovative from './Innovative';
import Products from './Products';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Reviews></Reviews> 
            <Career></Career>
            <BusinessSummary></BusinessSummary>
            <Innovative></Innovative>
        </div>
    );
};

export default Home;