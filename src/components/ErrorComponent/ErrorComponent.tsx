import { Link } from "react-router-dom"

function ErrorComponent() {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="text-center">
                <h1 className=" text-3xl font-medium mb-5">No page Found</h1>
                <Link to="/" className="px-3 py-2 mt-5 text-white bg-black">Go Back</Link>
            </div>
        </div>
    )
}

export default ErrorComponent