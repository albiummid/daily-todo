import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    ReactNode,
    useState,
} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function TextField({
    label,
    error,
    icon = null,
    ...inputProps
}: {
    icon?: ReactNode;
    error?: string;
    label?: string;
} & DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>) {
    const [show, setShow] = useState(false);
    return (
        <div>
            {!!label ? (
                <label className="block font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            ) : null}
            <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 translate-x-1/2">
                    {icon ?? null}
                </div>
                <input
                    className={`w-full outline-none px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        error ? "border-red-500" : "border-gray-300"
                    }
                     ${icon ? "pl-10" : ""}   
                    `}
                    {...inputProps}
                    type={
                        inputProps.type === "password"
                            ? show
                                ? "text"
                                : "password"
                            : inputProps.type
                    }
                />
                {inputProps.type === "password" && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setShow((v) => !v);
                        }}
                        className="absolute cursor-pointer text-black top-1/2 right-5 -translate-y-1/2 translate-x-1/2"
                    >
                        {show ? (
                            <AiOutlineEyeInvisible size={25} />
                        ) : (
                            <AiOutlineEye size={25} />
                        )}
                    </button>
                )}
            </div>
            {!!error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
