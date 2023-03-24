import React, {useState, useEffect} from 'react'
import Button from "react-bootstrap/cjs/Button";


const ThankYou = ({showThankYou, setShowFindForm, setShowThankYou, typData}) => {
    
    
    
    
    const click = e => {
        e.preventDefault()
        setShowThankYou(true)
        setShowFindForm(false)
    }
    return (
        <div hidden={showThankYou} className={'container typ-container'}>
            <form onSubmit={click}>
                <div className='typ-content'>
                    <h3>{typData.data?.docs[0] ? typData.data?.docs[0].thankYouMessage : 'Please write a thank you message on the dashboard'}</h3>
                    <h5>{typData.data?.docs[0] ? typData.data?.docs[0].secondThankYouMessage : 'Please fill in this field on the dashboard' }</h5>
                    <Button
                        type={'submit'}
                        onClick={click}
                        variant={'dark'}
                        className="capitalize-style">
                        {typData.data?.docs[0] ? typData.data?.docs[0].repeatButtonTyp : 'Please fill in this field on the dashboard'}
                    </Button>
                </div>
            </form>
        </div>


    )
}

export default ThankYou;