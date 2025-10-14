import React from 'react'

const HomeNumber = () => {
    const stats = [
        { num: '3', unit: 'M', text: 'Active users' },
        { num: '99', unit: '%', text: 'Customer satisfaction' },
        { num: '50', unit: '+', text: 'Courses' },
        { num: '240', unit: '%', text: 'Passing Rate' },
    ]

    const NumbCompo = ({ num, unit, text, isLast }) => {
        return (
            <div className='flex items-center'>
                <div className='flex flex-col items-center p-6'>
                    <div className='flex items-center gap-1 text-4xl font-extrabold'>
                        <span className='text-[var(--primary-color)]'>{num}</span>{unit}
                    </div>
                    <span className='mt-2 text-base text-[var(--primary-color)] font-bold'>{text}</span>
                </div>
                {!isLast && (
                    <div className='h-12 w-[2px] bg-[var(--primary-color)] mx-4'></div>
                )}
            </div>
        )
    }

    return (
        <div className='flex flex-wrap justify-around gap-4'>
            {stats.map((item, index) => (
                <NumbCompo key={index} {...item} isLast={index === stats.length - 1} />
            ))}
        </div>
    )
}

export default HomeNumber
