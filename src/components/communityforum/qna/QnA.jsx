
import React from 'react'
import './qna.css'

const QnA = () => {

    function toggleAnswer(id) {
        const queryElem = document.getElementById(id);

        if (queryElem.classList.contains('hidden')) {
            queryElem.classList.remove('hidden');
        } else {
            queryElem.classList.add('hidden');
        }
    }

    return (
        <div className='py-4 mt-12 md:mt-2 text-wrap md:w-full'>
            <h1 className="text-lg md:text-4xl merriweather text-center">Frequently Asked Questions </h1>

            <p className='mt-2 mb-5 text-center text-sm lg:text-xl'>Welcome to our QnA page! Here, you'll find answers to some commonly asked questions about our platform.</p>

            <div className='text-slate-900 w-[80%] mx-[10%]'>
                <div className="question" onClick={() => toggleAnswer("q1")}>
                    1. What is UrbanGuard?</div>
                <div className="answer bg-slate-800" id="q1">UrbanGuard is a web application designed to enhance safety and communication in smart cities. It allows users to report incidents, discuss community topics, and stay informed about various social issues.</div>

                <div className="question" onClick={() => toggleAnswer("q2")}>
                    2. How can I use UrbanGuard?</div>
                <div className="answer hidden bg-slate-800" id="q2">To use UrbanGuard, you can sign up for an account. Once registered, you can report incidents, participate in community discussions, and explore safety-related features.</div>

                <div className="question" onClick={() => toggleAnswer("q3")}
                >3. Is UrbanGuard free to use?</div>
                <div className="answer hidden bg-slate-800" id="q3">Yes, UrbanGuard is a free-to-use platform. Users can access a variety of features without any charges.</div>

                <div className="question" onClick={() => toggleAnswer("q4")}>
                    4. What is the Community Forum?</div>
                <div className="answer hidden bg-slate-800" id="q4">The Community Forum is a space for users to engage in discussions, share posts, and interact with others. It covers a wide range of topics related to safety, smart cities, and community well-being.</div>
                <div className="question" onClick={() => toggleAnswer("q5")}>
                    5. How can I publish a post on the Community Forum?
                </div>
                <div className="answer hidden bg-slate-800" id="q5">To publish a post, go to the "Community Forum" section, click on "New Post," and provide the necessary details. Users can react to posts, comment on them, and follow other users for updates.</div>
            </div>

            <div>
                <div className="text-center mt-6">
                    <p className="text-sm mb-2">Contact us: contact@urbanguard.com</p>
                    <p className="text-xs">&copy; {new Date().getFullYear()} Urban Guard. All rights reserved.</p>
                </div>
            </div>

        </div>
    )
}

export default QnA