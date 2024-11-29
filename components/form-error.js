export default function FormError({ error }) {
  return  error && <div className="mt-1 text-xs text-red-500">{error.message}</div>
}