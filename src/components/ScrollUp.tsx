import {ArrowUp } from "lucide-react";


const Scroll = () => {
    return (
        <>
        
        <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-gray-700 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
        </>
    )
}

export default Scroll