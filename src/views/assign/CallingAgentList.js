import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { fetchAllGroups, fetchAllIndividuals, showAddCallingAgentForm } from '../../redux/actions/assign'
import * as Icon from 'react-feather'
import AdvanceListItem from '../ui/AdvanceListItem'
import useSearchFilter from '../../utility/hooks/useSearchFilter'
import { getAllCallingAgents, setSelectedCallingAgent } from '../../redux/actions/callingAgents'
import Label from 'reactstrap/lib/Label'
import { doAssignClientToGroup } from '../../api/assign.api'
import { errorToast, successToast } from "../ui/toasts"

export default function CallingAgentList() {

    const [data, setData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedGroup, setSelctedGroup] = useState('')

    const dispatch = useDispatch()

    const { individuals, groups, addCallingAgentFormVisible } = useSelector(state => state.assign)
    const { callingAgents, selectedCallingAgent } = useSelector(state => state.callingAgents)

    const [filteredData, filter] = useSearchFilter(data)

    const addToGroup = async (e) => {
        e.preventDefault()
        try {
            const resp = await doAssignClientToGroup(selectedCallingAgent, selectedGroup)
            if (resp) {
                successToast('Successfully assigned')
            }
        } catch (error) {
            errorToast(error.message || 'Something went wrong')
        }
    }

    const renderTasks = () => {
        return filteredData && filteredData.length > 0 && filteredData.map(d => d && <AdvanceListItem
            checkbox={true}
            checkedId={selectedCallingAgent}
            handleCheck={id => dispatch(setSelectedCallingAgent(id))}
            task={d} />)
    }

    useEffect(() => {
        let filtered
        if (callingAgents && callingAgents.length > 0) {
            filtered = callingAgents.map(d => ({ title: d.name || d.mobileNo, id: d.mobileNo }))
        }
        setData(filtered)
    }, [callingAgents])

    useEffect(() => {
        dispatch(fetchAllIndividuals())
        dispatch(fetchAllGroups())
        dispatch(getAllCallingAgents())
    }, [dispatch])

    return (
        <Card className='card-employee-task mb-0 h-75' style={{ overflowY: 'scroll' }}>
            <CardHeader>
                <CardTitle tag='h4'>IndividualAgent /Calling Agent List</CardTitle>
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
                    {!addCallingAgentFormVisible && <Icon.PlusCircle
                        onClick={() => dispatch(showAddCallingAgentForm())}
                        size={18}
                        className='cursor-pointer' />}
                </Col>
                <Col md="2">
                    <Icon.AlignRight size={18} className='cursor-pointer' />
                </Col>
            </Row>
            {/* <AlignRight size={18} className='cursor-pointer ml-auto mr-2' /> */}
            <CardBody>
                <Row>
                    <Col md="12">
                        {renderTasks()}
                    </Col>
                    <Col md="12" className="ml-auto mt-2">
                        <Button.Ripple color="primary" onClick={() => setModalOpen(true)}>Assign to Group</Button.Ripple>
                    </Col>
                </Row>
            </CardBody>
            <Modal isOpen={modalOpen}
                toggle={() => setModalOpen(!modalOpen)}
                className='modal-dialog-centered'
                backdrop={true}>
                <ModalHeader>
                    Select Group
                </ModalHeader>
                <Form onSubmit={addToGroup}>
                    <ModalBody>
                        {groups && groups.length > 0 && groups.map(g => <Row>
                            <Col className="pl-5">
                                <FormGroup>
                                    <Input
                                        id="individual"
                                        type="radio"
                                        checked={selectedGroup === g}
                                        onChange={() => setSelctedGroup(g)} />
                                    <Label for="individual">{g}</Label>
                                </FormGroup>
                            </Col>
                        </Row>)}
                    </ModalBody>
                    <ModalFooter>
                        <Button.Ripple
                            className="btn-sm"
                            onClick={() => {
                                setModalOpen(false)
                                // setMode('individual')
                            }}
                            outline
                            color='secondary'
                            type='reset'>
                            Close
                        </Button.Ripple>
                        <Button.Ripple
                            className='ml-1 btn-sm'
                            color='primary'
                            type='submit'>
                            Assign
                        </Button.Ripple>
                    </ModalFooter>
                </Form>
            </Modal>
        </Card>
    )
}
