// Home.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash } from 'react-bootstrap-icons';
function Home() {
	const [commentInput, setCommentInput] = useState("");

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get("https://social-b044.onrender.com/api/posts")
			.then((response) => setPosts(response.data))
			.catch((error) => console.error("Error fetching posts:", error));
	}, []);


	const handleLike = (postId) => {
		axios
			.post(`https://social-b044.onrender.com/api/posts/like/${postId}`)
			.then((response) => {
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts);
			})
			.catch((error) => console.error("Error liking post:", error));
	};
	const handleDislike = (postId) => {
		axios
			.post(`https://social-b044.onrender.com/api/posts/dislike/${postId}`)
			.then((response) => {
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts);
			})
			.catch((error) => console.error("Error liking post:", error));
	};

	const handleAddComment = (postId, commentText) => {
		axios
			.post(`https://social-b044.onrender.com/api/posts/comment/${postId}`, {
				text: commentText,
			})
			.then((response) => {
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts);
			})
			.catch((error) => console.error("Error adding comment:", error));
	};




	//handle for deleting post
	const handleDelete = (postId) => {
		axios
			.delete(`https://social-b044.onrender.com/api/posts/${postId}`)
			.then(() => {
				axios.get('https://social-b044.onrender.com/api/posts').then((response) => {
					setPosts(response.data);
				});
			})
			.catch((error) => {
				console.error('Error deleting Post: ', error);
			});
	};

	return (
		<div className="home">
			<h2 className="mb-3 text-title">Recent Posts</h2>
			{posts.map((post) => (
				<div key={post._id} className="post">
					<h3 >{post.title}</h3>
					<p>{post.content}</p>
					{post.file && (
						<div>
							{post.file.includes(".mp4") ? (
								<video width="360" height="280" controls>
									<source
										src={
											`https://social-b044.onrender.com/uploads/${post.file}`
										}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							    ) : (
								<img width="450" height="320"
									src={
										`https://social-b044.onrender.com/uploads/${post.file}`
									}
									alt="Post Media"
								/>
							)}
						</div>
					)}
					<div className="d-flex align-items-center gap-2 mt-3 ">
						<div >
							<p>Likes: {post.likes}
								<button className="like" onClick={() => handleLike(post._id)}><i className="bi bi-hand-thumbs-up-fill"></i></button>
							</p>
						</div>

						<div>
							<p>Dislikes: {post.dislikes}
								<button className="dislike" onClick={() => handleDislike(post._id)}><i class="bi bi-hand-thumbs-down-fill"></i></button>
							</p>
						</div>
						<div>

						<p>Comments: {post.comments.length}</p>
						</div>
					</div>
					<h6> Comments : </h6>
					
					
					<ul>
						{post.comments.map((comment, index) => (
							<li key={index}>{comment.text}</li>
						))}
					</ul>


					<input
						type="text"
						placeholder="Add a comment"
						className="comment-input"
						onChange={(e) => setCommentInput(e.target.value)}
					/>
					<button
						onClick={() => handleAddComment(post._id, commentInput)}
						className="comment-button"
					>
						Add Comment
					</button>

						
					
					
					<p className="d-flex justify-content-start align-items-center text-end mt-5">
						<h5> Do you want to delete this post? : </h5>
						<button class="btn btnTrash btn-outline-danger ms-3" onClick={() => handleDelete(post._id)} type="button"> 
							<h5 className="p-2">Delete Post < Trash /></h5></button>
					</p>

						
					
				</div>

			))}
		</div>
	);
}

export default Home;
