import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import axios from 'axios'
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilPaperPlane } from '@coreui/icons';

const AllDestinations = () => {
    const [destinations, setDestinations] = useState([])
    async function getDestinations() {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}destination`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data);
        setDestinations(res.data.destinations)
    }

    useEffect(() => {
        getDestinations()
    }, [])

    const columns = [
        {
            header: 'Id',
            accessorKey: 'id',
            size: 50,
        },
        {
            header: 'Destination',
            accessorKey: 'destination',
            size: 100,
        },
        {
            header: 'Latitude',
            accessorKey: 'latitude',
            size: 50,
        },
        {
            header: 'Longitude',
            accessorKey: 'longitude',
            size: 50,
        },
        // {
        //     header: 'Edit',
        //     accessorFn: (dataRow) => <Link to={`/vendor/trips/${dataRow.id}`} className="btn btn-primary"><CIcon icon={cilPaperPlane} /></Link>,
        //     size: 50
        // },

    ]

    const table = useMantineReactTable({
        columns,
        data: destinations,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableGlobalFilter: true,
        enableFullScreenToggle: false
    });

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-5 mb-5'>
                        <h1 className='text-center mb-4'>All Destinations</h1>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllDestinations