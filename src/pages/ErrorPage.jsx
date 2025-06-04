function ErrorPage() {
    return (
        <div>
            <div className="min-h-screen bg-[#FFEBC8] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
                    <p className="text-lg mb-6">We couldn't find the page you were looking for.</p>
                    <a href="/home" className="text-blue-500 hover:underline">Go back to Home</a>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;