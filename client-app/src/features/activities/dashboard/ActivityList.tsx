import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { ActivityListItem } from "./ActivityListItem";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;
  const testCss = {
    marginTop: '1em'
  }

  return (

    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <div style={{ marginBottom: '3em' }}>
          <Fragment key={group}>
            <Label color='blue' size='large'>
              {group}
            </Label>
            <Item.Group divided style={testCss}>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Fragment>
        </div>
      ))}
    </Fragment>


  );
};

export default observer(ActivityList)
