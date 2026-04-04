import status from '../../../models/status'

async function getHandler(request, response) {
  try {
    const statusData = await status.getStatus()
    return response.status(200).json(statusData)
  } catch (error) {
    console.error('Error in Status API:', error.message)
    return response.status(500).json({ error: 'Internal Server Error' })
  }
}

export default function handler(request, response) {
  if (request.method === 'GET') {
    return getHandler(request, response)
  }

  return response.status(405).end()
}
