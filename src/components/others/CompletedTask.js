import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useContext } from 'react'
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider'
import Loader from '../shared/Loader';

const CompletedTask = () => {
    const { user } = useContext(AuthContext);

    const { data: tasks, isLoading, isError, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => fetch(`http://localhost:4000/completedtasks?email=${user.email}`)
            .then(res => res.json())
    })

    const handleDelete = (id, refetch) => {
        const agree = window.confirm(`Are you sure to delete?`);
        if (agree) {
          fetch(`http://localhost:4000/deletetask/${id}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(data => {
              if (data.deletedCount > 0) {
                toast.success('Successfully Deleted');
                refetch();
              }
            })
        }
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
                                    <button onClick={()=> handleDelete(_id,refetch)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
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

export default CompletedTask