import logoIcon from '../assets/logo-icon.webp';

// Algora logo: the ribbon mark plus the wordmark. The wordmark stays in Latin letters in both languages.
const Brand = ({ className = '' }) => (
    <span className={`inline-flex items-center gap-2.5 ${className}`} dir="ltr">
        <img src={logoIcon} alt="" width="34" height="34" className="h-[34px] w-[34px] drop-shadow-[0_0_12px_rgba(124,92,255,.6)]" />
        <span className="text-xl font-extrabold tracking-tight text-white" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}>Algora</span>
    </span>
);

export default Brand;
