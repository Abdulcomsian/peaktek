const Input = ({
	className = '',
	label,
	type = 'text', // Default type
	placeholder,
	id,
	name = '',
	register, // This should be a function from useForm()
	defaultValue,
	disabled,
	required = true,
	error = '',
	inputClass,
	maxLength,
	onChange, // Custom onChange handler
	numberOnly = false, // Prop to restrict input to numbers
	format, // New prop for input formatting
}) => {
	const formatValue = (value) => {
		switch (format) {
			case 'invoice':
				// Example format: 00-000-0000-00000
				return value.replace(/(\d{2})(\d{3})(\d{4})(\d{5})/, '$1-$2-$3-$4')
			case 'phone':
				// Example format: (123) 456-7890
				return value.replace(/\D/g, '')
			case 'currency':
				// Currency format
				return parseFloat(value).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})
			default:
				return value // No formatting
		}
	}

	return (
		<div className={`w-full ${className}`}>
			{label && (
				<label htmlFor={id} className="block w-full text-sm font-medium text-gray-900 mb-1">
					{label}
				</label>
			)}
			<input
				type={type}
				id={id}
				placeholder={placeholder}
				name={name}
				defaultValue={defaultValue}
				disabled={disabled}
				maxLength={maxLength}
				className={`bg-white text-sm rounded-md w-full p-2 border border-gray-300 ${inputClass}`}
				{...(register ? register(name, { required }) : {})} // Use register if available
				onChange={(e) => {
					let newValue = e.target.value
					// Restrict input to numbers if `numberOnly` is true
					if (numberOnly) {
						newValue = newValue.replace(/[^0-9]/g, '')
					}

					// Apply formatting based on the format prop
					newValue = formatValue(newValue)

					e.target.value = newValue // Update the input value with the formatted one

					if (onChange) {
						onChange(e) // Custom onChange logic if passed from parent
					}
				}}
			/>
			{error && <p className="text-sm mt-1 text-red-500">{error.message}</p>}
		</div>
	)
}

export default Input
