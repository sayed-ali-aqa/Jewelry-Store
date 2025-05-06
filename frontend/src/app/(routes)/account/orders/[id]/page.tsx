import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params; // Awaiting params here

    return (
        <div>{id}</div>
    )
}

export default page