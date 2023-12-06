export default function Modal({open, handleConfirm, handleCancel}: {open: boolean, handleConfirm: () => void, handleCancel: () => void}){

    return ( <>
    {open ? <div className="absolute top-0 bottom-0 right-0 w-full bg-gray-600/60 grid place-items-center">
        <section className="bg-white rounded-xl shadow-lg w-11/12 h-1/2 grid place-items-center">
            <div className="w-full h-full px-5 flex flex-col justify-between py-6">
                <div className="text-center">
                    <h2>Title</h2>
                    <p>Content Modal</p>
                </div>
                
                <div className="flex items-center gap-7">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleConfirm} className="btn">Confirm</button>
                </div>
            </div>
        </section>
    </div>
    : null
    }
    </>)
}