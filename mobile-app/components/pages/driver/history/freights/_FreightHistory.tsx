import { makeStyles } from "@rneui/themed";
import { FlatList, View } from "react-native";
import { z } from "zod";

import { useAsyncData } from "@/hooks/use-async-data";
import { FreightBase } from "@/schemas";
import { api } from "@/services";
import { spacing } from "@/services/theme/constants";

import { EmpityHistoryMessage } from "./_EmptyHistoryMessage";
import { Freight } from "./_Freight/_Freight";

type FreightHisotryProps = {};

export function FreightHistory({}: FreightHisotryProps) {
  const styles = useStyles();

  const { loading, refresh, freights } = useAsyncData(async () => {
    const { data } = await api().get(`/driver/freights`);

    const freights = z.array(FreightBase).parse(data.data);

    return {
      freights,
    };
  });

  if (loading) return loading;

  return (
    <>
      <FlatList
        data={freights}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Freight freight={item} />}
        ListEmptyComponent={() => <EmpityHistoryMessage />}
        ItemSeparatorComponent={() => <View style={{ height: spacing.xs }} />}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
