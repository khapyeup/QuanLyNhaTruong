import { CiClock2 } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";

function BigCalendar({ timetable }) {
 
  return (
    <>
      {timetable ? (
        <div className="flex flex-col gap-5">
          <p className="text-xl text-center font-bold">Thời khoá biểu</p>
          <p className="text-center text-sm">
            {timetable.weekStart} - {timetable.weekEnd}
          </p>
          <table className="w-full table-auto">
            <thead>
              <tr>
                {timetable.content.map((item) => (
                  <th className="p-2 bg-[#D4F6FF] font-normal border border-gray-400" key={item.day}>
                    {item.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {timetable.content.map((item,i) => (
                  <td key={i} className="align-text-top">
                    {item.periods?.map((period) => (
                      <div key={period._id} className="shadow-lg text-sm border-2 odd:bg-[#C6E7FF] rounded-lg p-1 even:bg-[#FFDDAE] mb-3">
                        <div className="flex items-center gap-1 justify-center">
                          <CiClock2 className="text-lg"/>
                          <p>
                            {" "}
                            {period.startTime} - {period.endTime}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 justify-center">
                          <IoBookOutline className="text-lg"/>
                          <p>
                            {period.groupActivity.group_activity} -{" "}
                            {period.activity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-sm">Không có thời khoá biểu</p>
      )}
    </>
  );
}

export default BigCalendar;
