import { motion as Motion } from 'framer-motion';

const Logo = ({ className = "h-10 w-auto", glow = true }) => {
    return (
        <Motion.div
            className={`relative flex items-center justify-center ${className}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            {/* Glow Effect */}
            {glow && (
                <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse" />
            )}

            <img
                src="/logo.png"
                alt="AlgoraX Logo"
                className="relative z-10 w-full h-full object-contain"
            />
        </Motion.div>
    );
};

export default Logo;
