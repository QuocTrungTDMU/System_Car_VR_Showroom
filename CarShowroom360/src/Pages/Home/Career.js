import React from 'react';

const Career = () => {
    return (
        <div className='w-4/5 px-4 mx-auto my-8 py-4 md:py-8 bg-cyan-900 text-white'>
            <h2 className='text-center text-xl md:text-4xl pb-4 lg:pb-8 font-bold'>Global Career</h2>
            <div className='lg:mx-8'>
                <p >The Blackstone Carshop company offer jobs around the world. We hire people based on a combination of the quality of work, passion towards it and technological skill.</p>
                <p>Other than hiring for technical lead position we have many programs for fresh graduates:</p>
                <li className='font-semibold'>Internship program</li>
                <li className='font-semibold'>Trainee program of 3 months</li>
                <li className='font-semibold mb-4'>Campus Recruitment</li>

                <p>So drop your CV here:</p>
                <p className='link'>careerat@blackstone.carshop</p>
            </div>
        </div>
    );
};

export default Career;