import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';


import { getClassList, getDetailClass, updateSchedule } from '../../../redux/sclassRelated/sclassHandle';
import { getActivityList } from '../../../redux/activityRelated/activityHandle';



const TimeTable = () => {
    const dispatch = useDispatch()
    const { classList, classDetails, loading } = useSelector(state => state.sclass)
    const { activityList } = useSelector(state => state.activity);

    const [classId, setClassId] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [timetable, setTimetable] = useState([]);

    const startOfSelectedWeek = startOfWeek(startDate, { weekStartsOn: 1 });
    const endOfSelectedWeek = endOfWeek(startDate, { weekStartsOn: 1 });

    const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        setStartDate(date);
    };

    const handlePeriodChange = (dayIndex, periodIndex, event) => {
        const values = [...timetable]; // Create a shallow copy
        const { name, value } = event.target;

        const updatedPeriod = {
            ...values[dayIndex].periods[periodIndex], // Spread the existing period
            [name]: value,
        };

        // If groupActivity is changed, reset activity
        if (name === 'groupActivity') {
            updatedPeriod.activity = ''; // Reset activity when group changes
            const group = activityList.find(group => group._id === value);
            updatedPeriod.activityOptions = group.activity || []; // Set options
        }

        values[dayIndex].periods[periodIndex] = updatedPeriod; // Assign updated period back

        setTimetable(values);
    };

    const handleAddPeriod = (dayIndex) => {
        const values = [...timetable];
        values[dayIndex] = { ...values[dayIndex], periods: [...values[dayIndex].periods, { startTime: '', endTime: '', groupActivity: '', activity: '', selectedGroup: '' }] }
        setTimetable(values);
    };

    const handleRemovePeriod = (dayIndex, periodIndex) => {
        const values = timetable.map((day, dIdx) => {
            if (dIdx !== dayIndex) return day;

            return {
                ...day,
                periods: day.periods.filter((_, pIdx) => pIdx !== periodIndex)
            };
        });

        setTimetable(values);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            weekStart: format(startOfSelectedWeek, 'yyyy/MM/dd'),
            weekEnd: format(endOfSelectedWeek, 'yyyy/MM/dd'),
            content: timetable
        }
        console.log(data);
        dispatch(updateSchedule(classId, data))
    };

    const onChangeClass = (e) => {
        const sclass = classList.find(el => el._id.includes(e.target.value));
        const editSclass = sclass.schedule.find(schedule => schedule.weekStart.includes(format(startOfSelectedWeek, 'yyyy/MM/dd')))

        if (editSclass)
            setTimetable(editSclass.content.map(period => ({
                ...period,
                selectedGroup: '',
                activityOptions: []
            })));

        else
            setTimetable(daysOfWeek.map(day => ({
                day,
                periods: [{ startTime: '', endTime: '', groupActivity: '', activity: '', selectedGroup: '', activityOptions: [] }]
            })))
        console.log(timetable)
        setClassId(sclass._id)

    }

    useEffect(() => {
        dispatch(getClassList());
        dispatch(getActivityList());
    }, [dispatch])

    return (
        <>

            <input type='date' onChange={handleDateChange} value={format(startDate, 'yyyy-MM-dd')} />
            <div>
                Tuan da chon: {format(startOfSelectedWeek, 'yyyy/MM/dd')} - {format(endOfSelectedWeek, 'yyyy/MM/dd')}
            </div>


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

                                    {/* <select onChange={(event) => handlePeriodChange(dayIndex, periodIndex, event)} required name="activity" defaultValue={period.activity}>
                                        {activityList.map(activity =>
                                            <option value={activity.activity_name} key={activity._id}>{activity.activity_name}</option>
                                        )}
                                    </select>
                                     */}
                                    <p>Chọn nhóm hoạt động:</p>
                                    <select value={period.groupActivity} name='groupActivity' className='border-2 border-black' onChange={(e) => handlePeriodChange(dayIndex, periodIndex, e)}>
                                        <option value="">Chọn nhóm hoạt động</option>
                                        {activityList.map(group =>
                                            <option value={group._id} key={group._id}>{group.group_activity}</option>
                                        )}
                                    </select>
                                    <p>Chọn hoạt động:</p>
                                    <select value={period.activity} name='activity' className='border-2 border-black' onChange={(e) => handlePeriodChange(dayIndex, periodIndex, e)}>
                                        <option value="">Chọn hoạt động</option>
                                        {period?.activityOptions?.map(activity =>
                                            <option value={activity.name} key={activity._id}>{activity.name}</option>
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



        </>

    );
};

export default TimeTable;


