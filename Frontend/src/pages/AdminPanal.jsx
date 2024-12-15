import { useNavigate } from "react-router-dom";
const AdminPanal=()=>{
    const navigate = useNavigate(); 
    return(
        <>
        <h1>Welcom to my Admin Panal</h1>
        <div>
        <div id="sidebar"> logo
            <h4  onClick={()=>{ navigate("/login")}}>user Create </h4>
            <h4 onClick={()=>{ navigate("/usertable")}}>Asign Task </h4>
            <h4 onClick={()=>{ navigate("/displaydata")}}>Display Task </h4>
            <h4>View Asign Task</h4>
        </div>
        <div id="ShowData"> Show </div>

        </div>
        

        
        </>
    )
}
export default AdminPanal;