import User from "../models/user.js";

const teacherLogin = async (req, res) => {
  if (req.body.username && req.body.password) {
    let teacher = await User.findOne({
      username: req.body.username,
      role: "teacher",
    });
    if (teacher) {
      if (teacher.password === req.body.password) {
        teacher.password = undefined;
        res.send(teacher);
      } else {
        res.status(400).json({ message: "Sai mật khẩu" });
      }
    } else {
      res.status(400).json({ message: "Tài khoản không tồn tại!" });
    }
  } else {
    res.status(400).json({ message: "Cần nhập tài khoản và mật khẩu" });
  }
};

const getTeacherList = async (req, res) => {
  try {
    let result = await User.find({ role: "teacher" }).populate(
      "teacherInfo.class"
    );

    res.status(200).json(result);
  } catch (error) {
    console.log("Error getTeacherList\n", error);
    res
      .status(500)
      .json({ message: "Có lỗi khi lấy dữ liệu giáo viên" + error.message });
  }
};

const getDetailTeacher = async (req, res) => {
  const teacherId = req.params.id;

  try {
    const result = await User.findOne({ _id: teacherId, role: "teacher" })
      .populate("teacherInfo.class")
      .populate("teacherInfo.activityAssign");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Có lỗi khi lấy dữ liệu giáo viên: " + error.message);
  }
};

const addTeacher = async (req, res) => {
  const {
    username,
    password,
    age,
    profile,
    name,
    email,
    phone,
    gender,
    class_id,
    activityAssign,
  } = req.body;
  const existedTeacher = await User.findOne({ username: username });
  if (existedTeacher) {
    return res.status(500).json({ message: "Tên đăng nhập đã tồn tại" });
  }
  const newTeacher = new User({
    username,
    password,
    role: "teacher",
    profile,
    teacherInfo: {
      name,
      age,
      email,
      phone,
      gender,
      class: class_id,
      activityAssign,
    },
  });

  try {
    await newTeacher.save();
    res.status(201).json({ message: "Thêm giáo viên thành công!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Có lỗi khi thêm giáo viên " + error });
  }
};

const updateTeacher = async (req, res) => {
  const teacherId = req.params.id;
  const {
    username,
    password,
    age,
    profile,
    name,
    email,
    phone,
    gender,
    class_id,
    activityAssign,
  } = req.body;
  console.log("updateTeacher with id:" + teacherId);
  try {
    const updatedTeacher = await User.findByIdAndUpdate(teacherId, {
      username,
      password,
      role: "teacher",
      profile,
      teacherInfo: {
        name,
        age,
        email,
        phone,
        gender,
        class: class_id,
        activityAssign,
      },
    });
    res.status(200).json({ message: "Chỉnh sửa giáo viên thành công!" });
    console.log(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: "Có lỗi khi cập nhật giáo viên " + error });
  }
};

const deleteTeacher = async (req, res) => {
  const teacherId = req.params.id;

  try {
    await User.findByIdAndDelete(teacherId);
    res.status(200).json({ message: "Xoá giáo viên thành công" });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi khi xoá giáo viên " + error });
  }
};

const searchTeacherUser = async (req, res) => {
  try {
    const { search } = req.body;

    const query = new RegExp(search, "i", "g");

    const user = await User.find({
      "teacherInfo.name": query,
      role: "teacher",
    });

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {
  getTeacherList,
  getDetailTeacher,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  teacherLogin,
  searchTeacherUser,
};
