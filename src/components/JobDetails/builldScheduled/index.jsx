import React, { useState, useEffect } from 'react'
import { BuildScheduledForm } from '@components/Forms'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import { Spin } from 'antd'
import SubTabs from './components/tabs'
import { useForm } from 'react-hook-form'
import { buildScheduled, getBuildSchedule, updateBuildConfirmStatus } from '@services/apiBuildScheduled'
import { ThreeDots } from 'react-loader-spinner'
import { Button, Loader } from '@components/UI'

import { CheckBox } from '@components/FormControls'
import { useDispatch } from 'react-redux'
import { setActiveTab } from '@store/slices/activeTabSlice'
const BuildScheduledTab = () => {
	const { id: jobId } = useParams()
	const [loading, setLoading] = useState(false)
	const [isConfirming, setIsConfirming] = useState(false)
	const location = useLocation()
	const [isCreating, setIsCreating] = useState(false)
	const path = location.pathname.split('/').pop()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		setValue,
		control,
		reset,
		watch,
		formState: { errors, isLoading, isSubmitting },
	} = useForm()
	//   {
	// 	defaultValues: async () => {
	// 		const resp = await getBuildSchedule(jobId)
	// 		console.log('Buil schedule', resp)
	// 		if (resp.status >= 200 && resp.status < 300) {
	// 			return { ...resp.data, confirmed: resp.data.confirmed === 'true' }
	// 		}
	// 	},
	// }

	useEffect(() => {
		const fetchBuildSchedule = async () => {
			const resp = await getBuildSchedule(jobId)
			if (resp.status >= 200 && resp.status < 300) {
				const buildData = resp.data

				// Convert build_time to HH:mm format for the time input
				const formattedTime = dayjs(buildData.build_time, 'h:mm A').format('HH:mm')

				// Set values in the form including formatted build_time
				setValue('build_date', buildData.build_date)
				setValue('build_time', formattedTime) // Ensure time is formatted
				setValue('homeowner', buildData.homeowner)
				setValue('homeowner_email', buildData.homeowner_email)
				setValue('contractor', buildData.contractor)
				setValue('contractor_email', buildData.contractor_email)
				setValue('supplier', buildData.supplier)
				setValue('supplier_email', buildData.supplier_email)
				setValue('confirmed', buildData.confirmed === 'true')
			}
		}

		fetchBuildSchedule()
	}, [jobId, setValue])

	const onSubmit = async (data) => {
		if (data.build_time) {
			const formattedTime = dayjs(data.build_time, ['hh:mm A', 'HH:mm']).format('hh:mm A')
			data.build_time = formattedTime
		}

		try {
			setIsCreating(true)
			const response = await buildScheduled({ ...data, confirmed: `${data.confirmed}` }, jobId)

			if (response?.status >= 200 && response?.status < 300) {
				toast.success(response.message)
				// if (response.data.status) {
				//   dispatch(setActiveTab("ready-to-close"));
				//   navigate(`/job-details/${jobId}/ready-to-close`);
				// }
			} else if (response?.status === 401) {
				toast.error('Session expired. Please log in again.')
				navigate('/')
			} else if (response?.status === 422) {
				// Display validation errors from the response
				toast.error(response.data.errors.build_time[0])
			} else {
				toast.error('Something went wrong. Please try again.')
			}
		} catch (error) {
		} finally {
			setIsCreating(false)
		}
	}

	const handleBuildConfirmation = async function (e) {
		const confirmation = e.target.checked
		const formData = new FormData()
		formData.append('confirmed', confirmation)
		setIsConfirming(true)
		try {
			const resp = await updateBuildConfirmStatus(formData, jobId)
			dispatch(setActiveTab('approved'))

			navigate(`/job-details/${jobId}/approved`)
			console.log('BUILD CONFIRMATION STATUS RESP', resp)
		} finally {
			setIsConfirming(false)
		}
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

	return (
		<div className="bg-white p-5 rounded-2xl w-full max-w-7xl">
			{loading && <Spin fullscreen={true} />}
			<div class="flex items-center gap-3 mb-2 ">
				<CheckBox
					register={register}
					name="confirmed"
					id="confirmed"
					label="Build Confirmed (Contractor/Homeowner):"
					onChange={handleBuildConfirmation}
					disabled={isConfirming}
				/>
				{isConfirming && <Loader width={'24px'} height={'24px'} color="#000" />}
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<BuildScheduledForm register={register} errors={errors} control={control} />
				<div className="flex justify-end mr-4">
					<Button disabled={isCreating} type="submit" variant="gradient">
						{isSubmitting ? <Loader width={'24px'} height={'24px'} color="#fff" /> : 'Submit'}
					</Button>
				</div>
			</form>
			<SubTabs className="mb-4" currentPath={path} />
		</div>
	)
}

export default BuildScheduledTab
