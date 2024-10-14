import React from 'react'

const TimeInput = ({
	label,
	name,
	register,
	className = '',
	error = '',
	required = true,
	applyMarginBottom,
	defaultvalue,
}) => {
	console.log('default time', register)

	return (
		<div className={`w-full ${className}`}>
			{label && (
				<label
					htmlFor={name}
					className={`block w-full text-sm font-medium text-gray-900 ${applyMarginBottom ? 'mb-2' : ''} `}
				>
					{label}
				</label>
			)}
			<input
				type="time" // This will use the browser's native time picker
				id={name}
				{...register(name, {
					required: required ? `${label} is required` : false,
				})}
				defaultValue={defaultvalue ? dayjs(defaultvalue, 'h:mm a') : null}
				className={`bg-gray-50 hover:bg-white outline-none border border-gray-300 hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500`}
			/>
			{error && <p className="text-sm mt-1 text-red-500 py-1">{error}</p>}
		</div>
	)
}

export default TimeInput
