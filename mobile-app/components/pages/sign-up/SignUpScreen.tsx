import { t } from "i18next";

import { Header, ScreenWrapper } from "@/components/ui";

import { SignUpForm } from "./_SignUpForm";

export function SignUpScreen() {
  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.sign-up.title")} />

      <SignUpForm />
    </ScreenWrapper.Fullscreen>
  );
}
