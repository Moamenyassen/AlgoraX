import { createElement } from 'react';

// Fades and lifts its children into view on scroll (see useSiteMotion).
const Reveal = ({ as = 'div', delay = 0, className = '', style, children, ...rest }) =>
    createElement(as, { className: `reveal ${className}`, style: { '--d': `${delay}ms`, ...style }, ...rest }, children);

export default Reveal;
