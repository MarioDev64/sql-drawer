import Card from '../components/Card';

const Drawer = ({tables}) => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 auto-rows-auto p-4 sm:ml-64">
      {tables?.map(table => (
        <Card key={`card-key-${table.id}`} tableName={table.name} columns={table.columns} />
      ))}
    </div>
  )
}

export default Drawer