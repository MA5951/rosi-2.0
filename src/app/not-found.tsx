export default function NotFound() {
  return <div>
        <section className="flex min-h-screen flex-col items-center justify-between bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto" style={{marginTop: "25vh"}}>
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
                    <a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded bg-red-600 text-gray-50">Back to homepage</a>
                </div>
            </div>
        </section>
    </div>
}