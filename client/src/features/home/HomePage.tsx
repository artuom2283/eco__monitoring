import React from 'react';
import './home.css';
import {AuthorsList} from "../../components/AuthorsList";
import {TopButton} from "../../components/Buttons/TopButton";

const Main = () => {
    return (
        <main className="main">
            <section>
                <article id="why-it-matters">
                    <h2>Environmental Monitoring in Dnipropetrovsk Region: Why It Matters</h2>
                    <p>
                        As one of the largest industrial regions, the Dnipropetrovsk region faces several environmental
                        challenges, including air, water, and soil pollution. Environmental monitoring helps identify
                        and track these issues in real time, ensuring a healthier environment for everyone.
                    </p>
                </article>
                <article id="how-it-works">
                    <h2>How Environmental Monitoring Works in the Dnipropetrovsk Region?</h2>
                    <p>
                        The Dnipropetrovsk region uses advanced technologies such as air quality sensors and weather
                        stations. These tools collect data, which is analyzed to inform strategies for reducing
                        pollution and improving public health.
                    </p>
                </article>
                <article id="improve-situation">
                    <h2>How Environmental Monitoring Helps Improve the Environmental Situation in the Dnipropetrovsk
                        Region</h2>
                    <p>
                        The data collected through environmental monitoring is used to develop solutions for reducing
                        pollution and adapting to climate changes, helping to make the Dnipropetrovsk region cleaner and
                        safer.
                    </p>
                </article>
            </section>
            <TopButton/>
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