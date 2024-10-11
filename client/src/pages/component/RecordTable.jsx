import React from 'react'

export default function RecordTable({ data }) {
    return (<>
        {data.map(notice => 
            <tr>
            <td className="border border-slate-300">{notice.title}</td>
            <td className="border border-slate-300">{notice.date.split("T", 1)[0]}</td>
            <td className="border border-slate-300">
            <button>Xem</button>
            <button>Sửa</button>
            <button>Xóa</button>
          </td>
      </tr> 
        )}
    </>)
}

          
        
        
        
        
    

