import { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityStore from "../stores/activityStore";
import { LoadingComponent } from "./LoadingComponent";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities' />;

  return (
    <div id="main-container">
      <NavBar />
      <Container style={{ marginTop: "6em" }}>
        <ActivityDashboard />
      </Container>
    </div>
  );
};

export default observer(App);
