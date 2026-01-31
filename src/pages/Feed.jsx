import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';


const Feed = () => {
    const { feeds, addFeed, likeFeed, user } = useStore();
    const [newPost, setNewPost] = useState('');

    const handlePost = () => {
        if (!newPost.trim()) return;

        const post = {
            id: Date.now(),
            user: user.name,
            avatar: user.avatar,
            time: "Just now",
            content: newPost,
            likes: 0,
            comments: 0
        };

        addFeed(post);
        setNewPost('');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 px-0 md:px-4 lg:px-0">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 md:mb-6">Activity Feed</h2>

            {/* New Post Input */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex gap-3 md:gap-4">
                <img src={user.avatar} alt="Me" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                    <input
                        type="text"
                        placeholder="What's happening?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handlePost()}
                        className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-100 dark:text-white"
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={handlePost}
                            disabled={!newPost.trim()}
                            className="px-4 py-1.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts */}
            {feeds.map(post => (
                <div key={post.id} className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <img src={post.avatar} alt={post.user} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{post.user}</h4>
                                <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{post.time}</span>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreHorizontal size={18} md={20} /></button>
                    </div>

                    <p className="text-gray-800 dark:text-gray-200 text-sm mb-4 leading-relaxed">{post.content}</p>

                    {post.image && (
                        <div className="mb-4 rounded-xl overflow-hidden h-48 sm:h-64 w-full">
                            <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {post.items && (
                        <div className="flex gap-2 mb-4">
                            {post.items.map((img, i) => (
                                <div key={i} className="rounded-xl overflow-hidden h-32 sm:h-40 flex-1">
                                    <img src={img} alt="Item" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-4 md:gap-6 pt-4 border-t border-gray-50 dark:border-gray-800">
                        <button
                            onClick={() => likeFeed(post.id)}
                            className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs md:text-sm hover:text-red-500 transition-colors"
                        >
                            <Heart size={16} md={18} className={post.likes > 245 ? "fill-red-500 text-red-500" : ""} /> <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs md:text-sm hover:text-brand-600 transition-colors">
                            <MessageCircle size={16} md={18} /> <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs md:text-sm hover:text-gray-900 dark:hover:text-white transition-colors ml-auto">
                            <Share2 size={16} md={18} /> <span className="hidden xs:inline">Share</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Feed;
