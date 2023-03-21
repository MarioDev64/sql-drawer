const Card = ({tableName, columns}) => {
  return (
    <div className="mt-2 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tableName}</h5>
        {columns?.map(column => (
            <div id={`card-column-id-${column.id}`} className="flex justify-between">
                <p className="font-normal text-gray-700 dark:text-gray-400">{column.name}</p>
                <p className="font-normal text-gray-400 dark:text-gray-200">{column.type}</p>
            </div>
        ))}
    </div>
  )
}

export default Card