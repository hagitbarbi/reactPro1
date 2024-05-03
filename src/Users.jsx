import { useEffect, useState } from 'react';
import { getAll, addUser } from './utils';
import UserComp from './User';
import NewUserComp from './NewUser';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export default function UsersComp() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    Email: '',
    id: '',
    address: { street: '', city: '', zipcode: '' },
  });

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await getAll(USERS_URL);
      setUsers(data);
    };

    getUsers();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };


  const handleAddUser = async () => {
    const { data } = await addUser(USERS_URL, newUser);
    setUsers([...users, data]);
    setShowAddUser(false);
    setNewUser({ name: '', Email: '', id: '', address: { street: '', city: '', zipcode: '' } });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ border: `1px solid grey`, borderRadius: '30px', padding: '10px' }}> 
      Search : <input  type='text' onChange={handleChange} value={search} />
        <button style={{ marginLeft: '3rem' }} onClick={() => setShowAddUser(true)}>
          Add
        </button>
        <br />
        <br />

        {filteredUsers.map((user) => (
          <UserComp key={user.id} user={user} />
        ))}
      </div>
      <div style={{ position: 'absolute', transform: 'translateX(400px) translateY(-2500px)', width: '350px' }}>
        {showAddUser && (
          <div>
            <h2> Add New User</h2>

            <NewUserComp setShowAddUser={setShowAddUser} newUser={newUser} setNewUser={setNewUser} handleAddUser={handleAddUser} />            
              
          </div>
        )}
      </div>
    </div>
  );
}
