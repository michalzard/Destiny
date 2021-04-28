import "../styles/main/LeftSidebar.scss";
import {Button} from "@material-ui/core";

function LeftSideBar(){
    return(
        <div className="leftsidebar">
        <div className="leftsidebar_logo">Logo gonna be here</div>
        
        <div className="leftsidebar_links">
        <Button color="primary" variant="contained">TEST</Button>
        <Button color="primary" variant="contained">TEST</Button>
        <Button color="primary" variant="contained">TEST</Button>
        <Button color="primary" variant="contained">TEST</Button>
        <Button color="primary" variant="contained">TEST</Button>
        <Button color="primary" variant="contained">TEST</Button>

        </div>

        </div>
    )
}

function LinkButton({redirect,text}){
return(
    <Button color="primary" variant="contained" href={redirect} >{text}</Button>
)
}

export default LeftSideBar;