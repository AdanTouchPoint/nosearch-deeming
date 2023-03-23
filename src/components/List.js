import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const List = ({allDataIn,setAllDataIn,mp, dataUser,  setEmailData,  setShowFindForm, setShowEmailForm, clientId,}) => {
  const [checklistStates, setChecklistStates] = useState(Array(mp.length).fill(true));

  const toggleChecklist = (index) => {
    const newChecklistStates = [...checklistStates];
    newChecklistStates[index] = !newChecklistStates[index];
    setChecklistStates(newChecklistStates);
  };

  const click = () => {
    const selectedMps = mp.filter((mp, index) => checklistStates[index]);
    const emails = selectedMps.map((mp) => mp.email);
    setAllDataIn(emails);

    setShowEmailForm(false)
    setShowFindForm(true)
    //console.log(allDataIn, 'allDataIn')
  };

  return (
    <>
      <h2>MPs</h2>
    <div className='mp-table-list'>
      {mp.map((mp, index) => (
        <label key={index} className='list-mp-row' >
          <input
            type='checkbox'
            checked={checklistStates[index]}
            onChange={() => toggleChecklist(index)}
          />
          <h5>{mp.name}</h5>
        </label>
      ))}
    </div>
      <div className='btn-container-checklist'>
        <div className={'buttons'}>
          <div>
            <Button className='list-button' size={'md'} variant={'dark'} target={'blank'} onClick={click}>
              Proceed to Email
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
