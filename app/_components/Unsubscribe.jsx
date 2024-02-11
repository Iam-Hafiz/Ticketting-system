"use client"
import { useFormState } from 'react-dom';

// Components
import SubmitBtn from "./SubmitBtn";
import { unsubscribeAction } from "../(auth)/actions";
import { Frown, Smile } from "lucide-react";

export default function Unsubscribe() {
    const initialState = { message: null};
    const unsubscribeActionWithValue = unsubscribeAction.bind(null, 'unsubscribe');
    const [state, dispatch] = useFormState(unsubscribeActionWithValue, initialState);
  return (
    <form action={dispatch}>
        {state?.message && !state.message?.includes('successfully') && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
        {state?.message?.includes('successfully') && (<p className="flex justify-center items-center text-green-600"><Smile /> {state.message}</p>)}
        <SubmitBtn initValue="Unsubscribe" loadingValue="Saving..."/>
    </form>
  )
}
