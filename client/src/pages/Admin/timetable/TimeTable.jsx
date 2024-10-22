import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import MyCalendar from '../../component/Callendar'
import { getClassList, getDetailClass, updateSchedule } from '../../../redux/sclassRelated/sclassHandle';
import { getActivityList } from '../../../redux/activityRelated/activityHandle';



const TimeTable = () => {
    const dispatch = useDispatch()
    const { classList, classDetails, loading } = useSelector(state => state.sclass)
    const { activityList } = useSelector(state => state.activity);

    const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

    const [timetable, setTimetable] = useState(
        daysOfWeek.map(day => ({
            day,
            periods: [{}]
        }))
    );
    const [classId, setClassId] = useState('')

    const handlePeriodChange = (dayIndex, periodIndex, event) => {
        const values = [...timetable];
        values[dayIndex] = {
            ...values[dayIndex],
            periods: values[dayIndex].periods.map((period, idx) =>
                idx === periodIndex
                    ? { ...period, [event.target.name]: event.target.value }
                    : period
            )
        };
        setTimetable(values);
    };

    const handleAddPeriod = (dayIndex) => {
        const values = [...timetable];
        values[dayIndex].periods = [...values[dayIndex].periods, { startTime: '', endTime: '', activity: '' }]
        setTimetable(values);
    };

    const handleRemovePeriod = (dayIndex, periodIndex) => {
        const values = [...timetable];
        values[dayIndex].periods.splice(periodIndex, 1);
        setTimetable(values);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Timetable:', timetable);
        dispatch(updateSchedule(classId, timetable))
    };

    const onChangeClass = (e) => {
        const sclass = classList.find(el => el._id.includes(e.target.value))
        const editSclass = sclass.schedule.map(sclass => ({ ...sclass }))
        setTimetable(editSclass)

        setClassId(sclass._id)
        console.log(timetable)
    }

    useEffect(() => {
        dispatch(getClassList());
        dispatch(getActivityList());
    }, [classId])

    return (
        <>
            <div className='p-4'>
                <div className='flex flex-col md:flex-row gap-3'>
                    <p>Chọn lớp:</p>
                    <select className='border-2 border-black' onChange={onChangeClass}>
                        <option>------</option>
                        {classList?.map(sclass =>
                            <option value={sclass._id} key={sclass._id}>{sclass.name}</option>
                        )}
                    </select>
                </div>

                {loading ? <p className='w-full text-red-300'>Đang tải....</p> : (<form onSubmit={handleSubmit}>
                    {timetable?.map((day, dayIndex) => (
                        <div className='p-3 shadow-md my-2 border-2' key={dayIndex}>
                            <h3 className='font-bold'>{day.day}</h3>
                            {day.periods.map((period, periodIndex) => (
                                <div className='border-2 p-2 flex flex-col sm:flex-row items-center gap-2 md:gap-6' key={periodIndex}>
                                    <label>Thời gian bắt đầu</label>
                                    <input
                                        className='bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        type="time"
                                        name="startTime"
                                        onChange={(event) => handlePeriodChange(dayIndex, periodIndex, event)}
                                        required
                                        defaultValue={period.startTime}
                                    />
                                    <label>Thời gian kết thúc</label>
                                    <input
                                        className='bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        type="time"
                                        name="endTime"
                                        defaultValue={period.endTime}
                                        onChange={(event) => handlePeriodChange(dayIndex, periodIndex, event)}
                                        required
                                    />
                                    <label>Hoạt động:</label>
                                    {/* <input
                                        type="text"
                                        name="activity"
                                        value={period.activity}
                                        onChange={(event) => handlePeriodChange(dayIndex, periodIndex, event)}
                                        required
                                    /> */}

                                    <select onChange={(event) => handlePeriodChange(dayIndex, periodIndex, event)} required name="activity" defaultValue={period.activity}>
                                        {activityList.map(activity =>
                                            <option value={activity.activity_name} key={activity._id}>{activity.activity_name}</option>
                                        )}
                                    </select>
                                    <button className='border bg-red-500 px-3 py-1 rounded-lg' type="button" onClick={() => handleRemovePeriod(dayIndex, periodIndex)}>Xóa</button>
                                </div>
                            ))}
                            <button className='bg-green-400 px-3 py-1 mt-2 w-full md:w-auto rounded-lg' type="button" onClick={() => handleAddPeriod(dayIndex)}>Thêm</button>
                        </div>
                    ))}
                    <button type="submit">Lưu</button>
                </form>)}
            </div>

            <div className='h-full'>
                <MyCalendar />
            </div>

        </>

    );
};

export default TimeTable;
