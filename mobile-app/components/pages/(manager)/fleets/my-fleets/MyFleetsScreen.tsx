import { makeStyles } from "@rneui/themed";

import { Header, ScreenWrapper } from "@/components/ui";

import { MyFleets } from "./_my-fleets/_MyFleets";

export function MyFleetsScreen() {
  const styles = useStyles();

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title="Minhas Frotas" />

      <MyFleets />
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
