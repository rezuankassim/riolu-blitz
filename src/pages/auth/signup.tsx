import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import { SignupForm } from "src/auth/components/SignupForm";
import { BlitzPage, Routes } from "@blitzjs/next";
import AuthIllustration from "src/core/components/AuthIllustration";
import Logo from "src/core/components/Logo";

const SignupPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <Layout title="Sign Up">
      <main className="h-screen min-w-full grid grid-cols-2">
        <div className="relative bg-[#EBFAFA] grid items-center text-center px-14">
          <div className="absolute top-0 left-0 mt-12 ml-12">
            <Logo />
          </div>

          <div>
            <div className="h-[500px] w-[450px] px-3">
              <AuthIllustration />
            </div>

            <div className="mt-6">
              <span className="font-medium text-[#0010F7] text-[28px] leading-[42px]">
                Very good works are waiting for you 🤞
              </span>

              <p className="mt-[18px] text-lg leading-[25px] text-[#636E72]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <SignupForm onSuccess={() => router.push(Routes.Home())} />
        </div>
      </main>
    </Layout>
  );
};

export default SignupPage;
