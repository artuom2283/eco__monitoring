import React, { createElement as e } from 'react';
import './home.css';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';

const Main = () => {
  return e('main', { className: 'main' }, [
    e(
      'section',
      { key: 'section' },
      e(
        'article',
        { key: 'why-it-matters' },
        e('h2', null, 'Environmental Monitoring in Kyiv: Why It Matters'),
        e(
          'p',
          null,
          'As a large metropolis, Kyiv faces a range of environmental challenges, including air, water, and soil pollution. Environmental monitoring helps to identify and track these issues in real time, ensuring a healthier environment for all.'
        )
      ),
      e(
        'article',
        { key: 'how-it-works' },
        e('h2', null, 'How Environmental Monitoring Works in Kyiv?'),
        e(
          'p',
          null,
          'Kyiv uses advanced technologies such as air quality sensors and weather stations. These tools collect data, which is analyzed to inform strategies for reducing pollution and improving public health.'
        )
      ),
      e(
        'article',
        { key: 'improve-situation' },
        e('h2', null, 'How Environmental Monitoring Helps Improve Kyiv\'s Environmental Situation'),
        e(
          'p',
          null,
          'The data collected through environmental monitoring is used to develop solutions for reducing pollution and adapting to climate changes, helping to make Kyiv a cleaner, safer city.'
        )
      )
    )
  ]);
};

const HomePage = () => {
  return e('div', { className: 'container' }, [
    e(Header, { key: 'header' }),
    e(Main, { key: 'main' }),
    e(Footer, { key: 'footer' })
  ]);
};

export default HomePage;
