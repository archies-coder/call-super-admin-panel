import React, { useEffect, useState } from 'react'
import * as Icon from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter } from 'reactstrap'
import FormGroup from 'reactstrap/lib/FormGroup'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import Row from 'reactstrap/lib/Row'
import { doAssignClient, doAssignClientToGroup, doAssignContactToCallingAgent, doAssignContactToDataCategory } from '../../api/assign.api'
import { fetchAllData, fetchAllGroups, fetchAllIndividuals, setUpdateDataInput, showAddDataForm, showUpdateDataForm } from '../../redux/actions/assign'
import { defaultUpdateInput } from '../../redux/reducers/assign'
import useSearchFilter from '../../utility/hooks/useSearchFilter'
import AdvanceListItem from '../ui/AdvanceListItem'
import { errorToast, successToast } from '../ui/toasts'
import DataCategoryList from './DataCategoryList'
// import AddCallingAgent from './AddCallingAgent'
// import AddDataForm from './AddDataForm'
// import CallingAgentList from './CallingAgentList'
// import GroupList from './GroupList'
// import UpdateDataForm from './UpdateDataForm'

export default function AssignView() {

    const [modalOpen, setModalOpen] = useState(false)
    const [groupModalOpen, setGroupModalOpen] = useState(false)
    const [mode, setMode] = useState('individual')
    const [selectedGroup, setSelectedGroup] = useState('')
    const [selectedContact, setSelectedContact] = useState('')
    const [selectedDataCategpry, setSelectedDataCategory] = useState('')

    const [filtered, setFiltered] = useState([])
    // const [searchFilter, setSearchFilter] = useState('')

    const dispatch = useDispatch()

    const {
        addDataFormVisible,
        addCallingAgentFormVisible,
        updateDataFormVisible,
        data,
        selectedClient,
        groups,
        dataCategories } = useSelector(state => state.assign)
    // const { callingAgents } = useSelector(state => state.callingAgents)

    const [filteredData, setSearchFilter] = useSearchFilter(filtered)

    const handleUpdateClient = (client) => {
        dispatch(setUpdateDataInput(defaultUpdateInput))
        dispatch(setUpdateDataInput(client))
        dispatch(showUpdateDataForm())
    }

    const renderTasks = () => {
        // if (data && data.length > 0) {
        //     filtered = data.map(d => ({
        //         name: d.name || '',
        //         company: d.company_name || '',
        //         assignTo: d.assign_to || '',
        //         mobile: d.mobileNo || '',
        //         email: d.email_id || '',
        //         title: d.name || '',
        //         stream: d.stream || '',
        //         location: d.location || '',
        //         id: d.mobileNo
        //     }))
        // }
        return filteredData && filteredData.length > 0 && filteredData.map(d => d && <AdvanceListItem
            checkbox={true}
            checkedId={selectedContact}
            handleCheck={(id) => setSelectedContact(id)}
            task={d}
            rightMenu={<span onClick={() => handleUpdateClient(d)}>Update</span>}
        />)
    }

    const assignClient = async (e) => {
        e.preventDefault()
        if (mode === 'group') {
            setModalOpen(false)
            setGroupModalOpen(true)
            return
        }
        if (selectedClient === '') {
            return
        }
        try {
            const { data } = await doAssignClient(selectedClient)
            dispatch(fetchAllIndividuals())
            setModalOpen(false)
        } catch (error) {
            console.log(error)
            setModalOpen(false)
        }
    }

    const assignContact = async (e) => {
        e.preventDefault()
        e.preventDefault()
        try {
            const selectedCategory = dataCategories.find(c => c._id === selectedDataCategpry).dataCategory
            const resp = await doAssignContactToDataCategory(selectedContact, selectedCategory)
            debugger
            if (resp) {
                successToast('Successfully assigned')
            }
        } catch (error) {
            errorToast(error.message || 'Something went wrong')
        }
        setModalOpen(false)
    }

    const handleGroupSubmit = async (e) => {
        e.preventDefault()
        if (selectedGroup === '') {
            return
        }
        try {
            const resp = await doAssignClientToGroup(selectedClient, selectedGroup)
            // dispatch(fetchAllIndividuals())
            successToast(resp.msg || 'Success')
            dispatch(fetchAllGroups())
            setModalOpen(false)
            setGroupModalOpen(false)
        } catch (error) {
            console.log(error)
            setModalOpen(false)
        }
    }

    useEffect(() => {
        if (data.length > 0) {
            const temp = data.map(d => ({
                name: d.name || '',
                company: d.company_name || '',
                assignTo: d.assign_to || '',
                mobile: d.mobileNo || '',
                email: d.email_id || '',
                title: d.name || '',
                stream: d.stream || '',
                location: d.location || '',
                id: d.mobileNo
            }))
            setFiltered(temp)
        }
    }, [data])

    // useEffect(() => {
    //     if (data.length > 0) {
    //         const temp = data.map(d => ({
    //             name: d.name || '',
    //             company: d.company_name || '',
    //             assignTo: d.assign_to || '',
    //             mobile: d.mobileNo || '',
    //             email: d.email_id || '',
    //             title: d.name || '',
    //             stream: d.stream || '',
    //             location: d.location || '',
    //             id: d.mobileNo
    //         }))
    //         if (searchFilter === '') {
    //             setFiltered(temp)
    //         }
    //         const x = filterByValue(temp, searchFilter)
    //         setFiltered(x)
    //     }
    // }, [searchFilter])

    useEffect(() => {
        dispatch(fetchAllData())
    }, [dispatch])

    return (
        <>
            <Row className="mt-0 pt-0">
                <Col md="6">
                    <Card className='card-employee-task'>
                        <CardHeader>
                            <CardTitle tag='h4'>Data List</CardTitle>
                        </CardHeader>
                        <Row className="ml-auto mr-0">
                            <Col md="8">
                                <InputGroup size="sm" className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Icon.Search size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder='search...'
                                        // value={searchFilter}
                                        onChange={(e) => setSearchFilter(e.target.value)} />
                                </InputGroup>
                            </Col>
                            <Col md="2">
                                {!addDataFormVisible && <Icon.PlusCircle
                                    onClick={() => dispatch(showAddDataForm())}
                                    size={18}
                                    className='cursor-pointer' />}
                            </Col>
                            <Col md="2">
                                <Icon.MoreVertical size={18} className='cursor-pointer' />
                            </Col>
                        </Row>
                        {/* <AlignRight size={18} className='cursor-pointer ml-auto mr-2' /> */}
                        <CardBody>
                            <Row>
                                <Col>
                                    {renderTasks()}
                                </Col>
                                <Col md="12" className="ml-auto mt-2">
                                    <Button.Ripple
                                        color="primary"
                                        onClick={() => setModalOpen(true)}>Add to Category</Button.Ripple>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    {addDataFormVisible ? <div> Add </div> : updateDataFormVisible ? <div>Update</div> : <><div>
                        {/* {addCallingAgentFormVisible ? <AddCallingAgent /> : <CallingAgentList />} */}
                        <DataCategoryList />
                    </div>
                        {/* <div style={{ marginTop: 10 }}> */}
                        {/* <GroupList /> */}
                        {/* </div> */}
                    </>}
                </Col>
            </Row>
            {/* <Row className="mt-2">
                <Col md="12" className="text-right">
                    <Button.Ripple color="primary" onClick={() => setModalOpen(true)}> ASSIGN </Button.Ripple>
                </Col>
            </Row> */}
            <Modal
                isOpen={modalOpen}
                toggle={() => setModalOpen(!modalOpen)}
                className='modal-dialog-centered'
                backdrop={true}>
                <ModalHeader>
                    Select Agent
                </ModalHeader>
                <Form onSubmit={assignContact}>
                    <ModalBody>
                        {dataCategories?.length > 0 && dataCategories.map(c => <Row className="px-2">
                            <Col>
                                <FormGroup>
                                    <Input
                                        id={`dataCategory-${c.dataCategory}`}
                                        type="radio"
                                        checked={selectedDataCategpry === c._id}
                                        onChange={() => setSelectedDataCategory(c._id)} />
                                    <Label for="individual">{c.dataCategory}</Label>
                                </FormGroup>
                            </Col>
                        </Row>)}
                        {/*<Row className="px-2">*/}
                        {/*    <Col>*/}
                        {/*        <FormGroup>*/}
                        {/*            <Input*/}
                        {/*                id="individual"*/}
                        {/*                type="radio"*/}
                        {/*                checked={selectedAgent === }*/}
                        {/*                onChange={() => setMode('individual')} />*/}
                        {/*            <Label for="individual">Individual</Label>*/}
                        {/*        </FormGroup>*/}
                        {/*    </Col>*/}
                        {/*    <Col>*/}
                        {/*        <FormGroup>*/}
                        {/*            <Input*/}
                        {/*                id="group"*/}
                        {/*                type="radio"*/}
                        {/*                checked={mode === 'group'}*/}
                        {/*                onChange={() => setMode('group')} />*/}
                        {/*            <Label for="group">Group</Label>*/}
                        {/*        </FormGroup>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
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
            <Modal
                isOpen={groupModalOpen}
                toggle={() => setGroupModalOpen(!modalOpen)}
                className='modal-dialog-centered'
                backdrop={true}>
                <ModalHeader>
                    Select Group
                </ModalHeader>
                <Form onSubmit={handleGroupSubmit}>
                    <ModalBody>
                        <Row className="px-2">
                            {groups && groups.length > 0 && groups.map(g => <Col md="12" key={g}>
                                <FormGroup>
                                    <Input
                                        id="individual"
                                        type="radio"
                                        checked={selectedGroup === g}
                                        onChange={() => setSelectedGroup(g)} />
                                    <Label for="individual">{g}</Label>
                                </FormGroup>
                            </Col>)}
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button.Ripple
                            className="btn-sm"
                            onClick={() => {
                                setGroupModalOpen(false)
                                setMode('individual')
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
        </ >
    )
}
