import { ReactNode, PropsWithoutRef } from "react";
import {
  Form as FinalForm,
  FormProps as FinalFormProps,
} from "react-final-form";
import { z } from "zod";
import { validateZodSchema } from "blitz";
export { FORM_ERROR } from "final-form";

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  submitText?: string;
  schema?: S;
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"];
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"];
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && <div role="alert">{submitError}</div>}

          {submitText && (
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full rounded-[7px] bg-[#0010F7] py-4 text-sm font-medium leading-4 text-white"
            >
              {submitText}
            </button>
          )}
        </form>
      )}
    />
  );
}

export default Form;
