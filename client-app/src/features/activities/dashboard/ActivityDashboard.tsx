import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/modules/activity";
import { ActivityDetails } from "../details/ActivityDetails";
import ActivityList from "./ActivityList";
import { ActivityForm } from "../form/ActivityForm";
import { observer } from "mobx-react-lite";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (setSelectedActivity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  target: string;
  submitting: boolean;
}

const ActivityDashboard: React.FC<IProps> = ({ activities, selectActivity, selectedActivity, editMode, setEditMode, setSelectedActivity, createActivity, editActivity, deleteActivity, submitting, target }) => (
  <Grid>
    <Grid.Column width={10}>
      <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting} target={target} />
    </Grid.Column>
    <Grid.Column width={6}>
      {
        selectedActivity && !editMode &&
        <ActivityDetails activity={selectedActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} />
      }
      {
        editMode && <ActivityForm key={selectedActivity && (selectedActivity.id || 0)} setEditMode={setEditMode} activity={selectedActivity} editActivity={editActivity} createActivity={createActivity} submitting={submitting} />
      }

    </Grid.Column>
  </Grid>
);

export default observer(ActivityDashboard);
