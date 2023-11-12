import React, { createContext, useState, ReactNode } from "react";

// Define the type for our context state
type AppState = {
    question: string;
    answer: string;
    updateQuestion: (newQus: string) => void;
    updateAnswer: (newAns: string) => void;
};

const initialContext: AppState = {
    question: "",
    answer: "",
    updateQuestion: (newQus: string) => { },
    updateAnswer: (newAns: string) => { }
}
// Create the context object
const AppContext = createContext<AppState>(initialContext);

interface AppProviderProps {
    children: ReactNode;
}
// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    // Define the state variables
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    // Define functions to update the state
    const updateQuestion = (newQus: string) => {
        setQuestion(newQus);
    };

    const updateAnswer = (newAns: string) => {
        setAnswer(newAns);
    };

    // Provide the state and functions to the consuming components
    return (
        <AppContext.Provider
            value={{ question, answer, updateQuestion, updateAnswer }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
