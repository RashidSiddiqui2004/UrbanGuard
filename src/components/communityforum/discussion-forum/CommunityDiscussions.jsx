
import React from 'react'
import DiscussionYard from './DiscussionYard'
import DiscussInput from './DiscussInput'

import { useContext } from 'react';
import myContext from '../../../context/data/myContext';
import { auth } from '../../../firebase/FirebaseConfig';


const CommunityDiscussions = () => {

    const context = useContext(myContext);
    const { threads } = context;

    return (


        <div>
            <div className='py-2 px-2 bg-inherit lg:bg-green-100'>
                <h2 className='text-2xl font-serif font-bold 
                text-center text-slate-300 lg:text-slate-800 mt-10 lg:mt-0'>Community Discussions</h2>
            </div>

            <div>
                {threads.map((thread, index) => {
                    const authorID = thread.authorId;

                    return (
                        <div key={index}>
                            {authorID === auth.currentUser.uid ? (
                                <DiscussionYard thread={thread} myPost={true}/>
                            ) : (
                                <DiscussionYard thread={thread} myPost={false}/>
                            )}
                        </div>
                    );
                })}

            </div>

            <div className='fixed lg:-bottom-3 w-[78%] mx-3'>
                <DiscussInput />
            </div>
        </div>
    )
}

export default CommunityDiscussions