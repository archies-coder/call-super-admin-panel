/* eslint-disable quote-props */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label, Row, Button } from 'reactstrap'
// import firebase from '../../../configs/firebase'
import * as Icon from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { hideAddCallingAgentForm, setAddCallingAgentInput } from '../../../redux/actions/assign'
import Col from 'reactstrap/lib/Col'
import { useAuth } from 'reactfire'
import firebase from 'firebase'
import { errorToast, successToast } from '../../ui/toasts'
import { createCallingAgent } from '../../../api/callingAgent.api'

export default function AddCallingAgent() {

    const [otpSent, setOtpSent] = useState(false)
    const [otpVerified, setOtpVerified] = useState(false)

    const fireAuth = useAuth()

    const { addCallingAgentInput } = useSelector(state => state.assign)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await createCallingAgent(addCallingAgentInput.mobile, otpVerified)
            if (resp) {
                successToast("Added Calling Agent")
            }
        } catch (error) {
            errorToast(error.message)
        }
        dispatch(setAddCallingAgentInput({ mobile: '', otp: '' }))
        setOtpSent(false)
        setOtpVerified(false)
    }

    const onSignInSubmit = (e) => {
        e.preventDefault()
        if (otpVerified) {
            handleSubmit(e)
        }
        // eslint-disable-next-line no-use-before-define
        setupReCaptcha()
        const phoneNumber = `+91${addCallingAgentInput.mobile}`
        const appVerifier = window.recaptchaVerifier
        fireAuth.signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult
                setOtpSent(true)
                successToast("OTP sent Successfully")
                // ...
            }).catch((error) => {
                debugger
                // Error SMS not sent
                // ...
            })
    }

    const verifyOtp = (e) => {
        e.preventDefault()
        window.confirmationResult.confirm(addCallingAgentInput.otp).then((result) => {
            // User signed in successfully.
            const user = result.user
            setOtpVerified(true)
            successToast("OTP verified ✔")
            // ...
        }).catch((error) => {
            errorToast("Invalid OTP")
            // User couldn't sign in (bad verification code?)
            // ...
        })
    }

    const setupReCaptcha = () => {

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit()
            }
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        dispatch(setAddCallingAgentInput({ ...addCallingAgentInput, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        setupReCaptcha()
    }, [])

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle tag='h4'>
                    <span>
                        <Icon.ArrowLeft
                            size="18"
                            className="mr-1"
                            onClick={() => dispatch(hideAddCallingAgentForm())}
                        />
                    </span>
                    Add Calling Agent
                </CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={onSignInSubmit}>
                    <div id="sign-in-button"></div>
                    <Row>
                        <Col sm='6'>
                            <FormGroup>
                                <Label for='mobileVertical'>Mobile Numner</Label>
                                <Input
                                    type='text'
                                    name='mobile'
                                    className="form-control-sm"
                                    id='mobileVertical'
                                    placeholder='Mobile Number'
                                    value={addCallingAgentInput.mobile}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        {otpSent && <Col md="6">
                            <Row>
                                <Col sm='7'>
                                    <FormGroup>
                                        <Label for='otpVertical'>OTP</Label>
                                        <Input
                                            type='text'
                                            name='otp'
                                            className="form-control-sm"
                                            id='otpVertical'
                                            placeholder='Enter OTP'
                                            value={addCallingAgentInput.otp}
                                            onChange={handleChange} />
                                    </FormGroup>
                                </Col>
                                <Col md="5">
                                    <FormGroup className='mt-1'>
                                        <Button.Ripple className='' color='primary' type='click' onClick={verifyOtp}>
                                            Verify
                                        </Button.Ripple>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        }
                        <Col sm='12'>
                            <FormGroup className='d-flex mb-0'>
                                {otpSent && otpVerified && <Button.Ripple className='mr-1' color='primary' type='submit'>
                                    Submit
                                </Button.Ripple>}
                                {!otpSent && <Button.Ripple className='mr-1' color='primary' type='submit'>
                                    Send OTP
                                </Button.Ripple>}
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}
