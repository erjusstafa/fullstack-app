export interface ImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}