import axios from 'axios';

export default async function sendChatGPTRequest(question: string) {
    const CHATGPT_API_KEY: string = process.env.REACT_APP_ChatGPT_API_KEY as string;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4",
                messages: [
                    { role: 'user', content: question }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${CHATGPT_API_KEY}`,
                },
            }
        )
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}