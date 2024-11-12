function TeacherTimetable() {
  return (
    <div>
      <p className="font-bold text-xl">Thời khoá biểu</p>

      <select className="py-2 px-4 bg-gray-200 rounded-lg">
        <option>Chọn lớp</option>
      </select>

      <label>
        Chọn tuần
        <input type="date" />
      </label>
      <div>
        <p>Thời khoá biểu tuần -- --</p>
      </div>
    </div>
  );
}

export default TeacherTimetable;
