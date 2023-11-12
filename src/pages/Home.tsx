import React, { useState, useContext } from 'react'
import Example from '../components/Example'
import Footer from '../components/Footer'
import LoadingScreen from './LoadingScreen'
import { useNavigate } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import axios from 'axios';

type Props = {}

function Home({ }: Props) {
    const navigate = useNavigate();
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const CHATGPT_API_KEY: string = process.env.REACT_APP_ChatGPT_API_KEY as string;

    const [question, setQuestion] = useState("");
    const { updateQuestion, updateAnswer } = useContext(AppContext);

    const handleSubmit = () => {
        submitQuestion();
    }
    const submitQuestion = async () => {
        setShowLoadingScreen(true);
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-4",
                    messages: [
                        { role: "system", "content": "You: Hello" },
                        { role: 'user', content: question }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${CHATGPT_API_KEY}`,
                    },
                }
            )
            setShowLoadingScreen(false);
            // console.log(response);
            // console.log(response.data.choices[0]);
            updateQuestion(question);
            updateAnswer(response?.data?.choices[0]?.message?.content ?? "");
            navigate('/qa');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {showLoadingScreen && <LoadingScreen />}
            {!showLoadingScreen &&
                <>
                    <div className="container mx-auto px-6 pb-3 bg-cyan-50 min-w-[380px] max-w-[800px] h-screen">
                        <div className="columns-1">
                            <div className="w-full py-2 my-10">
                                <h1 className="text-2xl text-cyan-700 font-bold text-center leading-6">Ask Me Anything</h1>
                            </div>
                            <div className="w-full">
                                <Example title="Worker example" content="I have been employed for 10 years, but have been on unpaid parental leave for 6 months during that time. I am now resigning and want to know if I am entitled to a Long Service Leave Benefit." />
                                <Example title="Worker example" content="I am a construction worker in Australia. My employer is registered with the LeavePlus and has been paying the Long Service Leave Charge on my behalf. However, I have recently been made redundant. I am not sure if I am entitled to Long Service Leave and, if so, how much I am entitled to?" />
                            </div>
                            <div className='w-full mt-5'>
                                <textarea className='min-h-[10em] mt-5 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' placeholder="Ask your question here" onChange={(e) => setQuestion(e.target.value)} value={question}></textarea>
                                <button className='mt-5 bg-cyan-300 w-full text-white p-3' onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default Home
