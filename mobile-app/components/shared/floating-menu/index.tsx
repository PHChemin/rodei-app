import {
  DEFAULT_PADDING,
  DEFAULT_RADIUS,
  defaultShadow,
} from "@/services/theme";
import { Icon, makeStyles } from "@rneui/themed";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, Pressable, Text, TouchableOpacity } from "react-native";
import FloatingButton from "./floating-button";

export type FloatingMenuItemProps = {
  icon: {
    name: string;
    type: string;
  };
  title: string;
  onPress: () => void;
};

type FloatingMenuProps = {
  items: FloatingMenuItemProps[];
};

export default function FloatingMenu({ items }: FloatingMenuProps) {
  const styles = useStyles();
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setVisible(false);
    }, [])
  );

  return (
    <>
      <FloatingButton onPress={() => setVisible(true)} />

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

const useStyles = makeStyles((theme) => ({
  menuTouchable: {
    padding: 8,
  },
  backdropStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  overlayStyle: {
    marginBottom: 200,
    marginRight: theme.spacing.xl,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: DEFAULT_PADDING,
    marginTop: DEFAULT_PADDING,
    borderRadius: DEFAULT_RADIUS,
    padding: DEFAULT_PADDING,
    backgroundColor: "white",
    ...defaultShadow,
  },
}));
