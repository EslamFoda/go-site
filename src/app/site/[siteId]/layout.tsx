import React from "react";
import { AuthWrapper } from "../../auth/authWrapper";
import Editor from "./editor";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <Editor>{children}</Editor>
    </AuthWrapper>
  );
}

export default Layout;
