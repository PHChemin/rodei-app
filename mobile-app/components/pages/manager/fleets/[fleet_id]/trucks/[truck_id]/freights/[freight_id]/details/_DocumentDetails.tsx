import { Button, Card, Icon, makeStyles, Text } from "@rneui/themed";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { t } from "i18next";
import { TouchableOpacity } from "react-native";

import { FreightBase } from "@/schemas";
import { api, Log } from "@/services";
import { uploadMultipartImage } from "@/services/api/uploaders/imageUploaderMultipart";
import PhotoService from "@/services/photo-service";
import { colors, iconSize } from "@/services/theme/constants";

import { Flex } from "@/components/ui";

type DocumentDetailsProps = {
  freight: FreightBase;
  refresh: () => void;
};

export function DocumentDetails({ freight, refresh }: DocumentDetailsProps) {
  const styles = useStyles();

  const handleUploadDocument = async () => {
    try {
      const image = await PhotoService.pick();

      if (image) {
        const resizedImage = await PhotoService.resize(image.uri, 256, 256);

        const uploadSuccess = await uploadMultipartImage({
          url:
            api().defaults.baseURL +
            `/fleets/${freight.fleet_id}/trucks/${freight.truck_id}/freights/${freight.id}/document`,
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
        `/fleets/${freight.fleet_id}/trucks/${freight.truck_id}/freights/${freight.id}/download`;

      const extension = freight.document_path?.split(".").pop();

      const tempFileUri =
        FileSystem.cacheDirectory +
        `Frete_${freight.contractor_name + freight.id}.${extension}`;

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
        `/fleets/${freight.fleet_id}/trucks/${freight.truck_id}/freights/${freight.id}/document`
      );
      await refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card containerStyle={styles.container}>
      <Flex justify="space-between">
        <Text h3>Documento </Text>

        {freight.document_path && (
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
      {freight.document_path ? (
        <Button
          type="outline"
          title={t("buttons.download-image")}
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
          title={t("buttons.upload-image")}
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
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing.lg,
  },
}));
