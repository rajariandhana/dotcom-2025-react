export default function Hero(){
    return (
        <div className="w-full">
            <div className="flex">
                <img src="src/assets/ProfilePicture.jpg" alt=""
                className="size-32 rounded-full object-cover" />
            </div>
            <h1 className="font-mono font-bold">
                🌎
                <span className="text-indigo-rose">
                    Hello, world!
                </span>
            </h1>
            <p className="text-justify">
            You'll find several of my best works such as my projects as a developer, my interest in photography, and anything else since this is my website and I can do anything I want here.
            </p>
            <span className="text-sm text-gray-600">
                Feel free to hit me up in any of my social media
            </span>
        </div>
    )
}