import {useForm} from "react-hook-form"
import {toast} from "react-toastify"
import { useAddComplaintMutation } from "../../redux/complaintRelated/complaintApiSlice"
import { useSelector } from "react-redux"

const AddComplaint = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()

    const {currentUser} = useSelector(state => state.user)

    const [addComplaint, {isLoading}] = useAddComplaintMutation() 

    const sendForm = (data) => {
        data.submittedBy = currentUser._id;
        addComplaint(data).unwrap().then(res => toast.success(res.message))
    }

    return (
       <div className="shadow-md rounded-lg p-6 bg-white">
            <h2 className="text-xl font-semibold mb-6">Thêm ý kiến</h2>
            <form onSubmit={handleSubmit(sendForm)}>
                <label className="block mb-2">Tiêu đề</label>
                <input {...register("title", {required: "Cần nhập tiêu đề"})} name="title" type="text" className={`mb-4 w-full border p-2 rounded-lg ${errors.title ? `border-red-500` : `border-gray-500`}`}/>
                {errors.title && <p className="mb-2 text-red-500 font-thin text-sm">{errors.title.message}</p>}
                <label className="block mb-2">Nội dung</label>
                <textarea {...register("description", {required: "Cần nhập nội dung ý kiến"})} name="description" type="text border" className={`mb-4 w-full border p-2 rounded-lg ${errors.description ? `border-red-500` : `border-gray-500`}`}/>
                {errors.description && <p className="text-red-500 font-thin text-sm p-2">{errors.description.message}</p>}
                <button disabled={isLoading} className={`disabled:bg-gray-600 disabled:cursor-not-allowed p-2 bg-light-blue-500 text-white hover:bg-light-blue-700 rounded-lg`}>Gửi ý kiến</button>
            </form>
       </div>
    )
}

export default AddComplaint