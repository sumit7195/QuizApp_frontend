import { Button } from "react-bootstrap"
import {useNavigate} from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
     <h1>Welome to Quiz Game</h1> 
     
      <h3>Login as User</h3>
      <Button onClick={() => navigate( "login" )} >Login</Button>
      
      <div>
        <span>Login As Admin</span>
        <Button  onClick={() => navigate( "/admin-login" )}>Admin</Button>
      </div>
       
    </div>
  )
}

export default HomePage
