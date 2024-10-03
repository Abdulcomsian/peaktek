import toast from "react-hot-toast";

export async function createReadyToBuild(data, jobId) {
  try {
    const response = await clientBaseURL.post(
      `${clientEndPoints?.createReadyToBuild}/${jobId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.status >= 200 && response?.status < 300) {
      toast.success(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getReadyToBuild(jobId) {
  try {
    const response = await clientBaseURL.get(
      `${clientEndPoints?.getReadyToBuild}/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.status >= 200 && response?.status < 300) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error) {
    return error;
  }
}
