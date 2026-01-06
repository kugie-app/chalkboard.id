"use client";

import React from "react";
import { Flowbite } from "flowbite-react";
import { SessionProvider } from "next-auth/react";
import customTheme from "@/utils/theme/custom-theme";
import NextTopLoader from 'nextjs-toploader';
import { CustomizerContextProvider } from "@/app/context/CustomizerContext";
import { Toaster } from "@/components/shadcn-ui/Default-Ui/toaster";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Flowbite theme={{ theme: customTheme }}>
        <NextTopLoader color="var(--color-primary)" />
        <CustomizerContextProvider>
          {children}
        </CustomizerContextProvider>
      </Flowbite>
      <Toaster />
    </SessionProvider>
  );
} 