import { githubProvider } from "../config/authMethods";
import socialMediaAuth from "../service/auth";



export function Login() {
    const handleOnClick = async (provider) => {
        const res = await socialMediaAuth(provider);
        console.log(res);
      }
    return <div>

    <button onClick={() => handleOnClick(githubProvider)}> Github </button>
    
    
  
</div>
}

