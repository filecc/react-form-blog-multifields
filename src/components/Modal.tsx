// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Modal({ open, option }: { open: boolean, option: any}){
    
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
      }

    return ( <>
    {open ? <div className="fixed top-0 bottom-0 right-0 w-full bg-gray-600/60 grid place-items-center">
        <section className="bg-white rounded-xl shadow-lg w-11/12 h-fit grid place-items-center">
            <div className="w-full h-full px-5 flex flex-col justify-between py-6 mb-12">
                <div className="text-center pt-8">
                    <h2 className="text-xl font-semibold">{option.title}</h2>
                    <div className="pt-3 font-light">{option.content}</div>
                </div>
                
                <div className="grid grid-cols-3 space-x-2">
                    <button className={
                        classNames(
                            option.editing ? 'col-span-3' : 'col-span-2'
                        )} onClick={() => {option.setOpen(false)}}>Cancel</button>
                    {!option.editing && <button onClick={option.handleConfirm} className="btn col-span-2">Confirm</button>}
                </div>
            </div>
        </section>
    </div>
    : null
    }
    </>)
}