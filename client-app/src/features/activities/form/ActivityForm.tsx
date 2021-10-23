import React, { ChangeEvent, useContext } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/modules/activity'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'

interface IProps {
    activity: IActivity | undefined;
}

const ActivityForm: React.FC<IProps> = ({ activity: initalFormState }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, cancelFormOpen } = activityStore;
    const initializeForm = () => {
        if (initalFormState) {
            return initalFormState;
        }
        else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

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
            createActivity(newActivity);
        } else {
            editActivity(activity);
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
                <Button floated='right' type='button' content='Cancel' onClick={cancelFormOpen} />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)