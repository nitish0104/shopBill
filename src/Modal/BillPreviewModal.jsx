import React from 'react'

const BillPreviewModal = ({showModal, setShowModal, billID}) => {
  return (
	<>
	{
		showModal && <div className='fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-30 z-[500]'></div>
	}
	{showModal && <section className='h-[90vh] w-[90vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-[1000]'>
		<div className='flex justify-end px-5 py-4'><button onClick={() => {setShowModal(false)}} className='ml-auto'>Close</button></div>
		<iframe className='w-full h-full' src={`http://localhost:3000/invoice/${billID}?show=false`} frameborder="0"></iframe>
	</section>}
	</>
  )
}

export default BillPreviewModal