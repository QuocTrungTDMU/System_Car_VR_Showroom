import { faBuilding, faFlag, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const BusinessSummary = () => {
    return (
        <div className='w-4/5 mx-auto my-8 py-4 md:py-8 bg-teal-50'>
            <h2 className='text-center text-xl md:text-4xl pb-4 lg:pb-10 font-bold text-secondary'>At A Glance</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                <div className='text-center'>
                    <h1><FontAwesomeIcon className='h-16' icon={faBuilding}></FontAwesomeIcon></h1>
                    <h2 className='text-lg pt-2'>Established</h2>
                    <h1 className='text-xl font-semibold text-secondary lg:text-3xl'>1978</h1>
                </div>
                <div className='text-center'>
                    <h1><FontAwesomeIcon className='h-16' icon={faFlag}></FontAwesomeIcon></h1>
                    <h2 className='text-lg pt-2'>Business Presence</h2>
                    <h1 className='text-xl font-semibold text-secondary lg:text-3xl'>In 80 Countries</h1>
                </div>
                <div className='text-center'>
                    <h1><FontAwesomeIcon className='h-16' icon={faScrewdriverWrench}></FontAwesomeIcon></h1>
                    <h2 className='text-lg pt-2'>Manufacturing plant and R&D facilities</h2>
                    <h1 className='text-xl font-semibold text-secondary lg:text-3xl'>120</h1>
                </div>

            </div>
        </div>
    );
};

export default BusinessSummary;