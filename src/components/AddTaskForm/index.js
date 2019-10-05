/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Button, Col, Divider, Icon, Row, Upload } from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

class AddTaksForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      pagination: null,
      tasks: [],
      imageUrl: '',
      description: '',
      file: null
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
    this.setState({description: event.target.value});
  };

  addTask = () => {
    const {tasks, newTask, description, file} = this.state;

    let formData = new FormData();
    formData.append("archivo", file);
    formData.append("estado", '0');
    formData.append("descripcion", description);

    console.log('send', formData);

    axios.post('registro', formData, {headers: {"content-type": "multipart/form-data"}}).then(response => {
      this.setState({tasks: response.data});
      if (this.props.hasOwnProperty('onCreate'))
        this.props.onCreate();
    });
  };

  handleChange = info => {
    console.log(info);
    this.setState({file: info.file.originFileObj});

    this.getBase64(info.file.originFileObj, imageUrl =>
      this.setState({
        imageUrl,
        loading: false,
      }),
    );
  };

  getBase64(img, callback){
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render(){
    const {imageUrl, description} = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'paper-clip'} style={{fontSize: 25}}/>
        <div className="ant-upload-text">Arrastra una image</div>
      </div>
    );

    return (
      <div>
        <h1>Crear tarea</h1>
        <Row gutter={16}>
          <Col span={3}>
            <Upload
              name="archivo"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
            </Upload>
          </Col>
          <Col span={21}>
            <TextArea onChange={this.onChangeText} rows={4}/>
          </Col>
        </Row>

        <Button disabled={description === ''} icon={'plus'} size={"large"} type={"primary"} onClick={this.addTask}>Agregar tarea</Button>
        <Divider/>
      </div>
    );
  }
}

AddTaksForm.propTypes = {
};

export default AddTaksForm;
