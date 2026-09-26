import React from 'react';
import './StarBorder.css';

export type StarBorderProps<T extends React.ElementType = 'button'> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
};

export const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = '#F59E0B',
  speed = '6s',
  thickness = 1,
  backgroundColor = '#050810',
  textColor = '#ffffff',
  borderColor = 'rgba(245, 158, 11, 0.35)',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`star-border-container relative inline-block overflow-hidden rounded-[20px] ${className}`.trim()}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style
      }}
    >
      <div
        className="star-movement-bottom absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div
        className="star-movement-top absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div
        className="star-border-content relative z-1 border text-center text-[16px] py-[16px] px-[26px] rounded-[20px]"
        style={{ background: backgroundColor, color: textColor, borderColor }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
