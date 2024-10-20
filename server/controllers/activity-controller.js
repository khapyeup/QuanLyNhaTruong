import Activity from '../models/activity.js'

const getActivityList = async (req, res) => {
    try {
        const activityList = await Activity.find();
        res.status(200).send(activityList);
    } catch (error) {
        console.log("Error fetching activity ", error);
        res.status(500).send({message: "Failed to fetch activity"});
    }
}

const addActivity = async (req, res) => {
    try {
        const newActivity = new Activity(req.body);
        await newActivity.save();
        res.status(200).send('Add activity successfully');
    } catch (error) {
        console.log('Error adding new activy', error);
        res.status(500).send('Error adding new activity');
    }
}

const updateActivity = async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {new: true});
        console.log("Update activity successfully ", activity);
        res.status(200).send('Update activity successfully');
    } catch (error) {
        console.log('Error to update activity', error);
        res.status(500).send('Failed to update activity');
    }
}

const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.deleteOne({_id: req.params.id});
        res.status(200).send('Delete activity successfully');
    } catch (error) {
        console.log('Error to delete activity', error);
        res.status(500).send('Failed to delete activity');
    }
}

export {getActivityList, addActivity, updateActivity, deleteActivity};