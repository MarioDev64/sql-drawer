import { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { Modal } from "flowbite-react";
import { nanoid } from 'nanoid';
import Header from './components/Header';
import Aside from './components/Aside';
import Drawer from './components/Drawer';

function App() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [tables, setTables] = useState([]);
  const [tableSelected, setTableSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const modalInputRef = useRef(null);

  const onSubmit = (values) => {
      reset();
      setOpenModal(false);
      if(tableSelected){
        updateTable(values);
      }else{
        addTable(values);
      }
  };

  const addTable = (values) => {
    console.log('handleAsideNewTableModalForm', values);
    const addATable = {
      id: nanoid(),
      name: values.tableName,
      columns: []
    }
    setTables([...tables, addATable]);
  }

  const updateTable = (values) => {
    const nameTables = tables.map(table=>{
      return {...table, name:table.id===tableSelected.id 
        ? values.tableName 
        : table.name}
    });
    setTables(nameTables);
    setTableSelected(null);
  }

  const removeTable = (event, id) => {
    event.stopPropagation();
    const removeTableById = tables.filter(table => table.id!==id);
    setTables([...removeTableById]);
    console.log('removeTable[event]', event)
    console.log('removeTable[id]', id);
  }

  const displayUpdateTableModal = (event, id) => {
    event.stopPropagation();
    const findTableById = tables.find(table => table.id===id);
    setTableSelected(findTableById);
    setOpenModal(true);
    setValue("tableName", findTableById.name);
  }

  const addColumn = (table) => {
    return {
      id: nanoid(),
      name: `column_${table.columns.length + 1}`,
      type: 'varchar'
    }
  }

  const handleAddColumn = (tableId) => {
    const addTableColumn = tables.map(table=>{
      return {...table, columns:table.id===tableId 
        ? [...table.columns, addColumn(table)] 
        : [...table.columns]}
    });
    setTables(addTableColumn);
  }

  const removeColumn = (columns, columnId) => {
    const removeTableColumnById = columns.filter(column => column.id!==columnId)
    return removeTableColumnById;
  }

  const handleRemoveColumn = (tableId, columnId) => {
    const removeTableColumn = tables.map(table=>{
      return {...table, columns:table.id===tableId 
        ? [...removeColumn(table.columns, columnId)] 
        : [...table.columns]}
    });
    setTables(removeTableColumn);
  }

  const updateColumnName = (value, columns, columnId) => {
    const updateColumnById = columns.map(column => {
      return {...column, name:column.id===columnId
      ? value
      : column.name}
    });
    return updateColumnById;
  }

  const handleUpdateColumnName = (event, tableId, columnId) => {
    console.log('handleUpdateColumnName[event]', event);
    console.log('handleUpdateColumnName[tableId]', tableId);
    console.log('handleUpdateColumnName[columnId]', columnId);
    const nameColumn = tables.map(table=>{
      return {...table, columns:table.id===tableId 
        ? [...updateColumnName(event.target.value, table.columns, columnId)]  
        : [...table.columns]}
    });
    setTables(nameColumn);
  }

  const updateColumnType = (value, columns, columnId) => {
    const updateColumnById = columns.map(column => {
      return {...column, type:column.id===columnId
      ? value
      : column.type}
    });
    return updateColumnById;
  }

  const handleUpdateColumnType = (event, tableId, columnId) => {
    console.log('handleUpdateColumnType[event]', event);
    console.log('handleUpdateColumnType[tableId]', tableId);
    console.log('handleUpdateColumnType[columnId]', columnId);
    const typeColumn = tables.map(table=>{
      return {...table, columns:table.id===tableId 
        ? [...updateColumnType(event.target.value, table.columns, columnId)]  
        : [...table.columns]}
    });
    setTables(typeColumn);
  }

  useEffect(() => {
    console.log('useEffect[tables]', tables);
  }, [tables])

  return (
    <>
      <Header/>
      <Aside
        tables={tables}
        handleAddTableClick={() => setOpenModal(true)}
        handleUpdateTableClick={(event, id) => displayUpdateTableModal(event, id)}
        handleRemoveTableClick={(event, id) => removeTable(event, id)}
        handleAddColumnClick={(tableId) => handleAddColumn(tableId)}
        handleRemoveColumnClick={(tableId, columnId) => handleRemoveColumn(tableId, columnId)}
        handleColumnInputChange={(event, tableId, columnId) => handleUpdateColumnName(event, tableId, columnId)}
        handleColumnSelectChange={(event, tableId, columnId) => handleUpdateColumnType(event, tableId, columnId)}
      />
      <Drawer 
        tables={tables} 
      />
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>{tableSelected ? 'Edit table' : 'Add new table'}</Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
              <div className="space-y-6">
              <label htmlFor="table_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type table name</label>
                  <input ref={modalInputRef} {...register("tableName", { required: true })} type="text" id="table_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g posts"/>
                  {errors.tableName && <span>This field is required</span>}
                  </div>
              </Modal.Body>
              <Modal.Footer>
                  <button onClick={() => setOpenModal(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{tableSelected ? 'Update' : 'Create'}</button>
              </Modal.Footer>
          </form>
      </Modal>
    </>
  )
}

export default App;
