import React from 'react'
import Media from 'reactstrap/lib/Media'
import Avatar from '@components/avatar'
import Input from 'reactstrap/lib/Input'

export default function AdvanceListItem({ task, clickHandler, checkbox, checkedId, handleCheck, rightMenu, ...rest }) {
    return (
        <div
            {...rest}
            key={task.title}
            className='employee-task d-flex justify-content-between align-items-center'>
            {checkbox && <Input
                type="checkbox"
                className="custom-checkbox"
                id="checkbox-id"
                checked={task.id === checkedId}
                onChange={() => handleCheck(task.id)} />}
            <Media>
                <Avatar
                    imgClassName='rounded'
                    className='mr-75'
                    img={task.avatar || require('@src/assets/images/portrait/small/avatar-s-13.jpg').default}
                    imgHeight='42'
                    imgWidth='42' />
                <Media className='my-auto' body>

                    <h6 className='mb-0'>{task.title}</h6>
                    {/* <small>task.subtitle</small> */}
                </Media>
            </Media>
            <div className='d-flex align-items-center'>
                <small className='text-muted mr-75' onClick={() => {
                    if (clickHandler) {
                        clickHandler(task.id)
                    }
                }
                }>
                    {rightMenu ? rightMenu : <a>View Clients</a>}
                </small>
            </div>
        </div>
    )
}
