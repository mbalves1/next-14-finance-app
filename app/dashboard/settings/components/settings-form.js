'use client'

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import { useFormState } from "react-dom";
import { updateSettings } from "@/lib/actions";
import Label from "@/components/label";
import DateRangeSelect from "@/components/date-range-select";
import FormError from "@/components/form-error";

const initialState = {
  message: '',
  error: false,
  errors: {}
}

export default function SettingsForm({ defaults }) {
  const [state, formAction] = useFormState(
    updateSettings,
    initialState
  );

  console.log(state);
  

  return (<>
   <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message?.length > 0 && <AlertSuccess>{state?.message}</AlertSuccess>}

      <Label htmlFor="fullName">User full name</Label>
      <Input type="text" name="fullName" id="fullName" placeholder="User full name" defaultValue={defaults?.fullName} />
      {state?.errors['fullName']?.map(error => <FormError key={`fullName-${error}`} error={error} />)}

      <Label htmlFor="defaultView">Default transaction views</Label>
      <DateRangeSelect name="defaultView" id="defaultView" defaultValue={defaults?.defaultView} />
      {state?.errors['defaultView']?.map(error => <FormError key={`defaultView-${error}`} error={error} />)}

      <SubmitButton>Upload Settings</SubmitButton>
    </form>
  </>)
}