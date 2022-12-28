import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BiSun } from 'react-icons/bi';
import { MdDarkMode } from 'react-icons/md';
import { AiOutlineLogin } from 'react-icons/ai';
import { AuthContext } from '../../Contexts/AuthProvider';


const navItems = [
  { id: 1, title: 'Add Task', route: 'addtask' },
  { id: 2, title: 'My task', route: 'mytask' },
  { id: 3, title: 'Completed Task', route: 'completedtasks' },
]

const Header = () => {
  const [mode,setMode] = useState('light');
  const [change, setChange] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleMode = () => {
    mode === 'dark' ? setMode('light') : setMode('dark');
    setChange(!change)
  };

  useEffect(() => {
    document.body.className = mode;
  },[mode])

  const logout = () => {
    logOut()
      .then(() => {
        console.log('user logged out');
      })
      .catch(error => { })
  };

  return (
    <div className='sticky top-0 z-50'>
      <Navbar
        fluid={true}
        rounded={true}
        className='shadow-2xl dark:!bg-[#020835] !bg-gray-50 border-b dark:border-[#fff]'
      >
        <Link to='/' className='flex items-center'>
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-black">
            Scheduler
          </span>
        </Link>
        <div className="flex md:order-2">
          <div className='flex items-center bg-blue-500 rounded-full justify-center text-xl p-2 mr-2 text-black dark:text-white' onClick={toggleMode}>{change? <BiSun/> : <MdDarkMode/> }</div>
          {
            user ?
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={<Avatar title={user?.displayName} alt="userImage" img={user.photoURL ? user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ9CpA4I6pOTcI6CNL9vo0T_hUU_xreMcfA2ZTUmH4NuQ0TmwlqquuJdE88LbOBR3zQyE&usqp=CAU'} rounded={true} />}
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    {user?.displayName}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Button onClick={logout}>Logout</Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={'/update'}>Update profile</Link>
                </Dropdown.Item>
              </Dropdown> :
              <div className='flex items-center justify-center text-xl font-bold text-black dark:text-white'>
                <NavLink to={'/login'}>Login <AiOutlineLogin className='inline'/></NavLink>
              </div>
          }
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {
            navItems.map(({ id, title, route }) => (
              <NavLink style={({isActive}) => {return {color: isActive? 'red' : ''}}} key={id} to={route} className='block text-lg py-2 pr-4 pl-3 md:p-0   text-black hover:bg-gray-500
            text-center  dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:!text-blue-700 md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white duration-300'>{title}</NavLink>
            ))
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header