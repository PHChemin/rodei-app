import { router } from "expo-router";
import { t } from "i18next";

import {
  Header,
  InputModal,
  Menu,
  MenuItem,
  ScreenWrapper,
} from "@/components/ui";
import useModal from "@/hooks/use-modal";

import { useAsyncData } from "@/hooks/use-async-data";
import { UserLogin } from "@/schemas/User/UserLogin";
import { api } from "@/services";

import { UserInfo } from "./_UserInfo";

export function MyProfileScreen() {
  const { showModal, hideModal } = useModal();

  const { loading, refresh, user } = useAsyncData(async () => {
    const { data } = await api().get("/user/profile");
    
    const user = UserLogin.parse(data);

    return {
      user,
    };
  }, []);

  if(loading) return loading;

  const changeNameModal = async () => {
    showModal(
      <InputModal
        modalTitle={t("components.profile.change-name.title")}
        label={t("components.profile.change-name.name")}
        minLength={2}
        submitButtonTitle={t("buttons.confirm")}
        initialValue={user.name}
        onSubmit={async (name) => {
          try {
            await api().patch("/user/profile/name", {
              name: name,
            });

            refresh();
          } catch (error) {
            console.log(error);
          } finally {
            hideModal();
          }
        }}
      />
    );
  };

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.profile.title")} />

      <UserInfo user={user} />

      <Menu withLogout>
        <MenuItem
          icon={{ name: "account-edit-outline", type: "material-community" }}
          text={t("components.profile.menu.edit-name")}
          onPress={changeNameModal}
        />

        <MenuItem
          icon={{ name: "lock-outline", type: "material-community" }}
          text={t("components.profile.menu.change-password")}
          onPress={() => router.push("/my-profile/change-password")}
        />
      </Menu>
    </ScreenWrapper.Fullscreen>
  );
}
