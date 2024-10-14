import React from 'react'
import { InputContainer } from '@components'
import { CustomDatePicker, DateSelector, TimeInput, Input, CheckBox } from '@components/FormControls'
import { Button } from '@components/UI'

const BuildScheduledForm = ({ register, control, formData }) => {
	return (
		<div className="w-full">
			<h2 className="text-black text-xl font-medium mb-4 font-poppins">Build Details</h2>
			<InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
				<CustomDatePicker
					label="Build Date"
					className="md:mr-4 mb-4 md:mb-0"
					name="build_date"
					register={register}
					control={control}
				/>

				<TimeInput
					label="Build Time"
					placeholder="7:00 AM"
					name="build_time"
					register={register}
					control={control}
					className="md:mr-4 mb-4 md:mb-0"
				/>
			</InputContainer>

			<InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
				<Input
					label="Home Owner"
					placeholder="Alex"
					type="text"
					className="md:mr-4 mb-4 md:mb-0"
					name="homeowner"
					register={register}
					control={control}
				/>
				<Input
					label="Homeowner Email"
					placeholder="example@gmail.com"
					type="email"
					className="md:mr-4 mb-4 md:mb-0"
					name="homeowner_email"
					register={register}
					control={control}
				/>
			</InputContainer>

			<InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
				<Input
					label="Contractor"
					placeholder="JL Construction LLC"
					type="text"
					className="md:mr-4 mb-4 md:mb-0"
					name="contractor"
					register={register}
					control={control}
				/>
				<Input
					label="Contractor Email"
					placeholder="example@gmail.com"
					type="email"
					className="md:mr-4 mb-4 md:mb-0"
					name="contractor_email"
					register={register}
				/>
			</InputContainer>

			<InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
				<Input
					label="Supplier"
					placeholder="Home Depot"
					type="text"
					className="md:mr-4 mb-4 md:mb-0"
					name="supplier"
					register={register}
				/>
				<Input
					label="Supplier Email"
					placeholder="example@gmail.com"
					type="email"
					className="md:mr-4 mb-4 md:mb-0"
					name="supplier_email"
					id="supplier_email"
					register={register}
				/>
			</InputContainer>
		</div>
	)
}

export default BuildScheduledForm
