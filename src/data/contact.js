// How visitors reach AlgoraX. Change these and every contact button on the site updates.
// whatsapp: international format, digits only (e.g. "9665XXXXXXXX"). Leave empty to hide the WhatsApp buttons.
// phone: shown and dialled as written (e.g. "+966 5X XXX XXXX"). Leave empty to hide the call buttons.
export const contact = {
    email: 'info@algorax.org',
    whatsapp: '966563664070',
    phone: '+966 56 366 4070',
};

export const whatsappLink = (text) =>
    contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}` : null;

export const phoneLink = () => (contact.phone ? `tel:${contact.phone.replace(/[^\d+]/g, '')}` : null);

export const emailLink = (subject) =>
    `mailto:${contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
