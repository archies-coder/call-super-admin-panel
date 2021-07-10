import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import Row from 'reactstrap/lib/Row'
import * as Icon from 'react-feather'
import AdvanceListItem from '../../ui/AdvanceListItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllGroups } from '../../../redux/actions/assign'
import useSearchFilter from '../../../utility/hooks/useSearchFilter'

export default function GroupList() {

    const [data, setData] = useState([])

    const dispatch = useDispatch()

    const { groups } = useSelector(state => state.assign)

    const [filtered, filter] = useSearchFilter(data)

    // const groups = [
    //     {
    //         name: 'GROUP A',
    //         _id: 'dkdnsfnns'
    //     }, {
    //         name: 'GROUP B',
    //         _id: 'dkdnsfnns'
    //     }
    // ]

    const renderTasks = () => {
        return filtered && filtered.length > 0 && filtered.map(d => d && <AdvanceListItem task={d} />)
    }

    useEffect(() => {
        let filtered
        if (groups && groups.length > 0) {
            filtered = groups.map(d => ({ title: d, id: d }))
        }
        setData(filtered)
    }, [groups])

    useEffect(() => {
        dispatch(fetchAllGroups())
    }, [dispatch])

    return (
        <Card className='card-employee-task h-75' style={{ overflowY: 'scroll' }}>
            <CardHeader>
                <CardTitle tag='h4'>Group List</CardTitle>
            </CardHeader>
            <CardBody>
                <Row className="ml-auto mr-0">
                    <Col md="10">
                        <InputGroup size="sm" className='input-group-merge mb-2'>
                            <InputGroupAddon addonType='prepend'>
                                <InputGroupText>
                                    <Icon.Search size={14} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder='search...' onChange={(e) => filter(e.target.value)} />
                        </InputGroup>
                    </Col>
                    <Col md="2">
                        <Icon.AlignRight size={18} className='cursor-pointer' />
                    </Col>
                </Row>
                {renderTasks()}
            </CardBody>
        </Card>
    )
}
