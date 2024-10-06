import {useState, useEffect} from "react"

export default function TaiKhoan() {
  const [taiKhoans, setTaiKhoans] = useState([]);

  useEffect(() => {
    async function getTaiKhoans() {
      const response = await fetch(`http://localhost:3000`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setTaiKhoans(records);
    }
    getTaiKhoans();
    return;
  }, [taiKhoans.length])
  return (
    <>
     <p>{taiKhoans.map((taiKhoan) => 
      taiKhoan.tendangnhap + " || " + taiKhoan.matkhau
     )}</p>
    </>
  )}
