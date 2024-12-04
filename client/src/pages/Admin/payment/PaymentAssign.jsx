import { Stepper, Step } from "@material-tailwind/react";
import { useState } from "react";
import { useGetSclassListQuery } from "../../../redux/sclassRelated/sclassApiSlice";
import Loading from "../../component/Loading";
import { useGetStudentListQuery } from "../../../redux/studentRelated/studentApiSlice";
import { toast } from "react-toastify";
import { useGetFeeListQuery } from "../../../redux/feeRelated/feeApiSlice";
import { useAssignPaymentToClassMutation } from "../../../redux/paymentRelated/paymentApiSlice";
import { useNavigate } from "react-router-dom";

let formData = [];
export default function PaymentAssign() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSclass, setSelectedSclass] = useState("");
  const [students, setStudents] = useState([]);

  const { data: studentList } = useGetStudentListQuery();
  const { data: sclassList, isLoading: isSclassLoading } =
    useGetSclassListQuery();
  const { data: feeList, isLoading: isFeeLoading } = useGetFeeListQuery();
  const [assignPaymentToClass] = useAssignPaymentToClassMutation();

  const moveStep2 = () => {
    if (!selectedSclass) return toast.warning("Chưa chọn lớp!");
    setActiveStep(1);
    setStudents(
      studentList.filter((student) => student.class_id._id === selectedSclass)
    );
  };
  const moveStep3 = () => {
    if (formData.length === 0) return toast.warning("Chưa chọn học phí");
    //Gan hoc phi cho tat ca hoc sinh trong lop
    formData.forEach(
      (fee) =>
        (fee.students = students.map((student) => ({
          studentId: student._id,
          mealFee: false,
          transportFee: false,
        })))
    );
    console.log(formData);
    setActiveStep(2);
  };
  const changeSclass = (e) => {
    setSelectedSclass(e.target.value);
  };
  const changeFee = (e) => {
    if (e.target.checked) formData.push({ feeId: e.target.name });
    else formData = formData.filter((a) => a.feeId !== e.target.name);
  };
  const additionalFee = (studentIndex, e) => {
    // formData.forEach(fee => console.log(fee["674dbfca06dac21886a4c25e"][0]))
    if (e.target.name === "mealFee") {
      formData.forEach(
        (fee) => (fee.students[studentIndex].mealFee = e.target.checked)
      );
    } else if (e.target.name === "transportFee") {
      formData.forEach(
        (fee) => (fee.students[studentIndex].transportFee = e.target.checked)
      );
    }
    console.log(formData);
  };

  const submit = () => {
    assignPaymentToClass(formData)
      .unwrap()
      .then((response) => toast.success(response.message));
    navigate("/");
  };
  return (
    <>
      <div className="md:w-1/2 mx-auto">
        <Stepper activeStep={activeStep}>
          <Step>1</Step>
          <Step>2</Step>
          <Step>3</Step>
        </Stepper>
      </div>

      {isSclassLoading ? (
        <Loading />
      ) : (
        <div className="text-center">
          <div className="py-10">
            {/* Buoc 1 */}
            <div
              className={`mx-auto w-[200px] flex flex-col gap-4 ${
                !(activeStep === 0) && `hidden`
              }`}
            >
              <p>Chọn lớp để gán học phí</p>
              <select
                onChange={changeSclass}
                className="rounded-full p-2 border border-gray-500"
              >
                <option value=""></option>
                {sclassList?.map((sclass) => (
                  <option key={sclass._id} value={sclass._id}>
                    {sclass.name}
                  </option>
                ))}
              </select>
              <button
                onClick={moveStep2}
                className=" bg-black text-white rounded-full p-2"
              >
                Tiếp theo
              </button>
            </div>
            {/* Buoc 2 */}
            <div className={`text-center ${!(activeStep === 1) && `hidden`}`}>
              <p className="text-xl font-bold mb-6">
                Chọn học phí muốn áp dụng
              </p>
              <div>
                <div className="grid gap-2 grid-flow-col mb-6">
                  {feeList?.map((fee) => (
                    <label
                      className="bg-gray-200 p-2 rounded-full"
                      key={fee._id}
                    >
                      <input
                        name={fee._id}
                        type="checkbox"
                        onChange={changeFee}
                      />{" "}
                      {fee.name}
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={moveStep3}
                className=" bg-black text-white rounded-full p-2 w-[200px]"
              >
                Tiếp theo
              </button>
            </div>
            {/* Buoc 3 */}
            <div className={`text-center ${!(activeStep === 2) && `hidden`}`}>
              <table className="table-auto w-full text-left">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-gray-300 bg-gray-200">
                      Họ và tên
                    </th>
                    <th className="p-4 border-b border-gray-300 bg-gray-200">
                      Lớp
                    </th>
                    <th className="p-4 border-b border-gray-300 bg-gray-200">
                      Tiền thức ăn
                    </th>
                    <th className="p-4 border-b border-gray-300 bg-gray-200">
                      Tiền phương tiện
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student, studentIndex) => (
                    <tr>
                      <td className="p-4 border-b border-gray-300">
                        {student.name}
                      </td>
                      <td className="p-4 border-b border-gray-300">
                        {student.class_id.name}
                      </td>
                      <td className="p-4 border-b border-gray-300">
                        <input
                          className="size-4"
                          name="mealFee"
                          onChange={(e) => additionalFee(studentIndex, e)}
                          type="checkbox"
                        />
                      </td>
                      <td className="p-4 border-b border-gray-300">
                        <input
                          className="size-4"
                          name="transportFee"
                          onChange={(e) => additionalFee(studentIndex, e)}
                          type="checkbox"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={submit}
            hidden={activeStep != 2}
            className="bg-black text-white rounded-full p-2 w-[200px]"
          >
            Lưu
          </button>
        </div>
      )}
    </>
  );
}
