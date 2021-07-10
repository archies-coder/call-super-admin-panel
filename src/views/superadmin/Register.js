import {
  Button, Card, CardBody, CardHeader,
  CardTitle, Col, Form, FormGroup, Input, Label, Row
} from 'reactstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleSuperAdminRegister } from '../../redux/actions/auth'

const defaultInputState = {
  name: "shashi",
  email: "shashi8333022040@gmail.com",
  password: "shashi",
  confirmPassword: "shashi"
}

const Register = (props) => {
  const [inputState, setInputState] = useState(defaultInputState)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { confirmPassword, email, name, password } = inputState
    const passwordMatching = password === confirmPassword && password !== ''
    if (!passwordMatching) {
      return
    }
    dispatch(handleSuperAdminRegister({
      name,
      password,
      email_id: email
    }, (emailVerified) => {
      debugger
      if (!emailVerified) {
        props.history.push('/error')
      }
      props.history.push('/')
    }))
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
            <CardTitle tag='h4' >Admin Details</CardTitle>
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
                      id='nameVertical'
                      placeholder='Name'
                      value={inputState.name}
                      onChange={handleChange} />
                  </FormGroup>
                </Col>
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
                  <FormGroup>
                    <Label for='ConfirmPasswordVertical'>Confirm Password</Label>
                    <Input
                      type='password'
                      name='confirmPassword'
                      id='ConfirmPasswordVertical'
                      placeholder='Confirm Password'
                      value={inputState.confirmPassword}
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
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign In</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </Col>
      <Col md={3} />
    </Row>
  )
}
export default Register
