import { Link as RouterLink } from "react-router-dom";

function Btn({to, children,text, variant = 'primary', className = '', ...props }) {
  const base = 'px-6 py-2 rounded-full font-medium transition';
  const variants = {
    primary: 'bg-customPurple text-white hover:bg-indigo-900',
    outline: 'border border-indigo-500 text-indigo-500 hover:bg-indigo-100',
  };
  const content = children || text;
  if (to) {
    return (
      <RouterLink to={to} className={`${base} ${variants[variant] || ''} ${className}`}>
        {content}
      </RouterLink>
    );
  }
  return (
    <button className={`${base} ${variants[variant] || ''} ${className}`} {...props}>
      {text}
    </button>
  );
}

export default Btn;
