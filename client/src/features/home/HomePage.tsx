import React from 'react';
import './home.css';
import {AuthorsList} from "../../components/AuthorsList";

const Main = () => {
    return (
        <main className="main">
            <section>
                <article id="why-it-matters">
                    <h2>Environmental Monitoring in Kyiv: Why It Matters</h2>
                    <p>
                        As a large metropolis, Kyiv faces a range of environmental challenges, including air, water, and
                        soil pollution. Environmental monitoring helps to identify and track these issues in real time,
                        ensuring a healthier environment for all.
                    </p>
                </article>
                <article id="how-it-works">
                    <h2>How Environmental Monitoring Works in Kyiv?</h2>
                    <p>
                        Kyiv uses advanced technologies such as air quality sensors and weather stations. These tools
                        collect data, which is analyzed to inform strategies for reducing pollution and improving public
                        health.
                    </p>
                </article>
                <article id="improve-situation">
                    <h2>How Environmental Monitoring Helps Improve Kyiv's Environmental Situation</h2>
                    <p>
                        The data collected through environmental monitoring is used to develop solutions for reducing
                        pollution and adapting to climate changes, helping to make Kyiv a cleaner, safer city.
                    </p>
                </article>
            </section>
        </main>
    );
};

const HomePage = () => {
    return (
        <div className="container">
            <Main/>
            <AuthorsList/>
        </div>
    );
};

export default HomePage;