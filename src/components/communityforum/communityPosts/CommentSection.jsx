
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import Comment from './Comment';
import myContext from '../../../context/data/myContext';

function CommentSection({ postId }) {

    const context = useContext(myContext);
    const { getCommentsForPost } = context;

    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments() {
            const cmts = await getCommentsForPost(postId);
            setComments(cmts);
        }

        fetchComments();
    }, []); 

    return (
        <div className="my-6 mx-[2%]">
            <h2 className="text-2xl font-semibold text-slate-800 underline mb-4 text-center">Comments</h2>
            <div className="space-y-4">
                {comments.map((comment) => { 
                    return (
                        <div>
                            <Comment comment={comment} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default CommentSection;
