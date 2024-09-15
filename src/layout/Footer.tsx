import {createElement as e} from "react";

export const Footer = () => {
    return e('footer', { className: 'footer' }, [
        e('h3', { key: 'footer-text' }, '© 2024 Environmental monitoring of Kyiv')
    ]);
};