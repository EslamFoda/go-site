import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/reduxStore/providers";
import { ThemeProvider } from "@/lib/theme-provider";
import { Suspense } from "react";
import Toaster from "@/components/shared/toaster/";
import TopBar from "@/components/shared/topBar";
import { createClient } from "@/utlis/supabase/server";
import FontLoader from "./site/[siteId]/editor/fontLoader";
import BottomBar from "@/components/shared/bottomBar/bottomBar";

export const metadata: Metadata = {
  title: "Vixx",
  description: "the best website builder powered by ai",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Providers>
      <html lang="en" style={{ colorScheme: "dark" }} className="dark">
        <body>
          <FontLoader />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TopBar user={user} />
            <main>{children}</main>
            <BottomBar />
          </ThemeProvider>
          <Suspense>
            <Toaster />
          </Suspense>
        </body>
      </html>
    </Providers>
  );
}
