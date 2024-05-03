import { getAll, addUser } from './utils';
import { useEffect, useState } from 'react';
import './index.css';

export default function PostsComp({ ID, setUserData }) {
  const [posts, setPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [Title, setTitle] = useState('');
  const [Body, setBody] = useState('');
  const [newPost, setNewPost] = useState({ userId: ID, id: '', title: '', body: '' });

  const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await getAll(POSTS_URL);
      const filteredPosts = data.filter(post => post.userId === ID);
      setPosts(filteredPosts);
    };
    fetchPosts();
  }, []);

  const addPost = async () => {
    const { data } = await addUser(POSTS_URL, newPost);
    setPosts([...posts, data]);
    setShowAddPost(false);
    setTitle('');
    setBody('');
    setUserData([...posts, newPost]);
  };

  const newTask = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'body') {
      setBody(value);
    }
    setNewPost({ ...newPost, [name]: value, id: 1 + posts.length });
  };

  return (
    <div>
      <h2>User Posts</h2>
      {!showAddPost && (
        <button style={{ marginLeft: '16rem', padding: '0.1em 0.5em' }} onClick={() => setShowAddPost(true)}>Add</button>
      )}

      {showAddPost ? (
        <div style={{ border: '2px solid black', alignItems: 'center' }}>
          <h3>New Post</h3>
          <div style={{ border: '1px solid black', alignItems: 'center' }}>
            <br />
            Title: <input type="text" name="title" value={Title} onChange={newTask} /> <br /> <br />
            Body: <input type="text" name="body" value={Body} onChange={newTask} /> <br /> <br />
            <button onClick={addPost}>Add</button>
            <button onClick={() => setShowAddPost(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={{ border: '2px solid black', alignItems: 'center' }}>
          {posts.map(post => (
            <div key={post.id} style={{ border: "1px solid purple", padding: "10px", margin: "10px" }}>
              <label>Title:<strong>{post.title}</strong></label> <br />
              <label>Body:{post.body}</label><br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
