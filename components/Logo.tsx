type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <h1 className={`text-3xl font-bold ${className}`}>
      Tumpuk
    </h1>
  );
}