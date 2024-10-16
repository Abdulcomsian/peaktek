import { Input } from '@components/FormControls'
import ChequeInput from '@components/JobDetails/Summary/ChequeInput'
import { getFinalPaymentStats } from '@services/apiFinalPaymentDue'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export default function PaymentSummary() {
	const { id: jobId } = useParams()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: async () => {
			const data = await getFinalPaymentStats(jobId)
			console.log('COC FINAL PAYMENTS', data)
			if (data.status >= 200 && data.status < 300) {
				return data.data.summary
			}
			if (data.status === 422) {
				return data.response.data.data.summary
			}
			return {}
		},
	})
	return (
		<div className="flex flex-col lg:flex-row justify-between w-full max-w-screen-xl   mb-6 ">
			<div className="bg-white w-full rounded-2xl p-5 mb-4 lg:mb-0">
				<div className="flex flex-col lg:flex-row justify-start mb-4">
					<div className="flex justify-between  lg:flex-col  font-poppins font-normal text-sm  mb-4 lg:mb-0">
						<div className="text-black text-opacity-30 ">Job Total</div>
						<Input
							id="job_total"
							name="job_total"
							className="!w-20 ps-2"
							placeholder="10000"
							max={8}
							min={0}
							required={true}
							inputClass="text-xs px-1 py-1"
							register={register}
							disabled={true}
						/>
					</div>
					<div className="flex md:gap-4 px-0 lg:px-4 justify-between flex-wrap mb-4 lg:mb-0">
						<div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
							<div className="text-black text-opacity-30  mb-4 ">First Payment</div>
							<div className="flex">
								<Input
									id="first_payment"
									className="!w-16 ps-1 mr-1"
									placeholder="2560"
									name="first_payment"
									min={0}
									inputClass="text-xs px-1 py-1"
									register={register}
									disabled={true}
								/>
								<ChequeInput
									id="first_payment_cheque_number"
									placeholder="123FP"
									type="text"
									className="!w-24"
									name="first_payment_cheque_number"
									inputClass="text-xs px-1 py-1"
									register={register}
									disabled={true}
								/>
							</div>
						</div>
						<div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
							<div className="text-black text-opacity-30 mb-4">Deductable</div>
							<div className="flex">
								<Input
									id="deductable"
									className="!w-16 ps-1 mr-1"
									placeholder="2560"
									name="deductable"
									min={0}
									inputClass="text-xs px-1 py-1"
									register={register}
									disabled={true}
								/>
								<ChequeInput
									id="deductable_cheque_number"
									placeholder="123FP"
									type="text"
									className="!w-24"
									name="deductable_cheque_number"
									inputClass="text-xs px-1 py-1"
									register={register}
									disabled={true}
								/>
							</div>
						</div>
						<div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
							<div className="text-black text-opacity-30 mb-4 ">Upgrades</div>
							<div className="flex">
								<Input
									register={register}
									id="upgrades"
									className="!w-16 ps-1 mr-1"
									inputClass="text-xs px-1 py-1"
									placeholder="2560"
									name="upgrades"
									min={0}
									disabled={true}
								/>
								<ChequeInput
									id="upgrades_cheque_number"
									placeholder="123FP"
									type="text"
									className="w-24"
									inputClass="text-xs px-1 py-1"
									name="upgrades_cheque_number"
									register={register}
									disabled={true}
								/>
							</div>
						</div>
						<div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
							<div className="text-black text-opacity-30 mb-4">Final Payment</div>
							<div className="flex">
								<Input
									id="final_payment"
									className="!w-16 ps-1 mr-1"
									inputClass="text-xs px-1 py-1"
									placeholder="2560"
									name="final_payment"
									min={0}
									disabled={true}
									register={register}
								/>
								<ChequeInput
									id="final_payment_cheque_number"
									placeholder="123FP"
									register={register}
									type="text"
									inputClass="text-xs px-1 py-1"
									className="!w-24 "
									name="final_payment_cheque_number"
									disabled={true}
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-between items-center  lg:flex-col  font-poppins font-normal text-sm ">
						<div className="text-black  font-medium">Balance</div>

						<Input
							id="balance"
							inputClass="text-xs px-1 py-1"
							className="!w-20 "
							placeholder="Total balance"
							name="balance"
							disabled={true}
							register={register}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
