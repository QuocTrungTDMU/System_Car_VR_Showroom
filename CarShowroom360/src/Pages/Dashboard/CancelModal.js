import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../firebase.init';
import { deleteDoc, doc } from 'firebase/firestore';

const CancelModal = (props) => {
    const _id  = props.cancel;
    const setCancel = props.setCancel;
    const handleCancel = async () => {
            const orderRef = doc(db, "Oder", _id.id); 
            await deleteDoc(orderRef);
            setCancel(null);
            window.location.reload()
    }

    return (
        <div>
            <input type="checkbox" id="cancel-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this?</h3>

                    <div className="modal-action">
                        <button onClick={() => setCancel(null)} className="btn btn-xs " >No</button> 
                         <button onClick={handleCancel} className="btn btn-xs btn-error">Yes</button> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelModal;
