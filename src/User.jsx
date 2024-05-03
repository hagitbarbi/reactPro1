import { updateUser, deleteUser } from './utils';
import { useState } from 'react'
import './index.css'
import PostsComp from './Posts';
import UserTodoComp from './UserTodo';

export default function UserComp(props) {
   const [isRed, setIsRed] = useState(false)
   const [showMoreData, setShowMoreData] = useState(false);
   const [userData, setUserData] = useState({})
   const [showPosts, setShowPosts] = useState(false);
   

   const USERS_URL='https://jsonplaceholder.typicode.com/users';

   const handleMouseOver = () => {
    setShowMoreData(true);
 };

 const handleClick = () => {
    setShowMoreData(false);
 };

const togglePosts = () => {
  setShowPosts(prevState => !prevState);
};

const updateUserOne = async (e) => {
  e.preventDefault(); 
  const { data } = await updateUser(USERS_URL,props.user.id,userData);
  setUserData(data);
  console.log(data)
};

const deleteUserOne = async ()=>{
  const {data} =  await deleteUser(USERS_URL,props.user.id);
  setUserData(data);
  }
 
  return (
    <div>
     
     <div 
            style={{ border: `2px solid ${isRed ? "green" : "red"}`,backgroundColor:showPosts?'#fada9f':'white', padding: '10px', justifyContent: 'space-between' }}
            onMouseOver={handleMouseOver} 
            onClick={handleClick}>
          <form onSubmit={updateUserOne} >
          
          <label onClick={togglePosts} style={{ cursor: 'pointer' }}>ID: {props.user.id}</label><br />
            <label>Name:  <input onChange={(e) => setUserData({ ...userData, name: e.target.value })} type="text" defaultValue={props.user.name} /> </label> <br />
            <label>Email: <input onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="text" defaultValue={props.user.email} /> </label> <br /><br />
            
            <section style={{  width: '100px', backgroundColor: 'lightgrey' }}>Other Data</section> <br />
          
            {showMoreData && (
               <div style={{ border: `2px solid black`, backgroundColor: 'lightgrey', borderRadius: '10px',padding: '3px'}}>
                 Street : {props.user.address.street}  <br />
                 City : {props.user.address.city}  <br />
                 Zip Code : {props.user.address.zipcode}  <br />
               </div>  
            )}<br />

                <div>
                  
               <button style={{ marginRight: '5px' }}>Update</button> 
               <button onClick={deleteUserOne} >Delete</button>

               </div>
               </form>
      </div>
      <br />    
            
<div style={{position:'absolute',transform:'translateX(370px) translateY(-300px)', width:'350px' }}>  
 
   {showPosts &&  (
    <UserTodoComp setIsRed={setIsRed} setUserData={setUserData} ID={props.user.id} />  
  )}
   {showPosts &&  (
    <PostsComp  ID={props.user.id} setUserData={setUserData}/>  
  )}

</div> 
</div>
          
  );
}
