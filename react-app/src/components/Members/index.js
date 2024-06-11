import React from 'react';
import './MembersPage.css'

function MembersPage() {
    return (
        <div className='main-team-div'>
            <h1>Members of the Occult</h1>
			<div className='team-div'>
                <div className='team-individual-div'>
                    <img src='' alt='' />
                    <h4 className='team-member'>Team Member</h4>
                    <p>description</p>
                </div> 
                <div className='team-individual-div'>
                    <img src='' alt='' />
                    <h4 className='team-member'>Team Member</h4>
                    <p>description</p>
                </div> 
                <div className='team-individual-div'>
                <img src='' alt='' />
                <h4 className='team-member'>Team Member</h4>
                <p>description</p>
            </div> 
            </div>
        </div>
    );
}

export default MembersPage;
