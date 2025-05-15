import React, { ReactNode } from "react";
import { User } from "@/schemas/User";
import { Image, makeStyles, Text } from "@rneui/themed";
import { View } from "react-native";
import { getUserAvatarUri } from "@/services/pb";
import Flex from "@/components/ui/flex";

type UserInfoProps = {
  user: User;
  variant?: "sm" | "lg";
  secondaryInfo?: ReactNode;
};

export default function UserInfo({
  user,
  variant = "sm",
  secondaryInfo,
}: UserInfoProps) {
  const styles = useStyles(variant);

  const source = getUserAvatarUri(user);

  return (
    <Flex direction="row">
      <Image style={styles.image} source={source} />

      <View>
        <Text style={styles.name}>{user.name}</Text>

        {secondaryInfo}
      </View>
    </Flex>
  );
}

const useStyles = makeStyles((theme, variant: "sm" | "lg") => {
  const avatarSize = variant === "sm" ? 32 : 64;

  return {
    image: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
    },
    name: {
      fontWeight: variant === "sm" ? "normal" : "bold",
    },
  };
});
