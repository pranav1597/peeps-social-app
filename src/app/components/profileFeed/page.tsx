"use client"

import React from 'react'
import LeftSidebar from '../leftSidebar/page'
import UserMainFeed from '../userMainFeed/page'
import RightSidebar from '../rightSidebar/page'

export default function ProfileFeed() {
    return (
        <div className="grid grid-flow-col grid-cols-10  min-h-screen">
            <div className='col-span-2'>
                <LeftSidebar />
            </div>
            <div className='col-span-6'>
                <UserMainFeed />
            </div>
            <div className="col-span-2">
                <RightSidebar />
            </div>
        </div>
    )
}