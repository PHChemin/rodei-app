import { Button, Icon, makeStyles, Text } from "@rneui/themed";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { t } from "i18next";
import { TouchableOpacity, View } from "react-native";

import { useCache } from "@/hooks/use-cache";
import useModal from "@/hooks/use-modal";
import { ExpenseBaseSchema } from "@/schemas/Expense/ExpenseBase";
import { api, Log } from "@/services";
import { uploadMultipartImage } from "@/services/api/uploaders/imageUploaderMultipart";
import { formatNumberBRL } from "@/services/helpers/currency/currencyFormatter";
import { formatToDisplayDate } from "@/services/helpers/date/date";
import PhotoService from "@/services/photo-service";
import { colors, iconSize, spacing } from "@/services/theme/constants";

import { AlertModal, Flex } from "@/components/ui";
import { useState } from "react";

type ExpenseProps = {
  expense: ExpenseBaseSchema;
  fleetId: number;
  truckId: number;
  refresh: () => void;
};

export function Expense({ expense, fleetId, truckId, refresh }: ExpenseProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();
  const { cache } = useCache();

  const [showMore, setShowMore] = useState(false);

  const handleEditPress = () => {
    cache("expense", expense);

    router.push(
      `/manager/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/expenses/${expense.id}/edit`
    );
  };

  const deleteExpenseModal = async () => {
    showModal(
      <AlertModal
        title={t("components.expenses-history.delete")}
        message={t("components.expenses-history.delete-confirm")}
        confirmButtonTitle={t("buttons.yes")}
        cancelButtonTitle={t("buttons.no")}
        onConfirm={async () => {
          try {
            await api().delete(
              `/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/expenses/${expense.id}`
            );

            router.dismiss(1);
            router.replace(
              `/manager/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/details`
            );
          } catch (e) {
            console.log(e);
          } finally {
            hideModal();
          }
        }}
      />
    );
  };

  const handleUploadDocument = async () => {
    try {
      const image = await PhotoService.pick();

      if (image) {
        const resizedImage = await PhotoService.resize(image.uri, 256, 256);

        const uploadSuccess = await uploadMultipartImage({
          url:
            api().defaults.baseURL +
            `/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/expenses/${expense.id}/document`,
          fieldName: "document",
          imageUri: resizedImage.uri,
        });

        if (uploadSuccess) {
          await refresh();
        }
      }
    } catch (e: any) {
      Log.e(e);
    }
  };

  const handleDownloadDocument = async () => {
    try {
      const url =
        api().defaults.baseURL +
        `/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/expenses/${expense.id}/download`;

      const extension = expense.document_path?.split(".").pop();

      const tempFileUri =
        FileSystem.cacheDirectory +
        `Despesa_${expense.type + expense.id}.${extension}`;

      // Baixar o arquivo para cache local
      const { uri } = await FileSystem.downloadAsync(url, tempFileUri);

      // Solicitar permissão, apenas para imagens (photo)
      const permissionResponse = await MediaLibrary.requestPermissionsAsync(
        false,
        ["photo"]
      );

      if (permissionResponse.status !== MediaLibrary.PermissionStatus.GRANTED) {
        return;
      }

      // Salvar no álbum — método simplificado: saveToLibraryAsync
      await MediaLibrary.saveToLibraryAsync(uri);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteDocument = async () => {
    try {
      await api().delete(
        `/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/expenses/${expense.id}/document`
      );
      await refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <Flex justify="space-between" style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon
            type="material-community"
            name="clipboard-list-outline"
            color="white"
          />
        </View>

        <View style={styles.textContainer}>
          <Text h4>{expense.type}</Text>

          <Text numberOfLines={2}>{expense.location}</Text>

          <Text>{formatToDisplayDate(expense.date)}</Text>

          <Text style={styles.amount}>
            - R$ {formatNumberBRL(expense.amount)}
          </Text>

          {showMore && <Text>{expense.description}</Text>}
        </View>

        <View style={{ alignItems: "center" }}>
          <Flex gap={spacing.lg}>
            <TouchableOpacity onPress={handleEditPress}>
              <Icon
                type="material-community"
                name="square-edit-outline"
                size={iconSize.md}
                color={colors.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={deleteExpenseModal}>
              <Icon
                type="material-community"
                name="trash-can-outline"
                size={iconSize.lg}
                color="red"
              />
            </TouchableOpacity>
          </Flex>
        </View>
      </Flex>

      {showMore && (
        <View style={{ marginTop: spacing.lg }}>
          <Flex justify="center">
            <Text h4>Documento</Text>

            {expense.document_path && (
              <TouchableOpacity onPress={handleDeleteDocument}>
                <Icon
                  type="material-community"
                  name="trash-can-outline"
                  size={iconSize.lg}
                  color="red"
                />
              </TouchableOpacity>
            )}
          </Flex>
          {expense.document_path ? (
            <Button
              type="outline"
              title={t("buttons.download")}
              size="sm"
              iconRight
              icon={{
                name: "download",
                type: "matterial-community",
                color: colors.primary,
                size: iconSize.sm,
              }}
              onPress={handleDownloadDocument}
            />
          ) : (
            <Button
              type="outline"
              title={t("buttons.upload")}
              size="sm"
              iconRight
              icon={{
                name: "upload",
                type: "matterial-community",
                color: colors.primary,
                size: iconSize.sm,
              }}
              onPress={handleUploadDocument}
            />
          )}
        </View>
      )}

      <Button
        type="clear"
        title={showMore ? t("buttons.less") : t("buttons.more")}
        iconRight
        icon={{
          name: showMore ? "chevron-up" : "chevron-down",
          type: "material-community",
          color: colors.primary,
          size: iconSize.sm,
        }}
        onPress={() => setShowMore(!showMore)}
      />
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing.sm,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderColor: theme.colors.grey3,
  },
  amount: {
    color: theme.colors.error,
    fontWeight: "bold",
    fontSize: theme.spacing.lg,
  },
  iconContainer: {
    padding: theme.spacing.md,
    borderRadius: 100,
    backgroundColor: theme.colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    fontSize: theme.spacing.lg,
  },
}));
