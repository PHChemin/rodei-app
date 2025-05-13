import useFlashMessages from "@/hooks/use-flash-messages";
import { AntDesign } from "@expo/vector-icons";
import { makeStyles } from "@rneui/themed";
import Constants from "expo-constants";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import AutoCloseBar from "./auto-close-bar";

export interface FlashMessageRendererProps {
  id: string;
  type: "error" | "warning" | "info" | "success";
  message: string;
  withCloseButton?: boolean;
  autoClose?: boolean;
}

export default function FlashMessageRenderer({
  id,
  type,
  message,
  withCloseButton = true,
  autoClose = true,
  style,
}: FlashMessageRendererProps & ViewProps) {
  const styles = useStyles();
  const { closeFlashMessage } = useFlashMessages();

  const handleClose = () => closeFlashMessage(id);

  return (
    <View style={[styles.container, styles[type], style]}>
      <View style={styles.row}>
        <Text style={styles.message}>{message}</Text>

        {withCloseButton && (
          <TouchableOpacity onPress={handleClose}>
            <AntDesign name="close" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {autoClose && <AutoCloseBar onComplete={handleClose} />}
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: Constants.statusBarHeight,
    borderRadius: theme.spacing.lg * 2,
    borderTopWidth: 1,
    marginHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    zIndex: 1,
    alignItems: "center",
  },
  info: {
    backgroundColor: "rgb(59 130 246)",
    borderColor: "rgb(37 99 235)",
  },
  error: {
    backgroundColor: "rgb(239 68 68)",
    borderColor: "rgb(220 38 38)",
  },
  warning: {
    backgroundColor: "rgb(234 179 8)",
    borderColor: "rgb(202 138 4)",
  },
  success: {
    backgroundColor: "rgb(16 185 129)",
    borderColor: "rgb(5 150 105)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  message: {
    color: "white",
    flexShrink: 1,
  },
}));
