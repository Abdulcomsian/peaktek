import { CheckBox } from '@components/FormControls'
import { useForm } from 'react-hook-form'
import PaymentSummary from '../PaymentSummary'
import CkeditorControlled from '@components/FormControls/CkeditorControlled'
import ButtonSave from '@components/UI/ButtonSave'
import { getFinalPaymentStats, updateFinalPaymentStatus } from '@services/apiFinalPaymentDue'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setActiveTab } from '@store/slices/activeTabSlice'

export default function FinalDuePayment() {
	const { id: jobId } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm({
		defaultValues: async () => {
			const data = await getFinalPaymentStats(jobId)
			console.log('COC FINAL PAYMENTS', data)
			if (data.status >= 200 && data.status < 300) {
				return data.data
			}
			if (data.status === 422) {
				return data.response.data.data
			}
			return {}
		},
	})

	const isAllPaid = Boolean(+getValues()?.summary?.balance)
	console.log(isAllPaid, !isAllPaid)

	const onSubmit = async function (data) {
		const dataToLoad = {
			notes: data.notes,
			status: data.status === undefined ? false : data.status,
		}
		console.log(data, dataToLoad)
		const resp = await updateFinalPaymentStatus(dataToLoad, jobId)

		if (resp.status >= 200 && resp.status < 300) {
			toast.success(resp.message)

			if (Boolean(resp.data.status)) {
				console.log('RESP FINAL DUE PAYMENT', Boolean(resp.data.status))
				dispatch(setActiveTab('ready-to-close'))
				navigate(`/job-details/${jobId}/ready-to-close`)
			}
		}
		console.log(resp)
	}
	const handleCheckboxChange = (e) => {
		// Set the value of "sent" in form state
		handleSubmit(onSubmit)() // Submit the form
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<CheckBox
				label="fully paid"
				register={register}
				name="status"
				id="status"
				disabled={isAllPaid}
				onChange={handleCheckboxChange}
			/>
			<div className="my-5 bg-stone-200 p-4 rounded-2xl">
				<h2 className="text-lg font-bold mb-3">Financial summary</h2>
				<PaymentSummary />
			</div>
			<div className="bg-white w-full rounded-2xl p-5 mb-4 lg:mb-0">
				<h2 className="text-lg font-bold mb-3">Notes</h2>
				<CkeditorControlled control={control} name="notes" id="notes" />
				<ButtonSave isLoading={isSubmitting} />
			</div>
		</form>
	)
}
