import React, { useEffect, useState } from 'react'
import * as Icon from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import { fetchAllDataCategories, openAddDataCategoryForm } from '../../redux/actions/assign'
import useSearchFilter from '../../utility/hooks/useSearchFilter'
import AdvanceListItem from '../ui/AdvanceListItem'


export default function DataCategoryList() {

    const [data, setData] = useState([])

    const { dataCategories, addDataCategoryFormVisible } = useSelector(state => state.assign)
    const [filteredData, filter] = useSearchFilter(data)

    const dispatch = useDispatch()

    const renderTasks = () => {
        return filteredData && filteredData.length > 0 && filteredData.map(d => d && <AdvanceListItem
            // checkbox={true}
            // checkedId={selectedCallingAgent}
            // handleCheck={id => dispatch(setSelectedCallingAgent(id))}
            task={d} />)
    }

    useEffect(() => {
        const temp = dataCategories.map(c => ({
            ...c,
            id: c._id,
            title: c.dataCategory
        }))
        setData(temp)
    }, [dataCategories])

    useEffect(() => {
        dispatch(fetchAllDataCategories())
    }, [dispatch])

    return (
        <Card className='card-employee-task h-75' style={{ overflowY: 'scroll' }}>
            <CardHeader>
                <CardTitle tag='h4'>Data Category List</CardTitle>
            </CardHeader>
            <Row className="ml-auto mr-0">
                <Col md="8">
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
                    {!addDataCategoryFormVisible && <Icon.PlusCircle
                        onClick={() => dispatch(openAddDataCategoryForm())}
                        size={18}
                        className='cursor-pointer' />}
                </Col>
                <Col md="2">
                    <Icon.AlignRight size={18} className='cursor-pointer' />
                </Col>
            </Row>
            <CardBody>
                <Row>
                    <Col md="12">
                        {renderTasks()}
                    </Col>
                    {/* <Col md="12" className="ml-auto mt-2">
                        <Button.Ripple color="primary" onClick={() => setModalOpen(true)}>Assign to Group</Button.Ripple>
                    </Col> */}
                </Row>
            </CardBody>
        </Card>
    )
}
