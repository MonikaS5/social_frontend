//EditPost.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare } from 'react-bootstrap-icons';

const EditPost = () => {
	const [posts, setPosts] = useState([]);
	const [selectedPost, setSelectedPost] = useState(null);

	//handle for fetching posts on page load
	useEffect(() => {
		axios.get('https://social-b044.onrender.com/api/posts', {headers:{'Cache-control':'no-cache'}}).then((response) => {
			setPosts(response.data);
		});
	}, []);


	//handle for setting post to be deleted 
	const handleEdit = (post) => {
		setSelectedPost(post);
	};

	//handle for updating post
	const handleUpdate = (updatedPost) => {
		axios
			.put(`https://social-b044.onrender.com/api/posts/${updatedPost._id}`, updatedPost)
			.then(() => {
				axios.get('https://social-b044.onrender.com/api/posts').then((response) => {
					setPosts(response.data);
					setSelectedPost(null);
				});
			})
			.catch((error) => {
				console.error('Error updating post: ', error);
			});
	};

	return (
		<div className='container container-fluid min-vh-100 justify-content-center'>
			<h1 className=' text-center text-title mb-3 mt-2'> Edit Post </h1>

			{selectedPost && (
				<div>
					<h4 className='text-primary mb-3'>Edit Post :</h4>
					<form onSubmit={() => handleUpdate(selectedPost)}>
						<div className ="form-group">
							<label className='fw-bold mb-2'>Title:</label>
							<input
								type="text"
								className="form-control"
								name="title"
								value={selectedPost.title}
								onChange={(e) =>
									setSelectedPost({
										...selectedPost,
										title: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-group">
							<label className='fw-bold mb-2'> Content:</label>
							<textarea

								className="form-control"
								name="content" rows="3"
								value={selectedPost.content}
								onChange={(e) =>
									setSelectedPost({
										...selectedPost,
										content: e.target.value,
									})
								}

							></textarea>

						</div>

						<div>
							<button type="submit" className="btn btn-primary m-2">
								Update post
							</button>
						</div>
					</form>
				</div>
			)}
			<ul>
				{posts.map((post) => (
					<div className='container border border-dark rounded m-2 p-2 text-right' key={post._id}>
						<h5>Title : </h5>
						<h6 className='fst-italic mb-3'> {post.title}</h6>
						<h5>Content :  </h5>
						<p>{post.content}</p>

						<button
							type="button" className="btn"
							onClick={() => handleEdit(post)}
						>
							<h5>< PencilSquare /></h5>
						</button>
					</div>
				))}
			</ul>
		</div>
	);
};

export default EditPost;






