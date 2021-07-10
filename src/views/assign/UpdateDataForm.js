import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardHeader, CardTitle, CardBody, Form, Row, Col, FormGroup, Label, Input } from 'reactstrap'
import { updateNewData } from '../../../api/data.api'
import { fetchAllData, hideUpdateDataForm, setUpdateDataInput } from '../../../redux/actions/assign'
import { defaultUpdateInput } from '../../../redux/reducers/assign'
import * as Icon from 'react-feather'
import { getAllData } from '../../../api/assign.api'
import { successToast } from '../../ui/toasts'

export default function UpdateDataForm() {


    const dispatch = useDispatch()

    const { updateDataInput } = useSelector(state => state.assign)

    const handleChange = (e) => {
        e.preventDefault()
        dispatch(setUpdateDataInput({ ...updateDataInput, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, email, mobile, stream, company, location, assignTo } = updateDataInput
        debugger
        try {
            const resp = await updateNewData({
                name,
                email_id: email,
                mobileNo: mobile,
                stream,
                company_name: company,
                location,
                assign_to: assignTo
            })
            successToast("Updateed SuccessFully")
            dispatch(setUpdateDataInput(defaultUpdateInput))
            dispatch(hideUpdateDataForm())
            dispatch(fetchAllData())
        } catch (error) {
            console.log((error))
        }
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle tag='h4'>
                    <span>
                        <Icon.ArrowLeft
                            size="18"
                            className="mr-1"
                            onClick={() => dispatch(hideUpdateDataForm())}
                        />
                    </span>
                    Update Data
                </CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='nameVertical'>Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    className="form-control-sm"
                                    id='nameVertical'
                                    placeholder='Name'
                                    value={updateDataInput.name}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='emailVertical'>Email</Label>
                                <Input
                                    type='text'
                                    name='email'
                                    className="form-control-sm"
                                    id='emailVertical'
                                    placeholder='Email'
                                    value={updateDataInput.email}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='mobileVertical'>Mobile</Label>
                                <Input
                                    type='text'
                                    required
                                    name='mobile'
                                    className="form-control-sm"
                                    id='mobileVertical'
                                    placeholder='Mobile'
                                    value={updateDataInput.mobile}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='streamVertical'>Stream</Label>
                                <Input
                                    type='text'
                                    name='stream'
                                    className="form-control-sm"
                                    id='streamVertical'
                                    placeholder='Stream'
                                    value={updateDataInput.stream}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='companyVertical'>Company</Label>
                                <Input
                                    type='text'
                                    name='company'
                                    className="form-control-sm"
                                    id='companyVertical'
                                    placeholder='Company'
                                    value={updateDataInput.company}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='locationVertical'>Location</Label>
                                <Input
                                    type='text'
                                    name='location'
                                    className="form-control-sm"
                                    id='locationVertical'
                                    placeholder='Location'
                                    value={updateDataInput.location}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='assignToVertical'>Assign To</Label>
                                <Input
                                    type='text'
                                    name='assignTo'
                                    className="form-control-sm"
                                    id='assignToVertical'
                                    placeholder='Assign To'
                                    value={updateDataInput.assignTo}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup className='d-flex mb-0'>
                                <Button.Ripple className='mr-1' color='primary' type='submit'>
                                    Submit
                                </Button.Ripple>
                                <Button.Ripple onClick={() => dispatch(setUpdateDataInput(defaultUpdateInput))} outline color='secondary' type='reset'>
                                    Reset
                                </Button.Ripple>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}
