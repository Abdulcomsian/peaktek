import React, { Fragment, useEffect, useState } from 'react'
import { Ckeditor, FileUploader, Form } from '@components/FormControls'
import { Button, FileIcon, GalleryIcon, ImageIcon, Loader, Tabs, TabsContentBox } from '@components/UI'
import toast from 'react-hot-toast'
// import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from '@services/config'
import RenameFiles from '@components/JobDetails/Summary/RenameFiles'

const MediaContent = ({ id, className }) => {
	const [activeTab, setActiveTab] = useState(1)
	const [notes, setNotes] = useState('')
	const [images, setImages] = useState([])
	const [files, setFiles] = useState([])
	const [showRenameBox, setShowRenameBox] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const items = [
		{ id: 1, title: 'Notes', icon: <FileIcon className="mr-1" /> },
		{ id: 2, title: 'Photos', icon: <GalleryIcon className="mr-1" /> },
	]

	const getMediaContent = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await clientBaseURL.get(`${clientEndPoints?.getJobContent}/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response?.status >= 200 && response?.status < 300) {
				setShowRenameBox(true)
				setFiles(response?.data?.job?.images)
				setNotes(response?.data?.job?.notes)
			}
		} catch (error) {
			if (error?.response) {
			}
		}
	}

	useEffect(() => {
		if (id) {
			getMediaContent()
		}
	}, [id])

	// Function to refresh data after a file name change
	const refreshData = () => {
		getMediaContent()
	}
	///////////
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setIsSubmitting(true)
			const token = localStorage.getItem('token')

			// Create FormData to append both notes and images
			const formData = new FormData()
			formData.append('notes', notes)

			images.forEach((file) => {
				formData.append('images[]', file.file)
			})

			// Send combined data in a single API call
			const response = await clientBaseURL.post(`${clientEndPoints?.updateJobContent}/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})

			// Handle response and success
			if (response?.status >= 200 && response?.status < 300) {
				setImages([]) // Clear images
				toast.success('Media uploaded successfully.')
				await getMediaContent() // Fetch latest files after successful upload
				setShowRenameBox(true) // Show rename box after fetching files
			}
		} catch (error) {
			if (error?.response) {
				toast.error(error?.response?.data?.error || error?.response?.data?.message)
			}
		} finally {
			setIsSubmitting(false)
		}
	}
	const renderActiveTab = () => {
		switch (activeTab) {
			case 1:
				return <Ckeditor value={notes} onChange={setNotes} />
			case 2:
				return (
					<FileUploader
						icon={<ImageIcon />}
						fileTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
						text="Drop your image here, or"
						files={images}
						setFiles={setImages}
						handleDelete={(index) => setImages(images.filter((_, i) => i !== index))}
					/>
				)
			default:
				break
		}
	}

	return (
		<Fragment>
			<Form onSubmit={handleSubmit} className={`${className} mb-5`}>
				<div className="flex items-center justify-between mb-4">
					<span className="font-semibold uppercase">Job Content</span>
				</div>
				<TabsContentBox className="p-4">
					<Tabs items={items} activeTab={activeTab} onClick={setActiveTab} />
					{renderActiveTab()}
				</TabsContentBox>
			</Form>
			{activeTab === 2 &&
				showRenameBox &&
				files?.map((file) => <RenameFiles file={file} key={file?.id} id={file?.id} refreshData={refreshData} />)}
			<div className="flex items-center justify-end mb-4 ">
				<Button variant="gradient" type="submit" className={`text-sm`} disabled={isSubmitting}>
					{isSubmitting ? (
						<div className="flex justify-center items-center">
							<Loader width={'24px'} height={'24px'} color="#fff" />
						</div>
					) : (
						'Submit'
					)}
				</Button>
			</div>
		</Fragment>
	)
}

export default MediaContent
