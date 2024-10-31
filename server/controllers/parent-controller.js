import User from '../models/user.js'

const parentLogin = async (req, res) => {
    try {
        if (req.body.username && req.body.password) {
            let parent = await User.findOne({ username: req.body.username, role: "parent" }).populate('student_id').exec()

            if (parent) {
                if (parent.password === req.body.password) {
                    parent.password = undefined;
                    res.json(parent)
                } else {
                    res.json({ message: "Sai mật khẩu" })
                }
            } else {
                res.json({ message: "Tài khoản không tồn tại!" })
            }
        } else {
            res.json({ message: "Cần nhập tài khoản và mật khẩu" })
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


const getParentList = async (req, res) => {
    try {
        let result = await User.find({ role: "parent" })
        
            res.json(result)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

const addParent = async (req, res) => {
    const { username, password, profile, parentInfo, teacherInfo } = req.body;

    const newUser = new User({
        username,
        password,
        role: 'parent',
        profile,
        parentInfo: parentInfo || {},
        teacherInfo: teacherInfo || {}
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to add user', error });
    }
}

const updateParent = async (req, res) => {
    const { id } = req.params; // Assuming user ID is passed as a URL parameter
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user', error });
    }
};

const deleteParent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};



export { parentLogin, getParentList, addParent, updateParent, deleteParent };
