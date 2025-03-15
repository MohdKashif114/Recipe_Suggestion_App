"use server"
import {z} from 'zod'
// import { SignupFormSchema, FormState } from '../lib/signupSchema'

const SignupFormSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  lastname: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
    confirmpassword:z.string().trim()
  
}).refine((data)=>data.password===data.confirmpassword,{
    message:"The passwords dont match",
    path:["confirm password"]
});
 
 type FormState =
  | {
      errors?: {
        firstname?: string[]
        lastname?: string[]
        email?: string[]
        password?: string[]
        confirmpassword?: string[]
      }
      message?: string
    }
  | undefined
 
export async function signupValidation(state: FormState, formData: FormData) {
  // Validate form fields
  console.log("Validating credentials....");
  
  await new Promise(resolve=>setTimeout(resolve,3000));

  const validatedFields = SignupFormSchema.safeParse({
    lastname:formData.get('lastname'),
    firstname: formData.get('firstname'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmpassword:formData.get('confirmpassword')
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  else{
    console.log("Credential verified on server....");
    console.log(formData);
    return{
        message:"Credentials verfied correctly..."
    }
  }
 
  // Call the provider or db to create a user...
}