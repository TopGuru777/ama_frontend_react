import React, { useContext, useState, KeyboardEvent } from 'react'
import Footer from '../components/Footer';
import AppContext from '../contexts/AppContext';
import LoadingScreen from './LoadingScreen'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function QA({ }) {
    const navigate = useNavigate();
    const [newQuestion, setNewQuestion] = useState("");
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const CHATGPT_API_KEY: string = process.env.REACT_APP_ChatGPT_API_KEY as string;
    const { question, answer, updateQuestion, updateAnswer } = useContext(AppContext);

    const handleKeyPress = (e: KeyboardEvent<any>) => {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault(); // Prevent form submission
            submitQuestion();
        } else if (e.key === 'Enter' && (e.ctrlKey || e.shiftKey)) {
            e.preventDefault();
            setNewQuestion((prevQuestion) => `${prevQuestion}\n`);
        }
    }

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
                        { role: 'user', content: newQuestion }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${CHATGPT_API_KEY}`,
                    },
                }
            )
            setShowLoadingScreen(false);
            updateQuestion(newQuestion);
            updateAnswer(response?.data?.choices[0]?.message?.content ?? "");
            setNewQuestion("");
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
                            <div className="w-full py-2 mt-10 px-5 rounded-[10px] border-[1px] border-[#CED4DA] bg-[#F5F0F0]">
                                <h1 className="text-2xl text-cyan-700 font-bold text-center leading-6">Your question</h1>
                                <p className='min-h-[2em]'>{question}</p>
                            </div>
                            <div className="w-full mt-5 py-2 px-5 rounded-[10px] border-[1px] border-[#CED4DA] bg-[#FFFFFF]">
                                <h1 className="text-2xl text-cyan-700 font-bold text-center leading-6">Our answer</h1>
                                <p className='min-h-[2em]'>{answer}</p>
                            </div>
                            <div className='w-full mt-5'>
                                <textarea className='min-h-[10em] mt-5 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' placeholder="Ask your question here" onChange={(e) => setNewQuestion(e.target.value)} onKeyDown={handleKeyPress} value={newQuestion}></textarea>
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