import React from 'react';
import InputForm from '../components/InputForm';

const Home = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Build Your Personal Brand</h1>
                <p className="text-muted-foreground">
                    Enter your details, choose a theme, and let AI generate your professional portfolio.
                </p>
            </div>
            <InputForm />
        </div>
    );
};

export default Home;
