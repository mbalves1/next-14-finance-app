'use client'

import { useFormStatus } from "react-dom";
import Button from "./button";
import { Loader } from "lucide-react";

export default function SubmitButton(props) {
  const { pending } = useFormStatus()
  return <Button {...props} className={`${props.className} flex item-center justify-center space-x-2`}>
    { pending && <Loader className="animate-spin w-4 h-4" /> }
    <span>{ props.children }</span>
  </Button>
}