import { Button, makeStyles, Text } from "@rneui/themed";
import { Flex } from "../flex";
import { spacing } from "@/services/theme/constants";
import useModal from "@/hooks/use-modal";

type AlertModalProps = {
  title: string;
  message: string;
  confirmButtonTitle: string;
  cancelButtonTitle?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function AlertModal({
  title,
  message,
  confirmButtonTitle,
  cancelButtonTitle,
  onConfirm,
  onCancel,
}: AlertModalProps) {
  const styles = useStyles();
  const { hideModal } = useModal();

  return (
    <>
      <Text h3>{title}</Text>

      <Text>{message}</Text>

      <Flex justify="flex-end" gap={spacing.lg} style={styles.buttonContainer}>
        {cancelButtonTitle && (
          <Button
            title={cancelButtonTitle}
            onPress={onCancel ? onCancel : hideModal}
            containerStyle={styles.button}
          />
        )}
        <Button
          title={confirmButtonTitle}
          onPress={onConfirm}
          containerStyle={styles.button}
        />
      </Flex>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    width: "25%",
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
}));
