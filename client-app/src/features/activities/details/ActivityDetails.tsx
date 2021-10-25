import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Grid } from 'semantic-ui-react'
import { LoadingComponent } from '../../../app/layout/LoadingComponent'
import ActivityStore from '../../../app/stores/activityStore'
import ActivityDetailedHeader from '../details/ActivityDetailedHeader'
import ActivityDetailedChat from '../details/ActivityDetailedChat'
import ActivityDetailedInfo from '../details/ActivityDetailedInfo'
import ActivityDetailedSidebar from '../details/ActivityDetailedSidebar'

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { activity: activity, loadActivity, loadingInitial } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id]);

    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails)
