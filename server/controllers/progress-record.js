import ProgressRecord from "../models/progress-record.js";

//Get student progress
export const getProgressRecord = async (req, res) => {
  try {
    const { studentId } = req.params;

    const progressRecords = await ProgressRecord.find({ studentId }).sort({date: -1});

    res.status(200).json(progressRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Create new progress record
export const createProgressRecord = async (req, res) => {
  try {
    const { studentId, category, observation, evidence, teacherNotes } =
      req.body;

    const progressRecord = new ProgressRecord({
      studentId,
      category,
      observation,
      evidence,
      teacherNotes,
    });

    await progressRecord.save();

    res.status(200).json({ message: "Thêm bản ghi thành công!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update progress record
export const updateProgressRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(id);

    const progressRecord = await ProgressRecord.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!progressRecord) {
      return res.status(500).json({ message: "Không tìm thấy bản ghi này" });
    }

    res.status(200).json({ message: "Cập nhật bản ghi thành công!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Add parent feedback
export const addParentFeedback = async (req, res) => {
  try {
    const record = await ProgressRecord.findById(req.params.id);
    if (!record) {
      return res.status(500).json({ message: "Không tìm thấy bản ghi" });
    }

    record.parentFeedback = req.body.feedback;
    const updateRecord = await record.save();
    res.status(200).json({message: "Đã thêm feedback thành công"})
  } catch (error) {
    res.status(500).json({message: 'Có lỗi ' + error.message})
  }
};

//Update seen status
export const updateSeenProgress = async (req, res) => {
  try {
    const record = await ProgressRecord.findById(req.params.id);
    if (!record) {
      return res.status(500).json({message: "Không tìm thấy bản ghi"})
    }

    record.seen = true;
    await record.save();
    res.status(200).json();
  } catch (error) {
    res.status(500).json({message: "Seen Error: " + error.message})
  }
}

//Add evidence to a progress record
export const addEvidence = async (req, res) => {
  try {
    const record = await ProgressRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Không tìm thấy bản ghi' });
    }

    record.evidence.push({
      url: req.body.url,
      description: req.body.description,
      uploadedBy: req.body.userId
    })

    await record.save();
    res.status(500).json({message: "Thêm dữ kiện thành công"})
  } catch (error) {
    res.status(500).json({message: "Lỗi khi thêm dẫn chứng " + error.message})
  }
}

//Delete record
export const deleteRecord = async (req, res) => {
  try {
    const record = await ProgressRecord.findById(req.params.id)
  if (!record) {
    return res.status(500).json({message: "Không tìm thấy!"});
  }

  await ProgressRecord.findByIdAndDelete(req.params.id);
  res.status(200).json({message: "Xoá thành công"})
  } catch (error) {
    res.status(500).json({message: "Có lỗi " + error.message})
  }

}
