import mindoIcon from '../assets/mindo-icon.svg';

const MindoMark = ({ size = 32, className = '' }) => (
    <img src={mindoIcon} alt="" width={size} height={size} className={className} style={{ width: size, height: size }} />
);

export default MindoMark;
