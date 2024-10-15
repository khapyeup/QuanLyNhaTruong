import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassList, getDetailClass, updateSchedule } from '../../../redux/sclassRelated/sclassHandle';

const TimeTable = () => {
    const dispatch = useDispatch()
    const { classList, classDetails, loading } = useSelector(state => state.sclass)
    
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
        values[dayIndex].periods[periodIndex][event.target.name] = event.target.value;
        setTimetable(values);
    };

    const handleAddPeriod = (dayIndex) => {
        const values = [...timetable];
        values[dayIndex].periods = [...values[dayIndex].periods, {startTime: '', endTime: '', activity: ''}]
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
        const editSclass = sclass.schedule.map(sclass => ({...sclass}))
        setTimetable(editSclass)

        setClassId(sclass._id)
        console.log(timetable)
    }
    
    useEffect(() => {
        dispatch(getClassList());
    }, [classId])

    return (
        <>
            <select onChange={onChangeClass}>
                <option>------</option>
                {classList?.map(sclass => 
                    <option value={sclass._id} key={sclass._id}>{sclass.name}</option>
                )}
            </select>
            {loading ? <p className='w-full text-red-300'>Đang tải....</p>: (<form onSubmit={handleSubmit}>
                {timetable?.map((day, dayIndex) => (
                    <div key={dayIndex}>
                        <h3 className='font-bold'>{day.day}</h3>
                        {day.periods.map((period, periodIndex) => (
                            <div key={periodIndex}>
                                <label>Thời gian bắt đầu</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    onChange={(event) => handlePeriodChange(dayIndex, periodIndex, event)}
                                    required
                                    value={period.startTime}
                                />
                                <label>Thời gian kết thúc</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={period.endTime}
                                    onChange={(event) => handlePeriodChange(dayIndex, periodIndex, event)}
                                    required
                                />
                                <label>Hoạt động:</label>
                                <input
                                    type="text"
                                    name="activity"
                                    value={period.activity}
                                    onChange={(event) => handlePeriodChange(dayIndex, periodIndex, event)}
                                    required
                                />

                                <button className='border bg-red-500 p-1 rounded-lg' type="button" onClick={() => handleRemovePeriod(dayIndex, periodIndex)}>Xóa</button>
                            </div>
                        ))}
                        <button className='bg-green-400 p-1 rounded-lg' type="button" onClick={() => handleAddPeriod(dayIndex)}>Thêm</button>
                    </div>
                ))}
                <button type="submit">Lưu</button>
            </form>)}
            
        </>

    );
};

export default TimeTable;
