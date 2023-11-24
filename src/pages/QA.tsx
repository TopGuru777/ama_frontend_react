import React, { useContext, useState, KeyboardEvent } from 'react'
import Footer from '../components/Footer';
import AppContext from '../contexts/AppContext';
import LoadingScreen from './LoadingScreen'
import { useNavigate } from 'react-router-dom';
import sendChatGPTRequest from '../services/chatgpt';
import FusekiService from '../services/fuseki';
// @ts-ignore
import { Helmet } from 'react-helmet';


export default function QA({ }) {
    const [newQuestion, setNewQuestion] = useState("");
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
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
            // const sparql = FusekiService.generateSPARQLQuery(newQuestion);
            // console.log('____FUSEKI_____', sparql);

            // const fusekiResponse = await FusekiService.executeQuery(sparql);
            // console.log('-----fuseki response-----', fusekiResponse);

            // const response = await sendChatGPTRequest(newQuestion);
            const response = await FusekiService.getSPARQLResponse(newQuestion);

            // console.log(response);

            setShowLoadingScreen(false);
            if (Object.keys(response).indexOf("data") != -1) {
                updateAnswer(response.data);
            } else {
                updateAnswer("Failed to generate SPARQL query from that question. Please input single sentence. Ex: what is Long Service Leave Charge? Fetching ChatGPT-4 for further process.");
                setShowLoadingScreen(true);
                const gptResponse = await sendChatGPTRequest(newQuestion);
                setShowLoadingScreen(false);
                updateAnswer(`GPT Answered: \n ${gptResponse?.choices[0]?.message?.content ?? "Could not answer."}`);
            }

            updateQuestion(newQuestion);
            // updateAnswer(response?.choices[0]?.message?.content ?? "");
            setNewQuestion("");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Helmet><title>Ask Me Anything</title></Helmet>
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
                                <div className='min-h-[2em] max-h-[25em] overflow-y-scroll whitespace-pre-wrap'>{answer}</div>
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