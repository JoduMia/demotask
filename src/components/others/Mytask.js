import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useContext } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider'
import Loader from '../shared/Loader';

const Mytask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: tasks, isLoading, isError, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => fetch(`http://localhost:4000/tasks?email=${user.email}`)
            .then(res => res.json())
    })


      const update = (id, refetch) => {
          fetch(`http://localhost:4000/update/${id}`, {
            method: 'PATCH'
          })
            .then(res => res.json())
            .then(data => {
              if (data.modifiedCount > 0) {
                  refetch();
                  navigate('/completedtasks')
                toast.success('Successfully Completed');
              }
            })
      };


    if (isLoading) return <Loader />
    if (isError) return (
        <div className='flex items-center justify-center h-[80vh]'>
            <h1 className='text-3xl font-semibold text-red-600'>Something Wrong happended</h1>
        </div>
    )

    if(!tasks.length) return (
        <div className='flex items-center justify-center h-[80vh]'>
            <h1 className='text-3xl font-semibold text-green-600'>You have no task to do !!!</h1>
        </div>
    )

    return (

        <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th scope="col" class="py-3 px-6">
                            Media
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Task name
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Schedule
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Status
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Update
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tasks.map(tas => {
                            const { _id, task, schedule, status, image } = tas;


                            return (
                                <tr key={_id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td class="py-4 px-6">
                                    <img class="w-10 h-10 rounded-full" src={image} alt='imagee' />
                                    </td>

                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {task}
                                    </th>
                                    <td class="py-4 px-6">
                                        {schedule}
                                    </td>
                                    <td class="py-4 px-6">
                                        {status}
                                    </td>
                                    <td class="py-4 px-6">
                                    <button onClick={()=>update(_id,refetch)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Complete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>

    )
}

export default Mytask