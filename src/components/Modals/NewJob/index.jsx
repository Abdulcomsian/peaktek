import { useState } from 'react'
import Input from '@components/FormControls/Input'
import { Modal, Spin } from 'antd'
import { useForm } from 'react-hook-form'
import { createJob } from '@services/apiJobs'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Button } from '@components/UI'
import { useAuth } from '@context/AuthContext'
import { useNavigate } from 'react-router-dom'

const modalInputsData = [
	{
		id: '1',
		name: 'address',
		label: 'Job Address',
		placeholder: 'Enter new job',
		type: 'text',
	},
	{
		id: '2',
		name: 'name',
		label: 'Name',
		placeholder: 'Enter customer name',
		type: 'text',
	},
	{
		id: '3',
		name: 'email',
		label: 'Email',
		placeholder: 'Email address',
		type: 'email',
	},
]

function NewJobModal({ open, onCancel, onOk, onAddJob }) {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm()
	const dispatch = useDispatch()
	const [isCreating, setIsCreating] = useState(false)
	const { logout } = useAuth()
	const navigate = useNavigate()

	const [phone, setPhone] = useState('')

	const onSubmit = async (data) => {
		try {
			setIsCreating(true)
			const resp = await createJob(data)

			if (resp.status >= 200 && resp.status < 300) {
				toast.success(resp.data.message)
				onAddJob()
				onOk()
			}
			if (resp.status === 401) {
				logout()
				navigate('/')
			}
			if (resp.response.status === 422) toast.error(resp.response.data.message)
		} catch (error) {
		} finally {
			setIsCreating(false)
		}
	}

	// Handle phone number change with real-time masking
	const handlePhoneChange = (e) => {
		let value = e.target.value.replace(/\D/g, '') // Remove all non-digit characters
		console.log('Values', value)

		if (value.length > 3 && value.length <= 6) {
			value = `${value.slice(0, 3)}-${value.slice(3)}`
		} else if (value.length > 6) {
			value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`
		}

		setPhone(value)
		setValue('phone', value) // Update form value in react-hook-form
	}

	return (
		<Modal open={open} onCancel={onCancel} onOk={onOk} footer={null}>
			<h1 className="text-center text-xl font-semibold my-4">New Job</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				{modalInputsData?.map((data) => (
					<Input
						key={data.id}
						applyMarginBottom={true}
						name={data.name}
						label={data.label}
						placeholder={data.placeholder}
						className="mb-3"
						type={data.type} // Pass type dynamically
						register={register}
						error={errors?.[data.name]?.message}
					/>
				))}
				<Input
					key={4}
					applyMarginBottom={true}
					name="phone"
					label="Phone"
					placeholder="000-000-0000"
					className="mb-3"
					// Real-time phone number formatting
					register={register}
					error={errors?.phone?.message}
					maxLength={12}
					numberOnly={true}
					format={'phone'}
					onChange={handlePhoneChange}
				/>
				<div className="flex justify-center">
					<Button
						variant="gradient"
						type="Submit"
						className="px-4 py-2 text-white uppercase font-semibold min-w-[100px]"
						disabled={isCreating}
					>
						{isCreating ? <Spin /> : 'Add Job'}
					</Button>
				</div>
			</form>
		</Modal>
	)
}

export default NewJobModal
