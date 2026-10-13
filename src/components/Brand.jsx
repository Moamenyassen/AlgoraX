import logoIcon from '../assets/logo-icon.webp';

// Algora logo: the ribbon mark plus the wordmark. The wordmark stays in Latin letters in both languages.
const Brand = ({ light = false, className = '' }) => (
    <span className={`inline-flex items-center gap-2 ${className}`} dir="ltr">
        <img src={logoIcon} alt="" width="32" height="32" className="h-8 w-8" />
        <span className={`text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`} style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}>Algora</span>
    </span>
);

export default Brand;
