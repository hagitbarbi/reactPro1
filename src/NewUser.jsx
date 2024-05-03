import './index.css';

export default function NewUserComp({ setShowAddUser,newUser,setNewUser,handleAddUser }) {
 

  const newOne = (e) => {
    if (e.target.name === 'name') {
      setNewUser({ ...newUser, name: e.target.value });
    } else if (e.target.name === 'email') {
      setNewUser({ ...newUser, email: e.target.value });
    }
  };
  


  return (
    <div style={{border:"2px solid black", padding:"20px"}}>
  <br />
  Name: <input name="name" type='text' onChange={newOne}/>
  <br/><br />
  Email: <input name="email" type='text' onChange={newOne}/>
  <br /><br />
 
  <button onClick={handleAddUser}>Add</button>
  <button style={{ marginLeft: '1rem' }} onClick={() => setShowAddUser(false)}>Cancel</button>
</div>

  );
};
