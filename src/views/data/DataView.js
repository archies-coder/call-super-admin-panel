import React, { useContext, useEffect, useState } from 'react'
import { AlignRight, MoreVertical } from 'react-feather'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardHeader from 'reactstrap/lib/CardHeader'
import CardTitle from 'reactstrap/lib/CardTitle'
import Col from 'reactstrap/lib/Col'
import Container from 'reactstrap/lib/Container'
import Media from 'reactstrap/lib/Media'
import Row from 'reactstrap/lib/Row'
import { ThemeColors } from '../../../utility/context/ThemeColors'
import Chart from 'react-apexcharts'
import AdvanceListItem from '../../ui/AdvanceListItem'
import * as Icon from 'react-feather'
import InputGroup from 'reactstrap/lib/InputGroup'
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon'
import InputGroupText from 'reactstrap/lib/InputGroupText'
import Input from 'reactstrap/lib/Input'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartmentData, getDepartments, setSelectedDepartment } from '../../../redux/actions/data'
import { successToast } from '../../ui/toasts'
import useSearchFilter from '../../../utility/hooks/useSearchFilter'

export default function DataView() {

    const [deptData, setDeptData] = useState([])
    const [data1, setData1] = useState([])

    const [filteredDepts, filterDepartment] = useSearchFilter(deptData)
    const [filteredData, filterData] = useSearchFilter(data1)

    const dispatch = useDispatch()

    const { dataByDepartments: data, selectedDepartment, departments: departmentList } = useSelector(state => state.data)

    const fetchDepartmentData = (deptId) => {
        dispatch(setSelectedDepartment(deptId))
        dispatch(getDepartmentData(deptId))
    }

    const renderTasks = () => {

        return filteredData && filteredData.length > 0 && filteredData.map(f => f && <AdvanceListItem task={f} />)
    }
    const renderTasks1 = () => {

        return filteredDepts && filteredDepts.length > 0 && filteredDepts.map(d => d && <AdvanceListItem task={d} clickHandler={fetchDepartmentData} />)
    }

    useEffect(() => {
        let filtered
        if (departmentList && departmentList.length > 0) {
            filtered = departmentList.map(d => ({ title: d, id: d }))
        }
        setDeptData(filtered)
    }, [departmentList])

    useEffect(() => {
        let filtered
        if (data[selectedDepartment] && data[selectedDepartment].length > 0) {
            filtered = data[selectedDepartment].map(d => ({ title: d.name }))
        }
        setData1(filtered)
    }, [selectedDepartment])

    useEffect(() => {
        dispatch(getDepartments())
    }, [dispatch])


    return (
        <Container>
            <Row>
                <Col md="6">
                    <Card className='card-employee-task'>
                        <CardHeader>
                            <CardTitle tag='h4'>Data Category</CardTitle>
                        </CardHeader>
                        <Row className="ml-auto">
                            <Col>
                                <InputGroup size="sm" className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Icon.Search size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder='search...' onChange={(e) => filterDepartment(e.target.value)} />
                                </InputGroup>
                            </Col>
                            <Col>
                                <AlignRight size={18} className='cursor-pointer' />
                            </Col>
                        </Row>
                        {/* <AlignRight size={18} className='cursor-pointer ml-auto mr-2' /> */}
                        <CardBody>{renderTasks1()}</CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card className='card-employee-task'>
                        <CardHeader>
                            <CardTitle tag='h4'>Data Category</CardTitle>
                        </CardHeader>
                        <Row className="ml-auto">
                            <Col>
                                <InputGroup size="sm" className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Icon.Search size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder='search...' onChange={(e) => filterData(e.target.value)} />
                                </InputGroup>
                            </Col>
                            <Col>
                                <AlignRight size={18} className='cursor-pointer' />
                            </Col>
                        </Row>
                        <CardBody>{renderTasks()}</CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
