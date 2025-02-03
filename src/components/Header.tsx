import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import Input from "@/components/SearchBar"
const Header = () => {
  return (
    <header className="bg-[rgba(221,234,255,0.5)] z-20 mx-auto flex flex-wrap justify-between md:justify-normal w-full border-b border-gray-500 p-8">
            <Logo/>

            <Nav/>
    </header>
  )
}

export default Header