import React from 'react'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Loader from '../shared/Loader';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const hostKey = 'b96ac588830acbe1b46d42efe85845de';

  const handleAddTask = (task) => {
    setLoading(true);
    const {taskName,when} = task;
    const image = task.image[0];
    const formData = new FormData();
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${hostKey}`;
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(gotData => {
        if (gotData.success) {
          const addtask = {
            taskName,
            schedule:when,
            author: user?.email,
            image: gotData.data.url,
          };

          fetch('https://demotaskserver.vercel.app/addtask', {
            method:'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(addtask)
          })
          .then(res => res.json())
          .then(data => {
            if(data.acknowledged){
              setLoading(false);
              toast.success('Task Added Successfully');
              navigate('/mytask')
            }
          })
        }
      })
  };






return (
    <div className='bg-cover bg-center bg-no-repeat bg-[#11ec3288] bg-blend-overlay h-[80vh] flex justify-center items-center' style={{ backgroundImage: `url(https://www.singlecare.com/blog/wp-content/uploads/2020/05/Hematocrit-levels.png)` }}>
      <div className='py-10 mx-auto md:w-[400px] shadow-lg bg-[#f0e9e91f] px-6'>
        <h3 className='text-4xl font-bold text-[#19d3ae] text-center mb-8 uppercase'>Add Task</h3>
        <form onSubmit={handleSubmit(handleAddTask)} className='space-y-3'>

        <div>
            <label htmlFor="taskName" className='text-white font-medium  pl-2'>Task To Do</label>
            <input type="text" className="input input-bordered input-accent w-full bg-white"
              {...register('taskName', { required: true })}
            />
            {errors.taskName && <span className='text-red-600'>Task Must add.</span>}
          </div>

          <div>
            <label htmlFor="when" className='text-white font-medium  pl-2'>When to do?</label>
            <input type="text" className="input input-bordered input-accent w-full bg-white"
              {...register('when', { required: true })}
            />
            {errors.when && <span className='text-red-600'>Schedule Must add.</span>}
          </div>

          <div>
            <label htmlFor="image" className='text-white font-medium  pl-2'>UpLoad Image</label>
            <input type="file" className="input input-bordered input-accent w-full bg-white"
              {...register('image', { required: true })}
            />
            {errors.image && <span className='text-red-600'>Please upload an image</span>}
          </div>

          {
            loading? <Loader />
            :
            <div className='text-center'>
            <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-full mx-auto">Add Task</button>
          </div>
          }
        </form>
      </div>
    </div>
  )
}

export default AddTask