"use client"


interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        
         px-2  
        sm:px-4 
        md:px-10 "
        >
            Anything
            {children}
        </div>
     );
}
 
export default Container;
