
import React from 'react'; 
import RenderHTMLContent from '../../../utils/RenderHTMLContent';

const PostPreview = ({ posts }) => {

  const { title, author, location, category, imageUrl, description, tagList } = posts;

  return (
    <div className="bg-slate-200 rounded-lg p-6 shadow-md max-w-2xl mx-auto mt-8 overflow-y-hidden w-[100%]">
      {/* Post Title */}
      <h2 className="text-2xl font-bold mb-4 text-slate-600 merriweather">{title}</h2>

      {/* Author and Upvotes */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8">
            <img src="/user.jpg" alt="user Avatar" className='rounded-full' />
          </div>
          <span className="text-gray-700 font-semibold">{author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-slate-8900 bg-blue-500 hover:underline">Follow</button>
          <button className="bg-red-400 text-white hover:underline">Flag</button>
        </div>
      </div>

      {/* Tags and Category */}
      <div className="lg:flex items-center mb-4">
        <div className="mb-4 mt-5 lg:mt-2">
          <span className="text-gray-700 font-semibold font-serif">Location:</span>
          <span className="text-blue-500 font-bold font-serif ml-2">{location}</span>
        </div>
        <div className="ml-auto mt-5 lg:mt-2">
          <span className="bg-blue-500 text-slate-800 px-5 py-2 rounded-xl">{category}</span>
        </div>
      </div>

      {/* Media (Image or Video) */}
      <div className="mb-4">
        <img src={imageUrl} alt="Post Media" className="w-full text-slate-950 italic h-auto object-cover rounded-md shadow-md" />
      </div>

      {/* Post Description */}
      {description && (
        <p className="text-gray-800 leading-relaxed mb-4">
          <RenderHTMLContent htmlContent={description} />
        </p>
      )}
 
      <div className="items-center text-lg">
        {tagList?.map((item, index) => (
          <p className="text-blue-500" key={index}>#{item}</p>
        ))}
      </div>

      <div className="flex flex-row items-center my-4 w-full"></div>
    </div>
  );
};

export default PostPreview;
