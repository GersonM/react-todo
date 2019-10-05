/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Button, Icon, Input, List, Spin, Upload } from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

class AddTaksForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      pagination: null,
      tasks: [],
      imageUrl:''
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

  completeTask = (index) => {
    const {tasks} = this.state;
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    tasks[index].estado = 3;
    this.setState({tasks});
    axios.post('actualizar/' + tasks[index].id, {estado: 1}, {headers}).then(response => {
      this.setState({tasks: response.data});
    });
  };


  onChangeText = (event) => {
    this.setState({description:event.target.value})
  };

  addTask = () => {
    const {tasks, newTask, description} = this.state;

    const paramsData = {
      estado: 0,
      descripcion: description,
      archivo:"ddd"
    };

    axios.post('registro', paramsData).then(response => {
      this.setState({tasks: response.data});
    });
  };

  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render(){
    const {imageUrl} = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div>
        <h1>Crear tarea</h1>
        <TextArea onChange={this.onChangeText} />
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://ialab.io/api/registro"
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <Button onClick={this.addTask}>Agregar tarea</Button>
      </div>
    );
  }
}

AddTaksForm.propTypes = {};

export default AddTaksForm;
