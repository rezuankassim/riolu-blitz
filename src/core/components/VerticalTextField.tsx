import classNames from "classnames";
import { useField } from "react-final-form";

type Props = {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

const VerticalTextField = ({
  id,
  label,
  name,
  type = "text",
  placeholder = "placeholder",
}: Props) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField(name, {
    parse: type === "number" ? (Number as any) : (v) => (v === "" ? null : v),
  });

  const normalizedError = Array.isArray(error)
    ? error.join(", ")
    : error || submitError;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-sm font-semibold leading-4 text-[#2D3436]"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        {...input}
        className={classNames(
          "mt-2 box-border w-full rounded-[7px] border px-3 py-4 text-sm",
          "font-light leading-4 text-[#111314] focus:border-[#0010F7] focus:ring-0",
          "focus:drop-shadow-[0px_0px_10px_rgba(10,175,255,0.35)]",
          touched && normalizedError ? "border-[#FF0022]" : "border-[#DFE6E9]"
        )}
        placeholder={placeholder}
      />

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

export default VerticalTextField;
