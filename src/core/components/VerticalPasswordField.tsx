import classNames from "classnames";
import { useState } from "react";
import { useField } from "react-final-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type Props = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
};

const VerticalPasswordField = ({
  id,
  label,
  name,
  placeholder = "placeholder",
}: Props) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField(name, {
    parse: (v) => (v === "" ? null : v),
  });

  const normalizedError = Array.isArray(error)
    ? error.join(", ")
    : error || submitError;

  const [type, setType] = useState<"password" | "text">("password");

  const showPassword = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-sm font-semibold leading-4 text-[#2D3436]"
      >
        {label}
      </label>

      <div className="relative mt-2 w-full ">
        <input
          id={id}
          type={type}
          {...input}
          className={classNames(
            "box-border w-full rounded-[7px] border px-3 py-4 text-sm",
            "font-light leading-4 text-[#111314] focus:border-[#0010F7] focus:ring-0",
            "focus:drop-shadow-[0px_0px_10px_rgba(10,175,255,0.35)]",
            touched && normalizedError ? "border-[#FF0022]" : "border-[#DFE6E9]"
          )}
          placeholder={placeholder}
        />

        <div className="absolute top-0 right-0 mt-4 mr-3">
          <button type="button" onClick={showPassword}>
            {type === "password" ? (
              <EyeIcon className="h-4 w-4 text-[#636E72]" />
            ) : (
              <EyeSlashIcon className="h-4 w-4 text-[#636E72]" />
            )}
          </button>
        </div>
      </div>

      {touched && normalizedError ? (
        <span
          role="alert"
          className="mt-0.5 text-[10px] font-semibold leading-[14px] text-[#FF0022]"
        >
          {normalizedError}
        </span>
      ) : null}
    </div>
  );
};

export default VerticalPasswordField;
