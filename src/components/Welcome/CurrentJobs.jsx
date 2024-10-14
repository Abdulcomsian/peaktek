import JobCard from '@components/JobCard'
import { Card } from '..'

const labelToShow = [
	{ key: 'new_leads', label: 'New Leads' },
	{ key: 'in_progress', label: 'Projects in Progress' },
	{ key: 'final_payment', label: 'Final Payment Due' },
]

export default function CurrentJobs({ currentJobs }) {
	console.log('Current jobs', currentJobs)

	return (
		<Card className="">
			<h2 className="text-lg font-semibold tracking-wide mb-4">Current Jobs</h2>
			<div className="flex flex-col sm:flex-row  gap-3">
				{labelToShow.map((item, index) => (
					<JobCard
						label={item.label}
						number={currentJobs?.[item.key] >= 0 ? currentJobs?.[item.key] : `--`}
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
