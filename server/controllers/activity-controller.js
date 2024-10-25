import Activity from '../models/activity.js'


const addGroupActivity = async (req, res) => {
    try {
        const newGroupActivity = new Activity({ group_activity: req.body.group_activity, activity: [] });
        await newGroupActivity.save();
        res.status(201).json({ message: 'Group activity created successfully', activity: newGroupActivity });
    } catch (error) {
        res.status(500).json({ message: 'Error creating group activity', error: error.message });
    }
}

const getAllGroupActivity = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching group activities', error: error.message });
    }
}

const updateGroupActivity = async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, { group_activity: req.body.group_activity }, { new: true });
        res.status(200).json({ message: 'Group activity updated successfully', activity: updatedActivity });
    } catch (error) {
        res.status(500).json({ message: 'Error updating group activity', error: error.message });
    }
}

const deleteGroupActivity = async (req, res) => {
    try {
        await Activity.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Group activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting group activity', error: error.message });
    }
}


const getActivityList = async (req, res) => {
    try {
        const activityList = await Activity.find();
        res.status(200).send(activityList);
    } catch (error) {
        console.log("Error fetching activity ", error);
        res.status(500).send({ message: "Failed to fetch activity" });
    }
}

const addActivity = async (req, res) => {
    try {
        const activityGroup = await Activity.findById(req.params.id);
        activityGroup.activity.push({ name: req.body.name });
        await activityGroup.save();
        res.status(201).json({ message: 'Activity added successfully', activityGroup });
    } catch (error) {
        res.status(500).json({ message: 'Error adding activity', error: error.message });
    }
}

const updateActivity = async (req, res) => {
    try {
        const activityGroup = await Activity.findById(req.params.id);
        const activity = activityGroup.activity.id(req.params.activityId);
        activity.name = req.body.name;
        await activityGroup.save();
        res.status(200).json({ message: 'Activity updated successfully', activityGroup });
    } catch (error) {
        res.status(500).json({ message: 'Error updating activity', error: error.message });
    }
}

const deleteActivity = async (req, res) => {
    try {
        const activityGroup = await Activity.findById(req.params.id);
        if (activityGroup && activityGroup.activity) {
            // Use array filtering to remove the activity
            activityGroup.activity = activityGroup.activity.filter(activity => activity._id.toString() !== req.params.activityId);
            
            await activityGroup.save();
            res.status(200).json({ message: 'Activity deleted successfully', activityGroup });
        } else {
            res.status(404).json({ message: 'Activity group not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting activity', error: error.message });
    }
};


export { getActivityList, addActivity, updateActivity, deleteActivity, getAllGroupActivity, addGroupActivity, updateGroupActivity, deleteGroupActivity };