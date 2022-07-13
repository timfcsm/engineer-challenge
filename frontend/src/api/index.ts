export const fetchPolicies = async (search?: string) => {
    const response = await fetch(`${process.env.API_URL}/policies?search=${search || ''}`)
    const { status } = response
    if (status >= 200 && status < 400) {
        return response.json()
    }
    throw new Error('request error')
}
