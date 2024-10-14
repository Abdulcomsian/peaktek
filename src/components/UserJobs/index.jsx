import { getUserJobs } from '@services/apiJobs'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import LinkButton from '@components/UI/LinkButton'
import { dateDifference, formatCurrency } from '../../utils/helper'
import { Card, ColoredCirleByDays } from '@components/UI'

export default function UserJobs() {
	const [userJobs, setUserJobs] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [searchParams] = useSearchParams()
	const type = searchParams.get('type')
	const status = searchParams.get('status')

	useEffect(() => {
		async function fetchUserJobs() {
			const dataToLoad = {
				type: type,
				box: status,
			}

			setIsLoading(true)
			const resp = await getUserJobs(dataToLoad)
			if (resp.status >= 200 && resp.status < 300) {
				setUserJobs(resp.data.data)
			}
			setIsLoading(false)
		}
		fetchUserJobs()
	}, [type, status])

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

	if (userJobs.length === 0)
		return (
			<p className="text-stone-500 text-sm text-center mt-8">
				👋 Jobs are not yet created for this status,{' '}
				<LinkButton className="!text-sm" to="/jobs">
					Create new Job?
				</LinkButton>
			</p>
		)

	return (
		<Card className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 px-5 mt-5">
			{userJobs.map((job) => (
				<div className="bg-stone-200 rounded-2xl p-3 space-y-4">
					<div className=" px-3 py-1 mb-3 border-b border-stone-700 flex items-center justify-between">
						<p className="text-base font-medium ">{job.name}</p>
						{job?.summary ? (
							<p className="text-base font-light">{formatCurrency(job?.summary?.balance)}</p>
						) : (
							<p className="text-base font-light">{formatCurrency(job.amount ? job.amount : 0)}</p>
						)}
					</div>
					<Link to={`/job-details/${job.id}`}>
						<div className="space-y-2 bg-stone-100 p-3 rounded-2xl">
							<div className="space-y-2 border-b border-stone-700 pb-3">
								<p className="text-stone-800 font-light">{job.address}</p>
							</div>

							{dateDifference(job.updated_at || job.created_at) === 0 && (
								<p className="text-xs font-light flex items-center gap-2 ">
									<ColoredCirleByDays days={0} />
									<span>New to Stage</span>
								</p>
							)}

							{dateDifference(job.updated_at || job.created_at) > 0 && (
								<p className="text-xs font-light flex items-center gap-2">
									<ColoredCirleByDays days={dateDifference(job.updated_at || job.created_at)} />
									<span>{`${dateDifference(job.updated_at || job.created_at)} days`}</span>
								</p>
							)}
						</div>
					</Link>
				</div>
			))}
		</Card>
	)
}
