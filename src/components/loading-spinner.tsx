import Image from "next/image";

export default function LoadingSpinner() {
    return (
        <div className=" w-full h-screen flex justify-center items-center">
            <Image
                src={"ripple-loader.svg"}
                height={100}
                width={100}
                alt="loader"
            />
        </div>
    );
}
