import React, { ChangeEvent, useContext, useEffect } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/modules/activity'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router'

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        cancelFormOpen,
        activity: initialFormState,
        loadActivity,
        clearActivity } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState));
        }
        return () => {
            clearActivity();
        }
    }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id.length]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`activities/${newActivity.id}`));
        } else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} placeholder='Title' value={activity.title} name='title' />
                <Form.TextArea onChange={handleInputChange} rows={2} placeholder='Description' value={activity.description} name='description' />
                <Form.Input onChange={handleInputChange} placeholder='Categoy' value={activity.category} name='category' />
                <Form.Input onChange={handleInputChange} type='datetime-local' placeholder='Date' value={activity.date} name='date' />
                <Form.Input onChange={handleInputChange} placeholder='City' value={activity.city} name='city' />
                <Form.Input onChange={handleInputChange} placeholder='Venue' value={activity.venue} name='venue' />
                <Button loading={submitting} floated='right' positive type='Submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={() => history.push('/activities')} />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)