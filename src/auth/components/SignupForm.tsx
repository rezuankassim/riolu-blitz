import { LabeledTextField } from "src/core/components/LabeledTextField";
import { Form, FORM_ERROR } from "src/core/components/Form";
import signup from "src/auth/mutations/signup";
import { Signup } from "src/auth/validations";
import { useMutation } from "@blitzjs/rpc";
import VerticalTextField from "src/core/components/VerticalTextField";
import VerticalPasswordField from "src/core/components/VerticalPasswordField";
import Link from "next/link";
import { Routes } from "@blitzjs/next";

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);
  return (
    <div className="max-w-[360px]">
      <h1 className="text-[42px] font-medium leading-[48px] text-[#2D3436]">
        Create Account✌🏻️
      </h1>

      <p className="mt-2 text-sm leading-[21px] text-[#B2BEC3]">
        Please sign up to your personal account if you want <br />
        to use all our premium products.
      </p>

      <Form
        submitText="Sign Up"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values);
            props.onSuccess?.();
          } catch (error: any) {
            if (
              error.code === "P2002" &&
              error.meta?.target?.includes("email")
            ) {
              // This error comes from Prisma
              return { email: "This email is already being used" };
            } else {
              return { [FORM_ERROR]: error.toString() };
            }
          }
        }}
        className="mt-9"
      >
        <div className="flex flex-col gap-y-4">
          <VerticalTextField
            id="email"
            label="Email :"
            name="email"
            placeholder="you@example.com"
          />

          <VerticalPasswordField
            id="password"
            label="Password :"
            name="password"
            placeholder=""
          />

          <VerticalPasswordField
            id="confirm_password"
            label="Confirm Password :"
            name="confirmPassword"
            placeholder=""
          />
        </div>
      </Form>

      <p className="mt-2 text-xs font-bold leading-[18px] text-[#636E72]">
        <span>Already have an account?</span>

        <Link href={Routes.LoginPage()}>
          <a className="ml-1 text-[#0010F7]">Login here</a>
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
