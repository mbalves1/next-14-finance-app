export default function Label(props) {
  return <label {...props} className={`block text-gray-700 dark:text-gray-300 ml-2 ${props.className}`}></label>
}