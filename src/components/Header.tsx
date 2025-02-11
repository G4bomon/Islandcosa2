import Nav from "@/components/Nav";
import Logo from "@/components/Logo";

const Header =  () => {

  return (
    <header className="bg-[rgba(221,234,255,0.5)] z-20 mx-auto flex flex-wrap justify-between md:justify-normal border-b-2 border-amber-400 pt-2 px-2 w-full">
        <Logo />
        <Nav />
    </header>
  );
};

export default Header;
