"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import CardBox from "@/components/shared/CardBox";
import Logo from "@/components/layout/shared/logo/Logo";
import { useTranslations } from "next-intl";
import DatabaseStatusIndicator from "@/components/startup/DatabaseStatusIndicator";

const SignIn = () => {
  const t = useTranslations("auth.signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="flex h-full justify-center items-center px-4">
        <CardBox className="max-w-md w-full">
          <div className="text-center mb-8">
            <Logo />
            <p className="text-bodytext mt-2">
              Billiard Hall Management System
            </p>
          </div>

          {/* Database Status Indicator */}
          <DatabaseStatusIndicator compact />

          {error && (
            <Alert color="failure" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value={t("email")} />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                disabled={loading}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value={t("password")} />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? t("loading") : t("signin")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-bodytext">
              {t("helperText")}
            </p>
          </div>
        </CardBox>
      </div>
    </div>
  );
};

export default SignIn; 