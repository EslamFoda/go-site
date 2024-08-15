import React from "react";
import { AuthWrapper } from "../auth/authWrapper";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <div>{children}</div>
    </AuthWrapper>
  );
}

export default Layout;
