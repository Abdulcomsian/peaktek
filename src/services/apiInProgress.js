import toast from 'react-hot-toast'
import { clientBaseURL, clientEndPoints } from './config'

export async function createQCInspection(data, jobId) {
	const token = localStorage.getItem('token')

	try {
		const response = await clientBaseURL.post(`${clientEndPoints?.storeInProgress}/${jobId}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		if (response?.status >= 200 && response?.status < 300) {
			toast.success(response?.data?.message)
			return response.data
		}
	} catch (error) {
		return error
	}
}
export async function updateIPstatus(data, jobId) {
	const token = localStorage.getItem('token')

	try {
		const response = await clientBaseURL.post(`${clientEndPoints?.updatestatusInProgress}/${jobId}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		if (response?.status >= 200 && response?.status < 300) {
			toast.success(response?.data?.message)
			return response.data
		}
	} catch (error) {
		return error
	}
}
export async function getQCInspection(jobId) {
	const token = localStorage.getItem('token')

	try {
		const response = await clientBaseURL.get(`${clientEndPoints?.getInProgress}/${jobId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response?.status >= 200 && response?.status < 300) {
			return response.data
		}
	} catch (error) {
		return error
	}
}
