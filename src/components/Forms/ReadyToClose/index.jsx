import { CheckBox, Input } from '@components/FormControls'
import { Button, DropDown } from '@components/UI'
import ButtonSave from '@components/UI/ButtonSave'
import { getReadyToClose, updateReadyToClose, updateReadyToCloseStatus } from '@services/apiReadyToClose'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { useEffect } from 'react'
import { formatePercentageInputValue, formateCurrencyInputValue } from '../../../utils/helper'
import { setActiveTab } from '@store/slices/activeTabSlice'
import { useDispatch } from 'react-redux'

const marketOptions = [
	{ label: 'Nashville', value: 'Nashville' },
	{ label: 'Chattanooga', value: 'Chattanooga' },
]

export default function ReadyToClose() {
	const { id: jobId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {
		control,
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isSubmitting, isLoading },
	} = useForm({
		defaultValues: async () => {
			const resp = await getReadyToClose(jobId)
			console.log(resp.data.data)
			if (resp.status >= 200 && resp.status < 300) {
				return resp.data.data
			} else return {}
		},
	})

	const isVarified = getValues()?.status === '1'
	const sales_rep1_commission_percentage = getValues()?.sales_rep1_commission_percentage
	const sales_rep2_commission_percentage = getValues().sales_rep2_commission_percentage

	const usersData = useSelector((state) => state?.users?.usersData)
	const userOptions = usersData.map((user) => ({
		value: `${user.id}`,
		label: user.name,
	}))

	useEffect(() => {
		const newValue = sales_rep1_commission_percentage?.replace('%', '')
		setValue('sales_rep1_commission_percentage', `${newValue}%`)
	}, [sales_rep1_commission_percentage])

	const onSubmit = async function (data) {
		console.log('RADY RTO CLOSE ONSUBMIT DATA', data)
		const resp = await updateReadyToClose(data, jobId)
		if (resp.status >= 200 && resp.status < 300) {
			toast.success(resp.data.message)

			if (Boolean(resp.data.data.status)) {
				console.log('RESP READY TO CLOSED PAYMENT', Boolean(resp.data.data.status))
				dispatch(setActiveTab('won-closed-jobs'))
				navigate(`/job-details/${jobId}/won-closed-jobs`)
			}
		}
		console.log(resp)
	}

	if (isLoading)
		return (
			<ThreeDots
				visible={true}
				height="80"
				width="80"
				color="#18faf8"
				radius="9"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClass="flex item-center justify-center"
			/>
		)

	// if (isVarified)
	//   return (
	//     <p className="text-sm text-stone-500 text-center">
	//       ⛔️ This job is already closed
	//     </p>
	//   );

	const handleCheckboxChange = async (e) => {
		const status = e.target.checked
		try {
			const resp = await updateReadyToCloseStatus({ status }, jobId) // Assuming this API updates the status
			if (resp.status >= 200 && resp.status < 300) {
				toast.success('Status updated successfully')
				// navigate(`/job-details/${jobId}/complete`)
			} else {
				toast.error('Failed to update status')
			}
		} catch (error) {
			toast.error('An error occurred while updating status')
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 bg-white p-5 rounded-2xl">
				<CheckBox
					label="Final Verifications:"
					register={register}
					name="status"
					id="status"
					wrapperClassName="col-span-2"
					onChange={handleCheckboxChange}
				/>
				<div className="col-span-full  bg-stone-200 p-4 rounded-2xl mb-4">
					<h2 className=" text-stone-500 font-semibold uppercase mb-2">Sales representatives:</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 bg-white p-4 rounded-2xl">
						<DropDown
							vertical={true}
							control={control}
							label="Sale Rep 1:"
							labelClass="font-medium text-sm"
							name="sales_rep1"
							id="sales_rep1"
							options={userOptions}
							placeholder="Select an option"
							rules={{ required: 'This field is required' }} // Optional validation rules
						/>
						<DropDown
							vertical={true}
							control={control}
							label="Sale Rep 2:"
							labelClass="font-medium text-sm"
							name="sales_rep2"
							id="sales_rep2"
							options={userOptions}
							placeholder="Select an option"
							rules={{ required: 'This field is required' }} // Optional validation rules
						/>
						<Input
							label="Commission Percentage:"
							register={register}
							name="sales_rep1_commission_percentage"
							id="sales_rep1_commission_percentage"
							min={0}
							max={100}
							onChange={(e) => {
								const value = e.target.value
								const newValue = value?.replaceAll('%', '')
								setValue('sales_rep1_commission_percentage', `${newValue}%`)
							}}
							validate={(value) => formatePercentageInputValue(value)}
							error={errors?.sales_rep1_commission_percentage?.message}
						/>
						<Input
							min={0}
							max={100}
							label="Commission Percentage:"
							name="sales_rep2_commission_percentage"
							id="sales_rep2_commission_percentage"
							register={register}
							onChange={(e) => {
								const value = e.target.value
								const newValue = value?.replaceAll('%', '')
								setValue('sales_rep2_commission_percentage', `${newValue}%`)
							}}
							validate={(value) => formatePercentageInputValue(value)}
							error={errors?.sales_rep2_commission_percentage?.message}
						/>
					</div>
				</div>
				<div className="col-span-full bg-stone-200 rounded-2xl p-4">
					<h2 className="col-span-full text-stone-500 font-semibold uppercase mb-2">financial summary:</h2>
					<div className="col-span-full grid grid-cols-1 sm:grid-cols-2 sm:gap-3 bg-white rounded-2xl p-4">
						<Input
							label="Deal value:"
							name="deal_value"
							id="deal_value"
							register={register}
							onChange={(e) => {
								const value = e.target.value
								const newValue = value?.replaceAll('$', '')
								setValue('deal_value', `$${newValue}`)
							}}
							validate={(value) => formateCurrencyInputValue(value)}
							error={errors?.deal_value?.message}
						/>
						<DropDown
							vertical={true}
							control={control}
							label="Market:"
							labelClass="font-medium text-sm"
							name="market"
							id="market"
							options={marketOptions}
							placeholder="Select an option"
							rules={{ required: 'This field is required' }} // Optional validation rules
						/>
						<Input
							label="Material Costs:"
							name="material_costs"
							id="material_costs"
							register={register}
							onChange={(e) => {
								const value = e.target.value
								const newValue = value?.replaceAll('$', '')
								setValue('material_costs', `$${newValue}`)
							}}
							validate={(value) => formateCurrencyInputValue(value)}
							error={errors?.material_costs?.message}
						/>
						<Input type="number" label="Square Count:" name="square_count" id="square_count" register={register} />
						<Input
							label="Labour Costs:"
							name="labor_costs"
							id="labor_costs"
							register={register}
							onChange={(e) => {
								const value = e.target.value
								const newValue = value?.replaceAll('$', '')
								setValue('labor_costs', `$${newValue}`)
							}}
							validate={(value) => formateCurrencyInputValue(value)}
							error={errors?.labor_costs?.message}
						/>
						<Input
							label="Costs of Goods:"
							name="costs_of_goods"
							id="costs_of_goods"
							register={register}
							onChange={(e) => {
								const value = e.target.value
								const newValue = value?.replaceAll('$', '')
								setValue('costs_of_goods', `$${newValue}`)
							}}
							validate={(value) => formateCurrencyInputValue(value)}
							error={errors?.costs_of_goods?.message}
						/>
					</div>
				</div>
				<ButtonSave isLoading={isSubmitting} className="col-span-2 justify-self-end" />
			</div>
		</form>
	)
}
