/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Icon, List, Spin } from "antd";
import axios from "axios";
import AddTaksForm from "../../components/AddTaskForm";
import TextArea from "antd/lib/input/TextArea";

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      pagination: null,
      tasks: []
    };
  }

  componentDidMount(){
    this.listTasks();
  }

  listTasks(){
    axios.get('listado').then(response => {
      this.setState({tasks: response.data});
    });
  }

  setToEdit = (index) => {
    const {tasks} = this.state;
    tasks[index].edit = true;
    this.setState({tasks});
  };

  editTask = (index, status) => {
    const {tasks} = this.state;
    //const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    tasks[index].loading = true;
    if(status) tasks[index].estado = status;
    //tasks[index].descripcion = 'Patanjali es considerado por la tradición, como el autor de los Yoga Sutras, en los cuales él provee un acercamiento de ocho pilares para el bienestar y la purificación del cuerpo, mente y alma, considerada la obra con más autoridad en la materia sobre el Yoga Darsana, de indiscutida referencia en todas las tradiciones y corrientes del Yoga.';
    this.setState({tasks});
    axios.post('actualizar/' + tasks[index].id, tasks[index]).then(response => {
      //tasks[index] = response.data;
      tasks[index].loading = false;
      tasks[index].edit = false;
      this.setState({tasks});
    });
  };

  onChangeTask = (index, text) => {
    const {tasks} = this.state;
    tasks[index].descripcion = text;
    this.setState({tasks});
  };

  render(){
    const {tasks} = this.state;
    const completedIcon = <Icon size={30} type="check-circle" style={{fontSize: '30px', color: '#0daa26'}} theme="outlined"/>;
    const pendingIcon = <Icon size={30} type="clock-circle" style={{fontSize: '30px', color: '#cedad4'}} theme="outlined"/>;

    return (
      <React.Fragment>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home"/>
        </Helmet>

        <h1>TODO List</h1>
        <AddTaksForm/>
        <List
          itemLayout="horizontal"
          dataSource={tasks}
          renderItem={(item, index) => {
            let status = pendingIcon;
            switch (item.estado) {
              case 1:
                status = completedIcon;
                break;
              case 2:
                status = pendingIcon;
                break;
            }
            return <List.Item>
              <List.Item.Meta
                avatar={item.loading ? <Spin/> : status}
                title={item.edit ? <TextArea value={item.descripcion} onChange={(event) => this.onChangeTask(index, event.target.value)}/> : item.descripcion}
                description={
                  <div>
                    <Button.Group>
                      {item.estado !== 1 ? <Button loading={item.loading} ghost
                                                   type={"primary"} icon={'check'}
                                                   size={"small"} shape={"round"} onClick={() => this.editTask(index, 1)}>Completar</Button> :
                        <Button loading={item.loading} ghost
                                type={"danger"} icon={'close'}
                                size={"small"} shape={"round"} onClick={() => this.editTask(index, 1)}>Marcar como pendiente</Button>}

                      {item.edit ? <Button type={"primary"} icon={'save'} ghost
                                           size={"small"} shape={"round"} onClick={() => this.editTask(index)}>Guardar</Button> : <Button type={"primary"} icon={'edit'} ghost
                                                                                                                                           size={"small"} shape={"round"}
                                                                                                                                           onClick={() => this.setToEdit(index)}>Editar</Button>}
                    </Button.Group>
                  </div>
                }
              />

            </List.Item>;
          }}
        />
      </React.Fragment>
    );
  }
}

Home.propTypes = {};

export default Home;
