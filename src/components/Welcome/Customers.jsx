import JobCard from '@components/JobCard'
import { Card } from '..'

const labelToShow = [
	{ key: 'customers', label: 'Customers' }, // Corresponds to customers.new_leads
	{ key: 'in_progress', label: 'Commissions' }, // Corresponds to customers.in_progress
	{ key: 'deals_won_closed', label: 'Deals Won & Closed' }, // Corresponds to customers.final_payment
]

export default function Customers({ customers }) {
	console.log('Customers', customers)

	return (
		<Card className="">
			<h2 className="text-lg font-semibold tracking-wide mb-4">Current Jobs</h2>
			<div className="flex flex-col sm:flex-row gap-3">
				{labelToShow.map((item, index) => (
					<JobCard
						key={item.key} // Add a unique key for better React rendering
						label={item.label}
						number={customers[item.key]} // Dynamically access the value from the customers object
						className={`${index === 0 && '!bg-[#20b6d5]'} ${index === 1 && '!bg-[#22a3cc]'} ${
							index === 2 && '!bg-[#2590c2]'
						} w-full !text-blue-100 `}
						labeClassName="!font-medium !text-white"
					/>
				))}
			</div>
		</Card>
	)
}
