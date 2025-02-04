import Image from "next/image"
const Logo = () => {
    return (
        <div className="flex w-16 h-16 m-2">
            <Image
                src="/img/logo-round.png"
                alt="NiceTripLogo"
                width={64}
                height={64}
                className=""

            />
        </div>
    )
}

export default Logo