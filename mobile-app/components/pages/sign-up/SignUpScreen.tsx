import { Header, ScreenWrapper } from "@/components/ui";

import { SignUpForm } from "./_SignUpForm";

export function SignUpScreen() {
  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title="Registrar-se" />

      <SignUpForm />
    </ScreenWrapper.Fullscreen>
  );
}
