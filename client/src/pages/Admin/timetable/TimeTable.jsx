import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import {toast} from 'react-toastify'
import Loading from "../../component/Loading";
import {
  getClassList,
  getDetailClass,
  updateSchedule,
} from "../../../redux/sclassRelated/sclassHandle";
import { getActivityList } from "../../../redux/activityRelated/activityHandle";
import { useGetSclassListQuery, useUpdateScheduleMutation } from "../../../redux/sclassRelated/sclassApiSlice";
import { useGetGroupActivityQuery } from "../../../redux/activityRelated/activityApiSlice";

const TimeTable = () => {
  const dispatch = useDispatch();
  const { data: classList, isLoading } = useGetSclassListQuery();
  const { data: activityList } = useGetGroupActivityQuery();
  const [updateSchedule, {isLoading: isSavingSchedule}] = useUpdateScheduleMutation();

  const [classId, setClassId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [timetable, setTimetable] = useState([]);

  const startOfSelectedWeek = startOfWeek(startDate, { weekStartsOn: 1 });
  const endOfSelectedWeek = endOfWeek(startDate, { weekStartsOn: 1 });

  const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    setStartDate(date);

    // Recalculate week start and end dates based on the new date
    const newStartOfWeek = startOfWeek(date, { weekStartsOn: 1 });
    const newEndOfWeek = endOfWeek(date, { weekStartsOn: 1 });

    // Find the class based on the current selected `classId`
    const selectedClass = classList.find((el) => el._id === classId);
    if (selectedClass) {
      const weekSchedule = selectedClass.schedule.find((schedule) =>
        schedule.weekStart.includes(format(newStartOfWeek, "yyyy/MM/dd"))
      );

      if (weekSchedule) {
        // Update timetable with the new schedule for the selected week
        console.log(weekSchedule);
        setTimetable(
          weekSchedule.content.map((day) => ({
            ...day,
            periods: day.periods.map((period) => ({
              ...period,
              activityOptions: activityList.find(groupAct => groupAct._id === period.groupActivity._id).activity
            })),
          }))
        );
      } else {
        // If no existing schedule for the selected week, initialize with empty periods
        setTimetable(
          daysOfWeek.map((day) => ({
            day,
            periods: [
              {
                startTime: "",
                endTime: "",
                groupActivity: "",
                activity: "",
                selectedGroup: "",
                activityOptions: [],
              },
            ],
          }))
        );
      }
    }
  };

  const handlePeriodChange = (dayIndex, periodIndex, event) => {
    const { name, value } = event.target;

    // Create a shallow copy of the timetable
    const updatedTimetable = timetable.map((day, dIdx) => {
      if (dIdx !== dayIndex) return day; // Keep other days unchanged

      // Create a new copy of the periods
      const updatedPeriods = day.periods.map((period, pIdx) => {
        if (pIdx !== periodIndex) return period; // Keep other periods unchanged

        // Initialize updatedPeriod with the current period's values
        const updatedPeriod = { ...period, [name]: value };

        // If groupActivity is changed, reset activity and update activityOptions
        if (name === "groupActivity") {
          updatedPeriod.activity = ""; // Reset activity
          const group = activityList.find((group) => group._id === value);
          
          updatedPeriod.activityOptions = group ? group.activity : []; // Set options or empty array
        }

        return updatedPeriod;
      });

      // Return the updated day with the modified periods
      return {
        ...day,
        periods: updatedPeriods,
      };
    });

    // Update state with the new timetable
    setTimetable(updatedTimetable);
  };

  const handleAddPeriod = (dayIndex) => {
    const values = [...timetable];
    values[dayIndex] = {
      ...values[dayIndex],
      periods: [
        ...values[dayIndex].periods,
        {
          startTime: "",
          endTime: "",
          groupActivity: "",
          activity: "",
        },
      ],
    };
    setTimetable(values);
  };

  const handleRemovePeriod = (dayIndex, periodIndex) => {
    const values = timetable.map((day, dIdx) => {
      if (dIdx !== dayIndex) return day;

      return {
        ...day,
        periods: day.periods.filter((_, pIdx) => pIdx !== periodIndex),
      };
    });

    setTimetable(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!classId) {
      return toast.warning('Chưa chọn lớp');
    }
    const data = {
      class_id: classId,
      weekStart: format(startOfSelectedWeek, "yyyy/MM/dd"),
      weekEnd: format(endOfSelectedWeek, "yyyy/MM/dd"),
      content: timetable,
    };
    
    updateSchedule(data).unwrap().then(response => toast.success(response.message));
    
  };

  const onChangeClass = (e) => {
    const sclass = classList.find((el) => el._id.includes(e.target.value));
    const editSclass = sclass.schedule.find((schedule) =>
      schedule.weekStart.includes(format(startOfSelectedWeek, "yyyy/MM/dd"))
    );

    if (editSclass) {
      setTimetable(
        editSclass.content.map((day) => ({
          ...day,
          periods: day.periods.map((period) => ({
            ...period,
            activityOptions: activityList.find(groupAct => groupAct._id === period.groupActivity._id).activity
          })),
        }))
      );
    } else {
      setTimetable(
        daysOfWeek.map((day) => ({
          day,
          periods: [
            {
              startTime: "",
              endTime: "",
              groupActivity: "",
              activity: "",
              activityoptions: []
            },
          ],
        }))
      );
    }
    setClassId(sclass._id);
  };
  
  return (
    <div className="flex p-6 flex-col gap-4">
      <label>Chọn ngày</label>
      <input
        className="p-2 border border-gray-300 rounded-lg"
        type="date"
        onChange={handleDateChange}
        value={format(startDate, "yyyy-MM-dd")}
      />
      <div>
        Tuần đã chọn: {format(startOfSelectedWeek, "yyyy/MM/dd")} -{" "}
        {format(endOfSelectedWeek, "yyyy/MM/dd")}
      </div>

      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <p>Chọn lớp:</p>
          <select
            name="date"
            className="border-2 border-black"
            onChange={onChangeClass}
          >
            <option>------</option>
            {classList?.map((sclass) => (
              <option value={sclass._id} key={sclass._id}>
                {sclass.name}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <Loading size={12} />
        ) : (
          <form onSubmit={handleSubmit}>
            {timetable?.map((day, dayIndex) => (
              <div className="p-3 shadow-md my-2 border-2" key={dayIndex}>
                <h3 className="font-bold">{day.day}</h3>
                {day.periods.map((period, periodIndex) => (
                  <div
                    className="border-2 p-2 flex flex-col 2xl:flex-row items-center gap-2 md:gap-6"
                    key={periodIndex}
                  >
                    <label>Thời gian bắt đầu</label>
                    <input
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="time"
                      name="startTime"
                      onChange={(event) =>
                        handlePeriodChange(dayIndex, periodIndex, event)
                      }
                      required
                      defaultValue={period.startTime}
                    />
                    <label>Thời gian kết thúc</label>
                    <input
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="time"
                      name="endTime"
                      defaultValue={period.endTime}
                      onChange={(event) =>
                        handlePeriodChange(dayIndex, periodIndex, event)
                      }
                      required
                    />

                    <p>Chọn nhóm hoạt động:</p>
                    <select
                      value={period.groupActivity._id}
                      name="groupActivity"
                      className="border-2 border-black"
                      onChange={(e) =>
                        handlePeriodChange(dayIndex, periodIndex, e)
                      }
                    >
                      <option value=""></option>
                      {activityList.map((group) => (
                        <option value={group._id} key={group._id}>
                          {group.group_activity}
                        </option>
                      ))}
                    </select>
                    <p>Chọn hoạt động:</p>
                    <select
                      value={period.activity}
                      name="activity"
                      className="border-2 border-black"
                      onChange={(e) =>
                        handlePeriodChange(dayIndex, periodIndex, e)
                      }
                    >
                      <option value=""></option>
                      {period.activityOptions?.map((activity) => (
                        <option value={activity.name} key={activity._id}>
                          {activity.name}
                        </option>
                      ))}
                    </select>

                    <button
                      className="border bg-red-500 px-3 py-1 rounded-lg"
                      type="button"
                      onClick={() => handleRemovePeriod(dayIndex, periodIndex)}
                    >
                      Xóa
                    </button>
                  </div>
                ))}
                <button
                  className="bg-green-400 px-3 py-1 mt-2 w-full md:w-auto rounded-lg"
                  type="button"
                  onClick={() => handleAddPeriod(dayIndex)}
                >
                  Thêm
                </button>
              </div>
            ))}
            <button disabled={isSavingSchedule} className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700" type="submit">Lưu</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
