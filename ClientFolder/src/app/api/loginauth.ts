"use server"
import {z} from 'zod'
// import { SignupFormSchema, FormState } from '../lib/signupSchema'

const LoginFormSchema = z.object({
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
    
  
})
 
 type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
 
export async function loginValidation(state: FormState, formData: FormData) {
  // Validate form fields
  console.log("Validating credentials for login....");
  console.log(FormData);
  
  await new Promise(resolve=>setTimeout(resolve,3000));

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
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