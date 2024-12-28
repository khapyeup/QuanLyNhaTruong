import Activity from '../models/activity.js'


const addGroupActivity = async (req, res) => {
    try {
        const newGroupActivity = new Activity({ group_activity: req.body.group_activity, activity: [] });
        await newGroupActivity.save();
        res.status(201).json({ message: 'Thêm dữ liệu thành công', activity: newGroupActivity });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi khi lấy dữ liệu', error: error.message });
    }
}

const getAllGroupActivity = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi khi lấy dữ liệu', error: error.message });
    }
}

const updateGroupActivity = async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, { group_activity: req.body.group_activity }, { new: true });
        res.status(200).json({ message: 'Cập nhật nhóm hoạt động thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi khi cập nhật nhóm', error: error.message });
    }
}

const deleteGroupActivity = async (req, res) => {
    try {
        await Activity.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Xóa nhóm hoạt động thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi khi xóa', error: error.message });
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
        res.status(201).json({ message: 'Thêm hoạt động thành công', activityGroup });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi khi thực hiện hành động', error: error.message });
    }
}

const updateActivity = async (req, res) => {
    try {
        const activityGroup = await Activity.findById(req.params.id);
        const activity = activityGroup.activity.id(req.params.activityId);
        activity.name = req.body.name;
        await activityGroup.save();
        res.status(200).json({ message: 'Cập nhật hoạt động thành công', activityGroup });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi khi cập nhật hành động', error: error.message });
    }
}

const deleteActivity = async (req, res) => {
    try {
        const activityGroup = await Activity.findById(req.params.id);
        if (activityGroup && activityGroup.activity) {
            // Use array filtering to remove the activity
            activityGroup.activity = activityGroup.activity.filter(activity => activity._id.toString() !== req.params.activityId);
            
            await activityGroup.save();
            res.status(200).json({ message: 'Xóa hành động thành công', activityGroup });
        } else {
            res.status(404).json({ message: 'Không tìm thấy hoạt động' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi khi xóa hoạt động', error: error.message });
    }
};


export { getActivityList, addActivity, updateActivity, deleteActivity, getAllGroupActivity, addGroupActivity, updateGroupActivity, deleteGroupActivity };