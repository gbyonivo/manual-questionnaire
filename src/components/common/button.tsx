interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button className={`px-4 py-2 ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
