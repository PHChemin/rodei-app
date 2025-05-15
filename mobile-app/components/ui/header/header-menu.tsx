import { Icon, makeStyles } from "@rneui/themed";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, Pressable, Text, TouchableOpacity } from "react-native";

import {
  DEFAULT_PADDING,
  DEFAULT_RADIUS,
  iconSize,
} from "@/services/theme/constants";
import { defaultShadow } from "@/services/theme/theme";

import { HEADER_HEIGHT } from "./app-header";

export type HeaderMenuItemProps = {
  icon: {
    name: string;
    type: string;
  };
  title: string;
  onPress: () => void;
};

type HeaderMenuProps = {
  items: HeaderMenuItemProps[];
};

export default function HeaderMenu({ items }: HeaderMenuProps) {
  const styles = useStyles();
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setVisible(false);
    }, [])
  );

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Icon
          style={styles.menuTouchable}
          type="material"
          name={visible ? "menu-open" : "menu"}
          color="white"
          size={iconSize.xl}
        />
      </TouchableOpacity>

      {visible && (
        <Pressable
          onPress={() => setVisible(false)}
          style={styles.backdropStyle}
        >
          <Pressable style={[styles.overlayStyle, defaultShadow]}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.item, index == 0 && { marginTop: 0 }]}
                onPress={item.onPress}
              >
                <Text>{item.title}</Text>
                <Icon type={item.icon.type} name={item.icon.name} />
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      )}
    </>
  );
}

const useStyles = makeStyles(() => ({
  menuTouchable: {
    padding: 8,
  },
  backdropStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  overlayStyle: {
    borderRadius: DEFAULT_RADIUS,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: DEFAULT_PADDING,
    marginTop: HEADER_HEIGHT + 8,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: DEFAULT_PADDING,
    marginTop: DEFAULT_PADDING,
  },
}));
