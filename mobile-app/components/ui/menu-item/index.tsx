import { Icon, IconProps, makeStyles, Text } from "@rneui/themed";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { colors, spacing } from "@/services/theme/constants";
import { Flex } from "../flex";

type menuItemProps = {
  text: string;
  icon: IconProps;
  color?: string;
} & TouchableOpacityProps;

/**
 * @default color="primary"
 */
export function MenuItem({
  text,
  icon,
  color = colors.primary,
  ...props
}: menuItemProps) {
  const styles = useStyles(color);

  return (
    <>
      <TouchableOpacity {...props}>
        <Flex justify="space-between" style={styles.container}>
          <Flex gap={spacing.md}>
            <Icon {...icon} color={color} />

            <Text style={styles.textStyle}>{text}</Text>
          </Flex>

          <Icon name="chevron-right" color={color} />
        </Flex>
      </TouchableOpacity>
    </>
  );
}

const useStyles = makeStyles((theme, color: string) => ({
  container: {
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  textStyle: {
    color: color,
  },
}));
