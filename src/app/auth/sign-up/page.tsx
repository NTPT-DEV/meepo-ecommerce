import { getCurrentSession, LoginUser, registerUser } from "@/actions/auth"
import SignUp from "@/components/auth/SignUp";
import { redirect } from "next/navigation";
import { z } from 'zod'

const SignUpSchema = z.object({
    email : z.string().email() ,
    password : z.string().min(5) 
})

type State = {
    message: string;
  };

const SignupPage = async() => {

const  {user} = await getCurrentSession();

    if(user) {
        return redirect('/')
    }

    const action = async (prevState : State | undefined , formData : FormData) => {
        'use server'
        const parsed = SignUpSchema.safeParse(Object.fromEntries(formData));
        if(!parsed.success) {
            return {
                message : 'Invalid from data'
            }
        }
        const { email , password } = parsed.data;
        const { user , error } = await registerUser(email , password);
        if(error) {
            return { message : error} 
        } else if(user) {
            await LoginUser(email , password)
            return redirect('/')
        }
    }

    return (
        <SignUp action={action} />
    )
}

export default SignupPage