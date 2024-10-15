import React from 'react'
import { Select } from 'antd'
import { Controller } from 'react-hook-form'

export default function DropDown({
	control,
	name,
	label,
	id = '',
	vertical,
	className,
	labelClass,
	rules,
	options = [],
	placeholder,
}) {
	return (
		<div className={`flex items-center ${vertical ? 'flex-col !items-start' : ''} ${className}`}>
			{label ? (
				<label className={labelClass} htmlFor={id}>
					{label}
				</label>
			) : null}
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field }) => (
					<Select
						{...field}
						id={id}
						style={{
							width: `100%`,
						}}
						placeholder={placeholder}
						options={options}
					/>
				)}
			/>
		</div>
	)
}
