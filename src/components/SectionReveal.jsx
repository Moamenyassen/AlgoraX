import { motion as Motion } from 'framer-motion';

const SectionReveal = ({ children, className = "", delay = 0 }) => {
    return (
        <Motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </Motion.div>
    );
};

export default SectionReveal;
