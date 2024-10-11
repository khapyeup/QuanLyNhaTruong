import React, { useEffect } from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import { getDetailStudent } from '../../../redux/studentRelated/studentHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';



const ViewStudent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { studentDetails, error, response } = useSelector(state => state.student)
  const params = useParams()
  

  const TABLE_HEAD = ["Điểm kiểm tra 1", "Điểm kiểm tra 2", "Điểm cuối kì", "Điểm trung bình"];
  const TABLE_ROWS = studentDetails.diem;
  console.log(studentDetails)
  useEffect(() => {
    const id = params.id
    dispatch(getDetailStudent(id))
  }, [])
  return (
    <div>
      {console.log(TABLE_ROWS)}
      <Tabs value="info">
        <TabsHeader>
          <Tab key="info" value="info">
            <p>Info</p>
          </Tab>
          <Tab key="mark" value="mark">
            <p>Mark</p>
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key="info" value="info">
            <p>Họ và tên: {studentDetails.name}</p>
            <p>Tuổi: {studentDetails.age}</p>
            <p>Lớp: {studentDetails.class}</p>
            <p>Tên bố mẹ: {studentDetails.parentname}</p>
          </TabPanel>
          <TabPanel key="mark" value="mark">
            

              
                <table class="w-full text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map(head =>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            {head}
                          </p>
                        </th>
                      )}


                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS && TABLE_ROWS.map(row =>
                      <tr>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {row.markfirsttime}
                          </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                           {row.marksecondtime}
                          </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {row.semestermark}
                          </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {}
                          </p>
                        </td>
                      </tr>
                    )}
                    
                  </tbody>
                </table>
              

           
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default ViewStudent