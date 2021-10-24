import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import { LoadingComponent } from '../../../app/layout/LoadingComponent'
import ActivityStore from '../../../app/stores/activityStore'

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
        <Card fluid>
            <Image src={`../../../../assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    <span>{activity!.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup fluid>
                    <Button basic color='blue' content='Edit' as={Link} to={`/manage/${activity.id}`} />
                    <Button basic color='blue' content='Cancel' onClick={() => history.push('/activities')} />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetails)
