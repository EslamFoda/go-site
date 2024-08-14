import React from "react";
import Editor from "../editor";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Editor>{children}</Editor>;
}

export default Layout;
