import { Button, makeStyles } from "@rneui/themed";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { t } from "i18next";

import { useAsyncData } from "@/hooks/use-async-data";
import { FreightDetailsWithExpensesSchema } from "@/schemas";
import { api, Log } from "@/services";
import { uploadMultipartImage } from "@/services/api/uploaders/imageUploaderMultipart";
import PhotoService from "@/services/photo-service";
import { colors, iconSize } from "@/services/theme/constants";

import { Header, ScreenWrapper } from "@/components/ui";

import { ExpensesHisotry } from "./_expenses-history/_ExpensesHistory";
import { FreightDetails } from "./_FreightDetails";

type FreightDetailsScreenProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function FreightDetailsScreen({
  fleetId,
  truckId,
  freightId,
}: FreightDetailsScreenProps) {
  const styles = useStyles();

  const { loading, refresh, freight } = useAsyncData(async () => {
    const { data } = await api().get(
      `/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}`
    );

    const freight = FreightDetailsWithExpensesSchema.parse(data.data);

    return {
      freight,
    };
  });

  const handleUploadDocument = async () => {
    try {
      const image = await PhotoService.pick();

      if (image) {
        const resizedImage = await PhotoService.resize(image.uri, 256, 256);

        const uploadSuccess = await uploadMultipartImage({
          url:
            api().defaults.baseURL +
            `/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}/document`,
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
        `/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}/download`;

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

  if (loading) return loading;

  return (
    <ScreenWrapper.Scrollable>
      <Header.WithTitle title={t("components.freight-details.title")} />

      <FreightDetails freight={freight} />

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

      <ExpensesHisotry
        expenses={freight.expenses}
        fleetId={fleetId}
        truckId={truckId}
        freightId={freightId}
        refresh={refresh}
      />
    </ScreenWrapper.Scrollable>
  );
}

const useStyles = makeStyles((theme) => ({}));
