interface MainPromptProps {
    title: string;
    message: string;
    buttonText: string;
    onButtonClick?: () => void; // Make onButtonClick optional
}

export const MainPrompt = ({ 
    title, 
    message, 
    buttonText, 
    onButtonClick = () => {} // Default value for the prop
}: MainPromptProps) => {
    return (
        <div className='flex h-screen items-center justify-center bg-gray-100'>
        <div className='rounded bg-white p-8 shadow'>
            <h1 className='mb-4 text-2xl font-bold'>{title}</h1>
            <p className='text-gray-600'>{message}</p>
            <div className='mt-5 flex justify-center'>
            <button
                onClick={onButtonClick}
                className='rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600'
            >
                {buttonText}
            </button>
            </div>
        </div>
        </div>
    );
};