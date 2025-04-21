import { getCurrentSession, LoginUser } from "@/actions/auth"
import SignIn from "@/components/auth/SignIn";
import { redirect } from "next/navigation";
import { z } from 'zod'

const SignInSchema = z.object({
    email : z.string().email() ,
    password : z.string().min(5) 
})

type State = {
    message: string;
  };

const SignInPage = async() => {

const  {user} = await getCurrentSession();

    if(user) {
        return redirect('/')
    }

    const action = async (prevState: State | undefined, formData: FormData) => {
        'use server'
        const parsed = SignInSchema.safeParse(Object.fromEntries(formData));
        if(!parsed.success) {
            return {
                message : 'Invalid from data'
            }
        }
        const { email , password } = parsed.data;
        const { user , error } = await LoginUser(email , password)
        if(error) {
            return { message : error} 
        } else if(user) {
            
            return redirect('/')
        }
    }

    return (
        <SignIn action={action} />
    )
}

export default SignInPage