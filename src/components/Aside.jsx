import { HiPlus, HiPencil, HiOutlineTrash } from "react-icons/hi";

const Aside = ({
    tables, 
    handleAddTableClick, 
    handleRemoveTableClick, 
    handleUpdateTableClick, 
    handleAddColumnClick, 
    handleRemoveColumnClick,
    handleColumnInputChange,
    handleColumnSelectChange,
}) => {
    const sidebarDropdownClick = (id) => {
        document.querySelectorAll('.dropdown-list')
        .forEach(function (element) {
            if(element.id === `dropwdown-list-${id}`){
                element.classList.toggle('hidden');
            }else{
                element.classList.add('hidden');
            }
        });
    }
    return (
        <aside id="sidebar" className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2">
                    <li>
                        <button onClick={() => handleAddTableClick(true)} type="button" className="w-full flex justify-center items-center text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <HiPlus className='w-4 h-4 mr-2 -ml-1'/> Add new table
                        </button>
                    </li>
                    {tables?.map((table) => {
                        return(
                            <li id={`table-id-${table.id}`} key={`table-key-${table.id}`}>
                                <button onClick={() => sidebarDropdownClick(table.id)} type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" >
                                    <svg  className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap" >
                                        {table.name}
                                    </span>
                                    <div onClick={(event) => handleRemoveTableClick(event, table.id)} className="relative inline-flex items-center p-[0.5em] rounded-md border font-medium tracking-wide transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-25 focus:ring-offset-gray-50 text-sm focus:ring-offset-0 my-auto h-full shrink-0 rounded border-transparent text-xs leading-tight text-gray-500 dark:text-white hover:bg-blue-200 hover:text-blue-600 focus:outline-none focus:ring-blue-500 hover:bg-blue-300 hover:text-blue-700" type="button" tabIndex="-1">
                                        <div className="inline-block align-middle" style={{height: '1.25em', width: '1.25em'}}>
                                            <HiOutlineTrash className='w-4 h-4'/>                                                                             
                                        </div>
                                    </div>
                                    <div onClick={(event) => handleUpdateTableClick(event, table.id)} className="relative inline-flex items-center p-[0.5em] rounded-md border font-medium tracking-wide transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-25 focus:ring-offset-gray-50 text-sm focus:ring-offset-0 my-auto h-full shrink-0 rounded border-transparent text-xs leading-tight text-gray-500 dark:text-white hover:bg-blue-200 hover:text-blue-600 focus:outline-none focus:ring-blue-500 hover:bg-blue-300 hover:text-blue-700" type="button" tabIndex="-1">
                                        <div className="inline-block align-middle" style={{height: '1.25em', width: '1.25em'}}>
                                            <HiPencil className='w-4 h-4'/>                                           
                                        </div>
                                    </div>
                                </button>
                                <ul id={`dropwdown-list-${table.id}`} className="hidden py-2 space-y-2 dropdown-list">
                                    <li>
                                        <div className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                            <ul>
                                                {table?.columns?.map(column => (
                                                    <li key={`column-key-${column.id}`} className="flex">
                                                        <input onChange={(event) => handleColumnInputChange(event, table.id, column.id)} type="text" defaultValue={column.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="type column name" required/>
                                                        <select onChange={(event) => handleColumnSelectChange(event, table.id, column.id)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                            <option value="varchar" selected={column.type === 'varchar' ? true : false}>varchar</option>
                                                            <option value="integer" selected={column.type === 'integer' ? true : false}>integer</option>
                                                            <option value="date" selected={column.type === 'date' ? true : false}>date</option>
                                                        </select>
                                                        <button onClick={() => handleRemoveColumnClick(table.id, column.id)} className="relative inline-flex items-center p-[0.5em] rounded-md border font-medium tracking-wide transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-25 focus:ring-offset-gray-50 text-sm focus:ring-offset-0 my-auto h-full shrink-0 rounded border-transparent text-xs leading-tight text-gray-500 dark:text-white hover:bg-blue-200 hover:text-blue-600 focus:outline-none focus:ring-blue-500 hover:bg-blue-300 hover:text-blue-700" type="button" tabIndex="-1">
                                                            <div className="inline-block align-middle" style={{height: '1.25em', width: '1.25em'}}>
                                                                <HiOutlineTrash className='w-4 h-4'/>                                                                             
                                                            </div>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                            <button onClick={() => handleAddColumnClick(table.id)} type="button" className="w-full flex justify-center items-center text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                <HiPlus className='w-4 h-4 mr-2 -ml-1'/> Add a column
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
    )
}

export default Aside