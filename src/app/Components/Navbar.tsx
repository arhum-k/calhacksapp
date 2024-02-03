
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="text-3xl text-black w-full font-salvatore ">
            <div className="flex justify-between items-center h-full w-full pl-4 ">
                <div className="flex pl-4 pt-2 items-center  ">
                    <Image src="/calhacks.png" alt="calhackslogo" width="100" height="100" />
                    <Link href="/" passHref>
                        <h1 className="">CalHacks 11.0 Registration</h1>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
