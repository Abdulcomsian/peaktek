import React, { Fragment, useState, useEffect } from 'react'
import { CheckBox } from '@components/FormControls'
import { COCInsuranceForm } from '@components/Forms'
import { useParams, useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import { useForm } from 'react-hook-form'
import TabsContentBox from '@components/UI/TabsContentBox'
import { Tabs } from '@components/UI'
import COCForm from './COCForm'
import { getCoc, updateCOCStatus } from '@services/apiCOC'
import InsuranceInfo from './InsuranceInfo'
import toast from 'react-hot-toast'

const tabsDesignMeeting = [
	{ id: 1, title: 'COC FORM' },
	{ id: 2, title: 'COC INSURANCE EMAIL' },
]

const Complete = () => {
	const { id: jobId } = useParams() // Get jobId from params
	const navigate = useNavigate()
	const [currTab, setCurrTab] = useState(1)
	const [loading, setLoading] = useState(false)
	const [pdfUrl, setPdfUrl] = useState('')

	const {
		control,
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isSubmitting, isLoading },
	} = useForm({
		defaultValues: async () => {
			const resp = await getCoc(jobId)
			if (resp.status >= 200 && resp.status < 300) {
				setPdfUrl(resp.data.pdf_url) // Store PDF URL
				return resp.data
			}
			if (resp.status === 401) {
				logout()
				navigate('/')
			}
		},
	})

	// Handle checkbox changes
	const handleCheckboxChange = async (e) => {
		const status = e.target.checked // true if checked, false if unchecked
		try {
			setLoading(true) // Show loader while the request is in progress
			const dataToLoad = { status } // API body containing the status
			const resp = await updateCOCStatus(dataToLoad, jobId)

			if (resp) {
				toast.success(`COC status updated to ${status ? 'complete' : 'incomplete'}`)
			} else {
				toast.error('Failed to update COC status.')
			}
		} catch (error) {
			toast.error('An error occurred while updating COC status.')
		} finally {
			setLoading(false) // Hide loader after request completion
		}
	}

	return (
		<Fragment>
			{loading && <Spin fullscreen={true} />}
			<div className={`flex items-center gap-2`}>
				<CheckBox
					label="COC complete"
					id="status"
					name="status"
					register={register}
					wrapperClassName="flex items-center justify-end gap-2 col-span-2"
					onChange={handleCheckboxChange} // Call API on checkbox change
				/>
			</div>
			<div className="bg-white p-5 rounded-2xl">
				<InsuranceInfo />
				<TabsContentBox>
					<div>
						<Tabs items={tabsDesignMeeting} activeTab={currTab} onClick={setCurrTab} />
						{currTab === 1 && (
							<COCForm
								register={register}
								control={control}
								getValues={getValues}
								handleSubmit={handleSubmit}
								isSubmitting={isSubmitting}
								pdfUrl={pdfUrl}
							/>
						)}
						{currTab === 2 && <COCInsuranceForm />}
					</div>
				</TabsContentBox>
			</div>
		</Fragment>
	)
}

export default Complete
