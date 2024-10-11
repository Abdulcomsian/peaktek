import { useSelector } from 'react-redux'
import { InputContainer } from '@components'
import { Input } from '@components/FormControls'

export default function ClientInformation({ register, className }) {
	const { name, email, phone } = useSelector((state) => state?.jobs?.singleJobData)
	return (
		<div className={`w-full ${className}`}>
			<InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
				<Input
					label="Name:"
					placeholder="John Doe"
					className="md:mr-4 mb-4 md:mb-0"
					disabled={true}
					name="name"
					id="name"
					defaultValue={name}
				/>
				<Input
					label="Email:"
					placeholder="john@gmail.com"
					type="email"
					className="md:mr-4 mb-4 md:mb-0"
					disabled={true}
					defaultValue={email}
					name="email"
					id="email"
				/>
				<Input
					label="Phone:"
					placeholder="923081177825"
					className="mb-4 md:mb-0"
					disabled={true}
					defaultValue={phone}
					name="phone"
					id="phone"
				/>
			</InputContainer>
			<InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
				<Input
					label="Street:"
					placeholder="west Bridge"
					className="md:mr-4 mb-4 md:mb-0"
					name="street"
					id="street"
					register={register}
					required={false}
				/>
				<Input
					label="City:"
					placeholder="New York"
					className="md:mr-4 md:max-w-xs mb-4 md:mb-0"
					name="city"
					id="city"
					register={register}
					required={false}
				/>
				<Input
					label="State:"
					placeholder="NY"
					className="md:mr-4 md:max-w-40 mb-4 md:mb-0"
					name="state"
					id="state"
					register={register}
					required={false}
				/>
				<Input
					label="Zip:"
					placeholder="45678"
					type="number"
					className="md:max-w-40 mb-4 md:mb-0"
					name="zip_code"
					id="zip_code"
					register={register}
					required={false}
				/>
			</InputContainer>
			<InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
				<Input
					label="Insurance:"
					placeholder="eg. Health Insurance"
					className="md:mr-4 mb-4 md:mb-0"
					name="insurance"
					id="insurance"
					register={register}
					disabled={true}
				/>
				<Input
					label="Claim Number:"
					placeholder="23232323"
					className="md:mr-4 mb-4 md:mb-0"
					name="claim_number"
					id="claim_number"
					register={register}
					disabled={true}
				/>
				<Input
					label="Policy Number:"
					placeholder="7632456"
					type="number"
					className="mb-4 md:mb-0"
					name="policy_number"
					register={register}
					disabled={true}
				/>
			</InputContainer>
		</div>
	)
}
