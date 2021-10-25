import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Label, SegmentGroup, Segment, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../app/modules/activity';

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    return (
        <SegmentGroup>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as="a">{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted by Miyuu
                            </Item.Description>
                            <Item.Extra>

                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> <span style={{ marginRight: '1em' }}>{activity.date}</span>
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    floated="right" content="View"
                    color="blue"
                    as={Link} to={`/activities/${activity.id}`} />
            </Segment>
        </SegmentGroup>

    )
}
