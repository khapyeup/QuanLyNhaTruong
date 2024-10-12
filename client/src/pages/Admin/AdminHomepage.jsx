import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherList } from '../../redux/teacherRelated/teacherHandle'
import { getStudentList } from '../../redux/studentRelated/studentHandle'
import { getClassList } from '../../redux/sclassRelated/sclassHandle'
import { getNoticeList } from '../../redux/noticeRelated/noticeHandle'
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { RiParentLine } from "react-icons/ri";
import { Typography, Card, CardHeader, CardBody } from '@material-tailwind/react';
import Chart from "react-apexcharts";
import { getParentList } from '../../redux/parentRelated/parenHandle'

function AdminHomepage() {
  const dispatch = useDispatch()

  const { teacherList } = useSelector((state) => state.teacher)
  const { classList } = useSelector((state) => state.sclass)
  const { studentList } = useSelector((state) => state.student)
  const { noticeList } = useSelector((state) => state.notice)
  const { parentList } = useSelector((state) => state.parent);
  const { currentUser } = useSelector((state) => state.user)

  const numberOfTeacher = teacherList && teacherList.length;
  const numberOfClass = classList && classList.length
  const numberOfStudent = studentList && studentList.length
  const numberOfParent = parentList ? parentList.length : 0;

  console.log(parentList);

  useEffect(() => {
    dispatch(getTeacherList())
    dispatch(getStudentList())
    dispatch(getClassList())
    dispatch(getNoticeList())
    dispatch(getParentList())
  }, [currentUser._id])

  const tableHead = ['ID', 'Tiêu đề', 'Ngày tạo', ''];
  const tableRow = noticeList;
  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };


  return <>
    <div className='flex flex-col flex-1 p-14 gap-7 overflow-scroll'>
      {/* Container render total */}
      <div className=" p-2 gap-y-7 flex flex-col lg:flex-row justify-evenly items-center">
        <div className="text-white rounded-lg  bg-red-400 flex flex-col items-center justify-center gap-2 shadow-lg border p-2 min-w-56 min-h-40  hover:transition-transform hover:scale-110">
          <PiStudent className='size-20' />
          <p>Số lượng học sinh</p>
          <i className='fa fa-heart'></i>
          <p>{numberOfStudent.length == 0 ? 0 : numberOfStudent}</p>
        </div>
        <div className="text-white rounded-lg bg-amber-700 flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40 hover:transition-transform hover:scale-110">
          <FaChalkboardTeacher className='text-white size-20' />
          <p>Số lượng giáo viên</p>
          <p>{numberOfTeacher.length == 0 ? 0 : numberOfTeacher}</p>
        </div>
        <div className="text-white rounded-lg bg-lime-800 flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40  hover:transition-transform hover:scale-110">
          <MdOutlineClass className='text-white size-20' />
          <p>Số lượng lớp</p>
          <p>{numberOfClass.length == 0 ? 0 : numberOfClass}</p>
        </div>
        <div className="text-white rounded-lg bg-deep-orange-900 flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40 hover:transition-transform hover:scale-110">
          <RiParentLine className='text-white size-20' />

          <p>Số lượng phụ huynh</p>
          <p>{numberOfParent}</p>
        </div>
      </div>

      {/* Container render notices */}
      <div>
        <Typography variant='h5'>
          Thông báo
        </Typography>
        <table className="w-full min-w-full table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-75'>
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRow.map(({ title, date }, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {title}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {date.substring(0, 10)}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    Xem
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >

            <div>
              <Typography variant="h6" color="blue-gray">
                Lợi nhuận
              </Typography>

            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>
    </div>
  </>

}

export default AdminHomepage