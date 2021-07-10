import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Button, Card, CardBody, CardHeader,
    CardTitle, Col, Form, FormGroup, Input, Label, Row
} from 'reactstrap'
import { handleLogin } from '../../redux/actions/auth'

const defaultInputState = {
    email: "shashi8333022040@gmail.com",
    password: "shashi"
}

const Login = (props) => {
    const [inputState, setInputState] = useState(defaultInputState)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = inputState
        dispatch(handleLogin({
            email_id: email,
            password
        }, () => props.history.push('/package-list')))
        // props.history.push('/package-list')
    }
    const handleChange = (e) => {
        e.preventDefault()
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Row>
            <Col md={3} />
            <Col md={6}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle tag='h4'>Super Admin Login</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm='12'>
                                    <FormGroup>
                                        <Label for='EmailVertical'>Email</Label>
                                        <Input
                                            type='email'
                                            name='email'
                                            id='EmailVertical'
                                            placeholder='Email ID'
                                            value={inputState.email}
                                            onChange={handleChange} />
                                    </FormGroup>
                                </Col>
                                <Col sm='12'>
                                    <FormGroup>
                                        <Label for='PasswordVertical'>Password</Label>
                                        <Input
                                            type='password'
                                            name='password'
                                            id='PasswordVertical'
                                            placeholder='Password'
                                            value={inputState.password}
                                            onChange={handleChange} />
                                    </FormGroup>
                                </Col>
                                <Col sm='12'>
                                    <FormGroup className='d-flex mb-0'>
                                        <Button.Ripple className='mr-1' color='primary' type='submit'>
                                            Submit
                                        </Button.Ripple>
                                        <Button.Ripple outline color='secondary' type='reset'>
                                            Reset
                                        </Button.Ripple>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                        <p className='text-center mt-2'>
                            <span className='mr-25'>New on our platform?</span>
                            <Link to='/register'>
                                <span>Create an account</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>
            </Col>
            <Col md={3} />
        </Row>
    )
}
export default Login
