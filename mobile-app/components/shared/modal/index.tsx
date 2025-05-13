import useModal from "@/hooks/use-modal";
import { DEFAULT_PADDING, DEFAULT_RADIUS } from "@/services/theme";
import { Overlay, makeStyles } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export default function Modal() {
  const styles = useStyles();
  const { content, options, hideModal } = useModal();

  return (
    <Overlay
      isVisible={content != undefined}
      onBackdropPress={() => hideModal()}
      backdropStyle={[
        options?.transparent && { backgroundColor: "transparent" },
      ]}
      overlayStyle={styles.overlayStyle}
    >
      <View style={styles.contentContainer}>{content}</View>
    </Overlay>
  );
}

const useStyles = makeStyles(() => ({
  overlayStyle: {
    borderRadius: DEFAULT_RADIUS,
    margin: DEFAULT_PADDING,
  },
  contentContainer: {
    padding: DEFAULT_PADDING,
  },
}));
