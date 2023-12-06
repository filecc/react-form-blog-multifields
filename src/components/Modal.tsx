// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Modal({ open, option }: { open: boolean, option: any}){
    
    return ( <>
    {open ? <div className="absolute top-0 bottom-0 right-0 w-full bg-gray-600/60 grid place-items-center">
        <section className="bg-white rounded-xl shadow-lg w-11/12 h-fit grid place-items-center">
            <div className="w-full h-full px-5 flex flex-col justify-between py-6">
                <div className="text-center">
                    <h2>{option.title}</h2>
                    <p>{option.content}</p>
                </div>
                
                <div className="flex items-center gap-7">
                    <button onClick={() => {option.setOpen(false)}}>Cancel</button>
                    <button onClick={option.handleConfirm} className="btn">Confirm</button>
                </div>
            </div>
        </section>
    </div>
    : null
    }
    </>)
}