import {  HandMetal } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-zinc-900">
      <div className="max-w-md text-center space-y-6">
       
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16  bg-none flex items-center
             justify-center animate-bounce"
            >
              <HandMetal className="size-12 text-teal-800 " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-4xl font-black  text-teal-800 font-sans drop-shadow-lg ">Welcome to Link Up</h2>
        
      </div>
    </div>
  );
};

export default NoChatSelected;