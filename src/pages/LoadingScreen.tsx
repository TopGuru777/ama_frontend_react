import React from 'react'
import Spinner from '../components/Spinner'
import Footer from '../components/Footer'
import { MoonLoader } from 'react-spinners';

type Props = {}

function LoadingScreen({ }: Props) {
    return (
        <>
            <div className="container mx-auto px-6 pb-3 bg-cyan-50 min-w-[380px] max-w-[800px] h-screen">
                <div className="columns-1">
                    <div className="w-full py-2 my-10">
                        <h1 className="text-2xl text-cyan-700 font-bold text-center leading-6">Preparing your answer</h1>
                    </div>
                    <div className='w-full flex justify-center'>
                        <MoonLoader color="#36d7b7" loading={true} size={120} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LoadingScreen