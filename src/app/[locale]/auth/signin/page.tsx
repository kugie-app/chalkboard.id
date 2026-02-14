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
  const ts = useTranslations("auth.signup");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
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
        setError(t("invalidCredentials"));
      } else {
        router.push("/");
      }
    } catch {
      setError(t("signInError"));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || ts("error"));
        setLoading(false);
        return;
      }

      // Auto sign-in after successful registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t("signInError"));
      } else {
        router.push("/");
      }
    } catch {
      setError(ts("error"));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setError("");
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

          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-4">
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

              <div className="mt-4 text-center">
                <p className="text-sm text-bodytext">
                  {t("helperText")}{" "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-primary font-semibold hover:underline"
                  >
                    {ts("switchToSignup")}
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value={ts("name")} />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder={ts("namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  disabled={loading}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="signup-email" value={ts("email")} />
                </div>
                <TextInput
                  id="signup-email"
                  type="email"
                  placeholder={ts("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                  disabled={loading}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="signup-password" value={ts("password")} />
                </div>
                <TextInput
                  id="signup-password"
                  type="password"
                  placeholder={ts("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
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
                {loading ? ts("loading") : ts("signup")}
              </Button>

              <div className="mt-4 text-center">
                <p className="text-sm text-bodytext">
                  {ts("hasAccount")}{" "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-primary font-semibold hover:underline"
                  >
                    {ts("switchToSignin")}
                  </button>
                </p>
              </div>
            </form>
          )}
        </CardBox>
      </div>
    </div>
  );
};

export default SignIn;
