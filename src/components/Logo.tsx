import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex w-16 h-16 m-2">
      <Image
        src="/img/logo-round.png"
        alt="NiceTripLogo"
        width={64}
        height={64}
        className="cursor-pointer"
      />
    </Link>
  );
};

export default Logo;
