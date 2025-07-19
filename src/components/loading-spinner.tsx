import Image from "next/image";
import loaderImg from "../../public/ripple-loader.svg";
export default function LoadingSpinner() {
    return (
        <div className=" w-full h-screen flex justify-center items-center">
            <Image
                src={loaderImg}
                height={100}
                width={100}
                alt="loader"
                priority={true}
            />
        </div>
    );
}
