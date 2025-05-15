import { Paginated } from "@/schemas/Paginated";
import { Icon, makeStyles } from "@rneui/themed";
import { Text, TouchableOpacity, View } from "react-native";

type PaginationProps<T> = {
  paginated: Paginated<T>;
  onChangePage: (pageIndex: number) => void;
};

export function Pagination<T>({ onChangePage, paginated }: PaginationProps<T>) {
  const styles = useStyles();

  const { page, totalPages } = paginated;

  if (totalPages == 1) return;

  return (
    <View style={styles.row}>
      <TouchableOpacity disabled={page == 1} onPress={() => onChangePage(1)}>
        <Icon
          type="antdesign"
          name="doubleleft"
          color={page == totalPages ? "lightgrey" : "black"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={page == 1}
        onPress={() => onChangePage(Math.max(1, page - 1))}
      >
        <Icon
          type="antdesign"
          name="left"
          color={page == totalPages ? "lightgrey" : "black"}
        />
      </TouchableOpacity>

      <Text>
        {page}/{totalPages}
      </Text>

      <TouchableOpacity
        disabled={page == totalPages}
        onPress={() => onChangePage(Math.min(totalPages, page + 1))}
      >
        <Icon
          type="antdesign"
          name="right"
          color={page == totalPages ? "lightgrey" : "black"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={page == totalPages}
        onPress={() => onChangePage(totalPages)}
      >
        <Icon
          type="antdesign"
          name="doubleright"
          color={page == totalPages ? "lightgrey" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
}

export const useStyles = makeStyles((theme) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    columnGap: theme.spacing.lg,
    marginVertical: theme.spacing.lg,
  },
}));
