import { Icon, makeStyles, Text } from "@rneui/themed";
import { Flex } from "../flex";
import { iconSize, spacing } from "@/services/theme/constants";

type TextIconProps = {
  text: string;
  iconType: string;
  iconName: string;
};

export function TextIcon({ text, iconType, iconName }: TextIconProps) {
  const styles = useStyles();

  return (
    <Flex gap={spacing.lg} style={styles.container}>
      <Icon type={iconType} name={iconName} size={iconSize.md} />

      <Text h4 h4Style={styles.text}>
        {text}
      </Text>
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing.lg,
  },
  text: {
    fontWeight: "normal",
  },
}));
