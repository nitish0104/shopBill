import React from 'react'
import logo from '../logo.svg';

const Home = () => {
	//  Template Code
	return (
		<>
			<div className='relative bg z-0' >
				<section className='flex-col Nunito relative z-10 h-screen w-screen overflow-hidden flex items-center justify-center'>
					<h1 className='text-4xl text-white font-bold -mt-20 mb-20 w-[50vw] text-center'>A complete boilerplate for your next tailwind and React project!</h1>
					<div className='flex'>
						<div className='w-[30vw] items-center justify-center flex flex-col'>
							<img src={logo} className="h-[20vh]" alt="" />
							<h2 className='text-2xl font-bold text-white text-center'>ReactJs</h2>
						</div>
						<div className='w-[30vw] items-center justify-center flex flex-col'>
							<img className="h-[20vh]" src="https://camo.githubusercontent.com/bcd4bda49ef6cd9537db065920f4f4f6ac670eae0e0adf2c5133c19b319f1574/68747470733a2f2f627261646c632e67616c6c65727963646e2e76736173736574732e696f2f657874656e73696f6e732f627261646c632f7673636f64652d7461696c77696e646373732f302e322e302f313535383034303536333634392f4d6963726f736f66742e56697375616c53747564696f2e53657276696365732e49636f6e732e44656661756c74" alt="" />
							<h2 className='text-2xl font-bold text-white text-center'>TailwindCSS</h2>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

export default Home
