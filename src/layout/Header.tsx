import {createElement as e} from "react";
import {Link} from "react-router-dom";

export const Header = () => {
    return e('header', { className: 'header' }, [
        e('h1', { key: 'header-title' }, 'Environmental monitoring of Kyiv'),
        e('nav', { key: 'nav' },
            e(Link, { to: '/', className: 'nav-link' }, 'About'),
            e(Link, { to: '/pollution', className: 'nav-link' }, 'Data Management'),
        )
    ]);
};