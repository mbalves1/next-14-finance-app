'use client'
import DateRangeSelect from "@/components/date-range-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Range({ defaultView }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get('range') ?? defaultView ?? 'last30days';

  const handleChange = (e) => {
    const params = new URLSearchParams()
    params.set('range', e.target.value)
    replace(`${pathName}?${params.toString()}`)
  }

  return <DateRangeSelect value={range} onChange={handleChange} />
}