import { Toaster } from "@/components/ui/sonner";
import { AuthWrapper } from "./auth/authWrapper";

export default  function Home() {
  return (
    <AuthWrapper>
      create site is gonna be here
      <Toaster />
    </AuthWrapper>
  );
}
