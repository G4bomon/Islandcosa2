import Image from "next/image"
const Logo = () => {
    return (
        <div className="flex h-16">
            <Image
                src="/img/logo-round.png"
                alt="NiceTripLogo"
                width={64}
                height={64}
            />
        </div>
    )
}

export default Logo